package com.example.Surplus_Exchange_Platform.order.controller;

import com.example.Surplus_Exchange_Platform.order.api.OrderApi;
import com.example.Surplus_Exchange_Platform.order.dto.request.CreateOrderRequest;
import com.example.Surplus_Exchange_Platform.order.dto.request.UpdateOrderStatusRequest;
import com.example.Surplus_Exchange_Platform.order.dto.response.OrderResponse;
import com.example.Surplus_Exchange_Platform.order.service.interfaces.OrderService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController implements OrderApi {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override
    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            @Valid @RequestBody CreateOrderRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                orderService.placeOrder(
                        authentication.getName(),
                        request)
        );
    }

    @Override
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrder(
            @PathVariable Long orderId,
            Authentication authentication) {

        return ResponseEntity.ok(
                orderService.getOrder(
                        authentication.getName(),
                        orderId)
        );
    }

    @Override
    @GetMapping
    public ResponseEntity<Page<OrderResponse>> getMyOrders(
            Pageable pageable,
            Authentication authentication) {

        return ResponseEntity.ok(
                orderService.getMyOrders(
                        authentication.getName(),
                        pageable)
        );
    }

    @Override
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<OrderResponse> cancelOrder(
            @PathVariable Long orderId,
            Authentication authentication) {

        return ResponseEntity.ok(
                orderService.cancelOrder(
                        authentication.getName(),
                        orderId)
        );
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse> updateStatus(
            @PathVariable Long orderId,
            @Valid @RequestBody UpdateOrderStatusRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                orderService.updateStatus(
                        authentication.getName(),
                        orderId,
                        request.getStatus())
        );
    }
}
