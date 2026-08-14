package com.example.Surplus_Exchange_Platform.order.service.interfaces;

import com.example.Surplus_Exchange_Platform.order.dto.request.CreateOrderRequest;
import com.example.Surplus_Exchange_Platform.order.dto.response.OrderResponse;
import com.example.Surplus_Exchange_Platform.order.entity.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {

    OrderResponse placeOrder(
            String buyerEmail,
            CreateOrderRequest request);

    OrderResponse getOrder(
            String buyerEmail,
            Long orderId);

    Page<OrderResponse> getMyOrders(
            String buyerEmail,
            Pageable pageable);

    OrderResponse cancelOrder(
            String buyerEmail,
            Long orderId);

    OrderResponse updateStatus(
            String sellerEmail,
            Long orderId,
            OrderStatus status);
}
