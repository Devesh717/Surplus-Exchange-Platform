package com.example.Surplus_Exchange_Platform.seller.dashboard.controller;

import com.example.Surplus_Exchange_Platform.seller.dashboard.api.SellerDashboardApi;
import com.example.Surplus_Exchange_Platform.seller.dashboard.dto.response.SellerDashboardResponse;
import com.example.Surplus_Exchange_Platform.seller.dashboard.service.interfaces.SellerDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller/dashboard")
public class SellerDashboardController
        implements SellerDashboardApi {

    private final SellerDashboardService dashboardService;

    public SellerDashboardController(
            SellerDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @Override
    @GetMapping
    public ResponseEntity<SellerDashboardResponse> getDashboard(
            Authentication authentication) {

        return ResponseEntity.ok(
                dashboardService.getDashboard(
                        authentication.getName()));
    }
}
