package com.example.Surplus_Exchange_Platform.payment.service.implementations;

import com.example.Surplus_Exchange_Platform.notification.entity.NotificationType;
import com.example.Surplus_Exchange_Platform.notification.kafka.NotificationProducer;
import com.example.Surplus_Exchange_Platform.order.entity.Order;
import com.example.Surplus_Exchange_Platform.order.entity.OrderStatus;
import com.example.Surplus_Exchange_Platform.order.repository.OrderRepository;
import com.example.Surplus_Exchange_Platform.payment.dto.request.VerifyPaymentRequest;
import com.example.Surplus_Exchange_Platform.payment.dto.response.CreatePaymentResponse;
import com.example.Surplus_Exchange_Platform.payment.dto.response.PaymentResponse;
import com.example.Surplus_Exchange_Platform.payment.entity.Payment;
import com.example.Surplus_Exchange_Platform.payment.entity.PaymentStatus;
import com.example.Surplus_Exchange_Platform.payment.repository.PaymentRepository;
import com.example.Surplus_Exchange_Platform.payment.service.interfaces.PaymentService;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final RazorpayClient razorpayClient;
    private final NotificationProducer notificationProducer;

    @Value("${razorpay.key-id}")
    private String razorpayKeyId;

    @Value("${razorpay.key-secret}")
    private String razorpayKeySecret;

    @Value("${razorpay.currency:INR}")
    private String currency;

    public PaymentServiceImpl(
            PaymentRepository paymentRepository,
            OrderRepository orderRepository,
            UserRepository userRepository,
            RazorpayClient razorpayClient,
            NotificationProducer notificationProducer) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.razorpayClient = razorpayClient;
        this.notificationProducer = notificationProducer;
    }

    @Override
    @Transactional
    public CreatePaymentResponse createPaymentOrder(
            String buyerEmail,
            Long orderId) {

        User buyer = getBuyer(buyerEmail);

        Order order = getBuyerOrder(
                buyer.getId(),
                orderId);

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalArgumentException(
                    "Payment can only be created for a pending order");
        }

        Payment existingPayment =
                paymentRepository.findByOrderId(orderId)
                        .orElse(null);

        if (existingPayment != null
                && existingPayment.getStatus() == PaymentStatus.CREATED) {

            return new CreatePaymentResponse(
                    order.getId(),
                    order.getOrderNumber(),
                    existingPayment.getRazorpayOrderId(),
                    razorpayKeyId,
                    existingPayment.getAmount(),
                    existingPayment.getCurrency()
            );
        }

        if (existingPayment != null
                && existingPayment.getStatus() == PaymentStatus.SUCCESS) {

            throw new IllegalArgumentException(
                    "Order has already been paid");
        }

        BigDecimal amount = order.getTotalAmount()
                .setScale(2, RoundingMode.HALF_UP);

        long amountInPaise = amount
                .movePointRight(2)
                .longValueExact();

        try {
            JSONObject options = new JSONObject();

            options.put("amount", amountInPaise);
            options.put("currency", currency);
            options.put(
                    "receipt",
                    order.getOrderNumber());

            com.razorpay.Order razorpayOrder =
                    razorpayClient.orders.create(options);

            Payment payment = existingPayment;

            if (payment == null) {
                payment = new Payment();
                payment.setOrder(order);
            }

            payment.setAmount(amount);
            payment.setCurrency(currency);
            payment.setRazorpayOrderId(
                    razorpayOrder.get("id"));
            payment.setRazorpayPaymentId(null);
            payment.setRazorpaySignature(null);
            payment.setPaidAt(null);
            payment.setStatus(PaymentStatus.CREATED);

            paymentRepository.save(payment);

            return new CreatePaymentResponse(
                    order.getId(),
                    order.getOrderNumber(),
                    payment.getRazorpayOrderId(),
                    razorpayKeyId,
                    amount,
                    currency
            );

        } catch (Exception exception) {
            throw new IllegalStateException(
                    "Unable to create Razorpay payment order",
                    exception);
        }
    }

    @Override
    @Transactional
    public PaymentResponse verifyPayment(
            String buyerEmail,
            VerifyPaymentRequest request) {

        User buyer = getBuyer(buyerEmail);

        Payment payment = paymentRepository
                .findByRazorpayOrderId(
                        request.getRazorpayOrderId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Payment order not found"));

        Order order = payment.getOrder();

        if (!order.getBuyer().getId().equals(buyer.getId())) {
            throw new IllegalArgumentException(
                    "You are not authorized to verify this payment");
        }

        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            return toResponse(payment);
        }

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalArgumentException(
                    "Order is not awaiting payment");
        }

        if (!payment.getRazorpayOrderId()
                .equals(request.getRazorpayOrderId())) {

            throw new IllegalArgumentException(
                    "Invalid Razorpay order ID");
        }

        if (paymentRepository.existsByRazorpayPaymentId(
                request.getRazorpayPaymentId())) {

            throw new IllegalArgumentException(
                    "Payment has already been processed");
        }

        try {

            JSONObject options = new JSONObject();

            /*
             * Use the Razorpay order ID stored in our database.
             */
            options.put(
                    "razorpay_order_id",
                    payment.getRazorpayOrderId());

            options.put(
                    "razorpay_payment_id",
                    request.getRazorpayPaymentId());

            options.put(
                    "razorpay_signature",
                    request.getRazorpaySignature());

            boolean valid =
                    Utils.verifyPaymentSignature(
                            options,
                            razorpayKeySecret);

            if (!valid) {

                payment.setStatus(PaymentStatus.FAILED);
                paymentRepository.save(payment);

                throw new IllegalArgumentException(
                        "Payment signature verification failed");
            }

            /*
             * Payment is successfully verified.
             */
            payment.setRazorpayPaymentId(
                    request.getRazorpayPaymentId());

            payment.setRazorpaySignature(
                    request.getRazorpaySignature());

            payment.setStatus(PaymentStatus.SUCCESS);
            payment.setPaidAt(LocalDateTime.now());

            /*
             * Only after successful payment verification
             * is the order confirmed.
             */
            order.setStatus(OrderStatus.CONFIRMED);
            orderRepository.save(order);

            Payment savedPayment =
                    paymentRepository.save(payment);

            /*
             * =====================================================
             * NOTIFICATIONS
             * =====================================================
             */

            /*
             * 1. Notify buyer.
             */
            notificationProducer.publish(
                    buyer.getId(),
                    "Payment Successful",
                    "Payment for order "
                            + order.getOrderNumber()
                            + " was successful.",
                    NotificationType.PAYMENT_CONFIRMATION
            );

            /*
             * 2. Notify every seller involved in the order.
             *
             * A single order may contain products from
             * multiple sellers.
             */
            Set<Long> sellerIds = new HashSet<>();

            order.getItems().forEach(orderItem -> {

                Long sellerId =
                        orderItem.getProduct()
                                .getSeller()
                                .getId();

                sellerIds.add(sellerId);
            });

            for (Long sellerId : sellerIds) {

                notificationProducer.publish(
                        sellerId,
                        "Payment Received",
                        "Payment has been successfully received "
                                + "for order "
                                + order.getOrderNumber()
                                + ".",
                        NotificationType.PAYMENT_CONFIRMATION
                );
            }

            return toResponse(savedPayment);

        } catch (IllegalArgumentException exception) {

            throw exception;

        } catch (Exception exception) {

            throw new IllegalStateException(
                    "Payment verification failed",
                    exception);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getPayment(
            String buyerEmail,
            Long orderId) {

        User buyer = getBuyer(buyerEmail);

        Order order = getBuyerOrder(
                buyer.getId(),
                orderId);

        Payment payment = paymentRepository
                .findByOrderId(order.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Payment not found"));

        return toResponse(payment);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PaymentResponse> getMyPayments(
            String buyerEmail,
            Pageable pageable) {

        User buyer = getBuyer(buyerEmail);

        return paymentRepository
                .findByOrderBuyerIdOrderByCreatedAtDesc(
                        buyer.getId(),
                        pageable)
                .map(this::toResponse);
    }

    private User getBuyer(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"));

        if (user.getRole() != Role.BUYER
                && user.getRole() != Role.SELLER) {
            throw new IllegalArgumentException(
                    "Only buyers and approved sellers can make payments");
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

    private PaymentResponse toResponse(Payment payment) {

        Order order = payment.getOrder();

        return new PaymentResponse(
                payment.getId(),
                order.getId(),
                order.getOrderNumber(),
                payment.getAmount(),
                payment.getCurrency(),
                payment.getRazorpayOrderId(),
                payment.getRazorpayPaymentId(),
                payment.getStatus().name(),
                payment.getCreatedAt(),
                payment.getPaidAt()
        );
    }
}
