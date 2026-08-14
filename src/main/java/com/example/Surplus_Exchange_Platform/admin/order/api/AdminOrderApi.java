package com.example.Surplus_Exchange_Platform.admin.order.api;

import com.example.Surplus_Exchange_Platform.admin.order.dto.response.AdminOrderResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

@Tag(
        name = "Admin Orders",
        description = "Admin Order Monitoring Endpoints"
)
public interface AdminOrderApi {

    @Operation(
            summary = "View All Orders",
            description = "View all platform orders for monitoring")
    @ApiResponse(
            responseCode = "200",
            description = "Orders returned successfully")
    ResponseEntity<Page<AdminOrderResponse>> getAllOrders(
            Pageable pageable,
            Authentication authentication);

    @Operation(
            summary = "View Order",
            description = "View a platform order by ID")
    ResponseEntity<AdminOrderResponse> getOrderById(
            Long orderId,
            Authentication authentication);
}
