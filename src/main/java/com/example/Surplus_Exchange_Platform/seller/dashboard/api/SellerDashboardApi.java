package com.example.Surplus_Exchange_Platform.seller.dashboard.api;

import com.example.Surplus_Exchange_Platform.seller.dashboard.dto.response.SellerDashboardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

@Tag(
        name = "Seller Dashboard",
        description = "Seller Dashboard and Sales Overview"
)
public interface SellerDashboardApi {

    @Operation(
            summary = "Get Seller Dashboard",
            description = "Get product, order and stock statistics for the authenticated seller"
    )
    ResponseEntity<SellerDashboardResponse> getDashboard(
            Authentication authentication);
}
