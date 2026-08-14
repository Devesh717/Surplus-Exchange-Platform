package com.example.Surplus_Exchange_Platform.admin.order.controller;

import com.example.Surplus_Exchange_Platform.admin.order.api.AdminOrderApi;
import com.example.Surplus_Exchange_Platform.admin.order.dto.response.AdminOrderResponse;
import com.example.Surplus_Exchange_Platform.admin.order.service.interfaces.AdminOrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController
        implements AdminOrderApi {

    private final AdminOrderService adminOrderService;

    public AdminOrderController(
            AdminOrderService adminOrderService) {
        this.adminOrderService = adminOrderService;
    }

    @Override
    @GetMapping
    public ResponseEntity<Page<AdminOrderResponse>> getAllOrders(
            Pageable pageable,
            Authentication authentication) {

        return ResponseEntity.ok(
                adminOrderService.getAllOrders(pageable));
    }

    @Override
    @GetMapping("/{orderId}")
    public ResponseEntity<AdminOrderResponse> getOrderById(
            @PathVariable Long orderId,
            Authentication authentication) {

        return ResponseEntity.ok(
                adminOrderService.getOrderById(orderId));
    }
}
