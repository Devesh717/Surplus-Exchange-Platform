package com.example.Surplus_Exchange_Platform.order.service.implementations;

import com.example.Surplus_Exchange_Platform.cart.entity.Cart;
import com.example.Surplus_Exchange_Platform.cart.entity.CartItem;
import com.example.Surplus_Exchange_Platform.cart.repository.CartRepository;
import com.example.Surplus_Exchange_Platform.notification.entity.NotificationType;
import com.example.Surplus_Exchange_Platform.notification.kafka.NotificationProducer;
import com.example.Surplus_Exchange_Platform.order.dto.request.CreateOrderRequest;
import com.example.Surplus_Exchange_Platform.order.dto.response.OrderItemResponse;
import com.example.Surplus_Exchange_Platform.order.dto.response.OrderResponse;
import com.example.Surplus_Exchange_Platform.order.entity.Order;
import com.example.Surplus_Exchange_Platform.order.entity.OrderItem;
import com.example.Surplus_Exchange_Platform.order.entity.OrderStatus;
import com.example.Surplus_Exchange_Platform.order.repository.OrderRepository;
import com.example.Surplus_Exchange_Platform.order.service.interfaces.OrderService;
import com.example.Surplus_Exchange_Platform.product.entity.Product;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final NotificationProducer notificationProducer;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            CartRepository cartRepository,
            UserRepository userRepository,
            NotificationProducer notificationProducer) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.notificationProducer = notificationProducer;
    }

    @Override
    @Transactional
    public OrderResponse placeOrder(
            String buyerEmail,
            CreateOrderRequest request) {

        User buyer = getBuyer(buyerEmail);

        Cart cart = cartRepository.findByBuyerId(buyer.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Cart is empty"));

        if (cart.getItems().isEmpty()) {
            throw new IllegalArgumentException(
                    "Cart is empty");
        }

        /*
         * Stock is checked again while placing the order.
         */
        for (CartItem cartItem : cart.getItems()) {

            Product product = cartItem.getProduct();

            if (!product.isActive()) {
                throw new IllegalArgumentException(
                        "Product is no longer available: "
                                + product.getName());
            }

            if (cartItem.getQuantity() > product.getQuantity()) {
                throw new IllegalArgumentException(
                        "Insufficient stock for product: "
                                + product.getName());
            }
        }

        Order order = new Order();

        order.setOrderNumber(
                "SEP-" + UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase());

        order.setBuyer(buyer);
        order.setStatus(OrderStatus.PENDING);

        BigDecimal total = BigDecimal.ZERO;

        /*
         * Keep track of sellers so that each seller
         * receives only ONE notification per order.
         */
        Set<Long> sellerIds = new HashSet<>();

        for (CartItem cartItem : cart.getItems()) {

            Product product = cartItem.getProduct();

            BigDecimal subtotal =
                    product.getSellingPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            cartItem.getQuantity()));

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setProductName(product.getName());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(product.getSellingPrice());
            orderItem.setSubtotal(subtotal);

            order.getItems().add(orderItem);

            /*
             * Reduce stock.
             */
            product.setQuantity(
                    product.getQuantity()
                            - cartItem.getQuantity());

            if (product.getQuantity() == 0) {
                product.setActive(false);
            }

            /*
             * Store seller ID for notification.
             */
            sellerIds.add(
                    product.getSeller().getId());

            total = total.add(subtotal);
        }

        order.setTotalAmount(total);

        Order savedOrder = orderRepository.save(order);

        /*
         * Clear cart after creating the order.
         */
        cart.getItems().clear();
        cartRepository.save(cart);

        /*
         * Notify every seller involved in this order.
         */
        for (Long sellerId : sellerIds) {

            notificationProducer.publish(
                    sellerId,
                    "New Order Received",
                    "You have received a new order: "
                            + savedOrder.getOrderNumber(),
                    NotificationType.ORDER_PLACED
            );
        }

        return toResponse(savedOrder);
    }

    @Override
    @Transactional
    public OrderResponse getOrder(
            String buyerEmail,
            Long orderId) {

        User buyer = getBuyer(buyerEmail);

        Order order = getBuyerOrder(
                buyer.getId(),
                orderId);

        return toResponse(order);
    }

    @Override
    @Transactional
    public Page<OrderResponse> getMyOrders(
            String buyerEmail,
            Pageable pageable) {

        User buyer = getBuyer(buyerEmail);

        return orderRepository
                .findByBuyerIdOrderByCreatedAtDesc(
                        buyer.getId(),
                        pageable)
                .map(this::toResponse);
    }

    @Override
    @Transactional
    public OrderResponse cancelOrder(
            String buyerEmail,
            Long orderId) {

        User buyer = getBuyer(buyerEmail);

        Order order = getBuyerOrder(
                buyer.getId(),
                orderId);

        if (order.getStatus() != OrderStatus.PENDING
                && order.getStatus() != OrderStatus.CONFIRMED) {

            throw new IllegalArgumentException(
                    "Order cannot be cancelled in its current status");
        }

        /*
         * Restore stock when an order is cancelled.
         */
        for (OrderItem item : order.getItems()) {

            Product product = item.getProduct();

            product.setQuantity(
                    product.getQuantity()
                            + item.getQuantity());

            product.setActive(true);
        }

        order.setStatus(OrderStatus.CANCELLED);

        return toResponse(
                orderRepository.save(order));
    }

    private User getBuyer(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"));

        if (user.getRole() != Role.BUYER
                && user.getRole() != Role.SELLER) {
            throw new IllegalArgumentException(
                    "Only buyers and approved sellers can manage orders");
        }

        if (!user.isEmailVerified()) {
            throw new IllegalArgumentException(
                    "Please verify your email first");
        }

        return user;
    }

    private Order getBuyerOrder(
            Long buyerId,
            Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Order not found"));

        if (!order.getBuyer().getId().equals(buyerId)) {
            throw new IllegalArgumentException(
                    "You are not authorized to access this order");
        }

        return order;
    }

    private User getSeller(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"));

        if (user.getRole() != Role.SELLER) {
            throw new IllegalArgumentException(
                    "Only sellers can update orders");
        }

        if (!user.isEmailVerified()) {
            throw new IllegalArgumentException(
                    "Please verify your email first");
        }

        return user;
    }

    @Override
    @Transactional
    public OrderResponse updateStatus(
            String sellerEmail,
            Long orderId,
            OrderStatus newStatus) {

        User seller = getSeller(sellerEmail);

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Order not found"));

        /*
         * Make sure this seller owns at least one
         * product in the order.
         */
        boolean sellerOwnsOrderItem =
                order.getItems()
                        .stream()
                        .anyMatch(item ->
                                item.getProduct()
                                        .getSeller()
                                        .getId()
                                        .equals(seller.getId()));

        if (!sellerOwnsOrderItem) {
            throw new IllegalArgumentException(
                    "You are not authorized to update this order");
        }

        OrderStatus currentStatus = order.getStatus();

        /*
         * Sellers can only move the order forward:
         *
         * CONFIRMED → PROCESSING
         * PROCESSING → SHIPPED
         * SHIPPED → DELIVERED
         */
        boolean validTransition =
                (currentStatus == OrderStatus.CONFIRMED
                        && newStatus == OrderStatus.PROCESSING)
                        ||
                        (currentStatus == OrderStatus.PROCESSING
                                && newStatus == OrderStatus.SHIPPED)
                        ||
                        (currentStatus == OrderStatus.SHIPPED
                                && newStatus == OrderStatus.DELIVERED);

        if (!validTransition) {
            throw new IllegalArgumentException(
                    "Invalid order status transition: "
                            + currentStatus
                            + " -> "
                            + newStatus);
        }

        order.setStatus(newStatus);

        Order savedOrder = orderRepository.save(order);

        /*
         * Notify buyer when the order is shipped.
         */
        if (newStatus == OrderStatus.SHIPPED) {

            notificationProducer.publish(
                    order.getBuyer().getId(),
                    "Order Shipped",
                    "Your order "
                            + order.getOrderNumber()
                            + " has been shipped.",
                    NotificationType.ORDER_UPDATE
            );
        }

        /*
         * Notify buyer when the order is delivered.
         */
        if (newStatus == OrderStatus.DELIVERED) {

            notificationProducer.publish(
                    order.getBuyer().getId(),
                    "Order Delivered",
                    "Your order "
                            + order.getOrderNumber()
                            + " has been delivered. "
                            + "You can now leave a review.",
                    NotificationType.ORDER_UPDATE
            );
        }

        return toResponse(savedOrder);
    }

    private OrderResponse toResponse(Order order) {

        var items = order.getItems()
                .stream()
                .map(item ->
                        new OrderItemResponse(
                                item.getId(),
                                item.getProduct().getId(),
                                item.getProductName(),
                                item.getQuantity(),
                                item.getUnitPrice(),
                                item.getSubtotal()
                        ))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getTotalAmount(),
                order.getStatus().name(),
                order.getCreatedAt(),
                order.getUpdatedAt(),
                items
        );
    }
}
