package com.example.Surplus_Exchange_Platform.admin.dashboard.controller;

import com.example.Surplus_Exchange_Platform.admin.dashboard.api.AdminDashboardApi;
import com.example.Surplus_Exchange_Platform.admin.dashboard.dto.response.AdminDashboardResponse;
import com.example.Surplus_Exchange_Platform.admin.dashboard.service.interfaces.AdminDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController
        implements AdminDashboardApi {

    private final AdminDashboardService dashboardService;

    public AdminDashboardController(
            AdminDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @Override
    @GetMapping
    public ResponseEntity<AdminDashboardResponse> getDashboard() {

        return ResponseEntity.ok(
                dashboardService.getDashboard());
    }
}
