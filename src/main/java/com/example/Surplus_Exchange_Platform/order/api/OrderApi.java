package com.example.Surplus_Exchange_Platform.order.api;

import com.example.Surplus_Exchange_Platform.order.dto.request.CreateOrderRequest;
import com.example.Surplus_Exchange_Platform.order.dto.response.OrderResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Order",
        description = "Buyer Order Management Endpoints"
)
public interface OrderApi {

    @Operation(
            summary = "Place Order",
            description = "Create an order from the authenticated buyer's cart"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Order created successfully"),
            @ApiResponse(
                    responseCode = "400",
                    description = "Cart empty or insufficient stock"),
            @ApiResponse(
                    responseCode = "403",
                    description = "Buyer access required")
    })
    ResponseEntity<OrderResponse> placeOrder(
            @Valid @RequestBody CreateOrderRequest request,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Get Order",
            description = "Get a specific order belonging to the authenticated buyer"
    )
    ResponseEntity<OrderResponse> getOrder(
            @PathVariable Long orderId,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Get My Orders",
            description = "Get authenticated buyer's order history"
    )
    ResponseEntity<Page<OrderResponse>> getMyOrders(
            Pageable pageable,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Cancel Order",
            description = "Cancel an eligible order and restore product stock"
    )
    ResponseEntity<OrderResponse> cancelOrder(
            @PathVariable Long orderId,
            org.springframework.security.core.Authentication authentication);
}
