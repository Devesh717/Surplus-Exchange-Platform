package com.example.Surplus_Exchange_Platform.seller.order.api;

import com.example.Surplus_Exchange_Platform.seller.order.dto.request.UpdateSellerOrderStatusRequest;
import com.example.Surplus_Exchange_Platform.seller.order.dto.response.SellerOrderResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

@Tag(
        name = "Seller Order",
        description = "Seller Order Processing and Sales Order Endpoints"
)
public interface SellerOrderApi {

    @Operation(
            summary = "View Seller Orders",
            description = "View orders containing products belonging to the authenticated seller"
    )
    ResponseEntity<Page<SellerOrderResponse>> getMyOrders(
            Pageable pageable,
            Authentication authentication);

    @Operation(
            summary = "View Seller Order",
            description = "View one seller order")
    ResponseEntity<SellerOrderResponse> getById(
            Long sellerOrderId,
            Authentication authentication);

    @Operation(
            summary = "Update Seller Order Status",
            description = "Move a seller order through its processing lifecycle")
    @ApiResponse(
            responseCode = "200",
            description = "Order status updated")
    ResponseEntity<SellerOrderResponse> updateStatus(
            Long sellerOrderId,
            @Valid UpdateSellerOrderStatusRequest request,
            Authentication authentication);
}
