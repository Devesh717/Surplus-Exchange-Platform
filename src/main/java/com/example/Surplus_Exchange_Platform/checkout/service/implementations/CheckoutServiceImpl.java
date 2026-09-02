package com.example.Surplus_Exchange_Platform.checkout.service.implementations;

import com.example.Surplus_Exchange_Platform.cart.dto.response.CartItemResponse;
import com.example.Surplus_Exchange_Platform.cart.dto.response.CartResponse;
import com.example.Surplus_Exchange_Platform.cart.service.interfaces.CartService;
import com.example.Surplus_Exchange_Platform.checkout.dto.request.CheckoutRequest;
import com.example.Surplus_Exchange_Platform.checkout.dto.response.CheckoutItemResponse;
import com.example.Surplus_Exchange_Platform.checkout.dto.response.CheckoutResponse;
import com.example.Surplus_Exchange_Platform.checkout.dto.response.CheckoutSummaryResponse;
import com.example.Surplus_Exchange_Platform.checkout.exception.CheckoutException;
import com.example.Surplus_Exchange_Platform.checkout.service.interfaces.CheckoutService;
import com.example.Surplus_Exchange_Platform.order.dto.request.CreateOrderRequest;
import com.example.Surplus_Exchange_Platform.order.dto.response.OrderResponse;
import com.example.Surplus_Exchange_Platform.order.entity.Order;
import com.example.Surplus_Exchange_Platform.order.service.interfaces.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CheckoutServiceImpl implements CheckoutService {

    private final CartService cartService;
    private final OrderService orderService;

    @Override
    @Transactional(readOnly = true)
    public CheckoutSummaryResponse getCheckoutSummary(String buyerEmail) {

        CartResponse cart = cartService.getCart(buyerEmail);

        List<CheckoutItemResponse> items = cart.getItems()
                .stream()
                .map(this::toCheckoutItem)
                .toList();

        BigDecimal subtotal = items.stream()
                .map(CheckoutItemResponse::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Keep these values server-side so the frontend cannot alter totals.
        BigDecimal shippingCharge = BigDecimal.ZERO;
        BigDecimal discount = BigDecimal.ZERO;

        BigDecimal total = subtotal
                .add(shippingCharge)
                .subtract(discount);

        return CheckoutSummaryResponse.builder()
                .items(items)
                .subtotal(subtotal)
                .shippingCharge(shippingCharge)
                .discount(discount)
                .total(total)
                .build();
    }

    @Override
    @Transactional
    public CheckoutResponse checkout(
            String buyerEmail,
            CheckoutRequest request) {

        validateRequest(request);

        CartResponse cart = cartService.getCart(buyerEmail);

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new CheckoutException("Cart is empty");
        }

        /*
         * Convert CheckoutRequest -> CreateOrderRequest
         */
        CreateOrderRequest orderRequest = new CreateOrderRequest();

        orderRequest.setShippingAddress(
                request.getShippingAddress());

        orderRequest.setShippingCity(
                request.getCity());

        orderRequest.setShippingState(
                request.getState());

        orderRequest.setShippingPincode(
                request.getPostalCode());

        /*
         * Create the actual order using the
         * existing OrderService method.
         */
        OrderResponse order = orderService.placeOrder(
                buyerEmail,
                orderRequest
        );

        /*
         * Return orderId to frontend.
         * Frontend will use this orderId to start Razorpay payment.
         */
        return CheckoutResponse.builder()
                .orderId(order.getId())
                .orderStatus(order.getStatus())
                .paymentStatus("PENDING")
                .amount(order.getTotalAmount())
                .message("Order created. Proceed to payment.")
                .build();
    }

    private CheckoutItemResponse toCheckoutItem(
            CartItemResponse item) {

        return CheckoutItemResponse.builder()
                .productId(item.getProductId())
                .productName(item.getProductName())
                .quantity(item.getQuantity())
                .price(item.getSellingPrice())
                .total(item.getSubtotal())
                .build();
    }

    private void validateRequest(CheckoutRequest request) {
        if (request == null) {
            throw new CheckoutException("Checkout request cannot be null");
        }

        if (request.getPaymentMethod() == null
                || request.getPaymentMethod().isBlank()) {
            throw new CheckoutException("Payment method is required");
        }

        if (request.getShippingAddress() == null
                || request.getShippingAddress().isBlank()) {
            throw new CheckoutException("Shipping address is required");
        }

        if (request.getCity() == null
                || request.getCity().isBlank()) {
            throw new CheckoutException("City is required");
        }

        if (request.getState() == null
                || request.getState().isBlank()) {
            throw new CheckoutException("State is required");
        }

        if (request.getPostalCode() == null
                || request.getPostalCode().isBlank()) {
            throw new CheckoutException("Postal code is required");
        }
    }
}
