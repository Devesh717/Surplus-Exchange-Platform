package com.example.Surplus_Exchange_Platform.seller.order.controller;

import com.example.Surplus_Exchange_Platform.seller.order.api.SellerOrderApi;
import com.example.Surplus_Exchange_Platform.seller.order.dto.request.UpdateSellerOrderStatusRequest;
import com.example.Surplus_Exchange_Platform.seller.order.dto.response.SellerOrderResponse;
import com.example.Surplus_Exchange_Platform.seller.order.service.interfaces.SellerOrderService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller/orders")
public class SellerOrderController
        implements SellerOrderApi {

    private final SellerOrderService sellerOrderService;

    public SellerOrderController(
            SellerOrderService sellerOrderService) {
        this.sellerOrderService = sellerOrderService;
    }

    @Override
    @GetMapping
    public ResponseEntity<Page<SellerOrderResponse>> getMyOrders(
            Pageable pageable,
            Authentication authentication) {

        return ResponseEntity.ok(
                sellerOrderService.getMyOrders(
                        authentication.getName(),
                        pageable)
        );
    }

    @Override
    @GetMapping("/{sellerOrderId}")
    public ResponseEntity<SellerOrderResponse> getById(
            @PathVariable Long sellerOrderId,
            Authentication authentication) {

        return ResponseEntity.ok(
                sellerOrderService.getById(
                        authentication.getName(),
                        sellerOrderId)
        );
    }

    @Override
    @PutMapping("/{sellerOrderId}/status")
    public ResponseEntity<SellerOrderResponse> updateStatus(
            @PathVariable Long sellerOrderId,
            @Valid @RequestBody UpdateSellerOrderStatusRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                sellerOrderService.updateStatus(
                        authentication.getName(),
                        sellerOrderId,
                        request)
        );
    }
}
