package com.example.Surplus_Exchange_Platform.user.dashboard.controller;

import com.example.Surplus_Exchange_Platform.user.dashboard.api.UserDashboardApi;
import com.example.Surplus_Exchange_Platform.user.dashboard.dto.response.UserDashboardResponse;
import com.example.Surplus_Exchange_Platform.user.dashboard.service.interfaces.UserDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/dashboard")
public class UserDashboardController
        implements UserDashboardApi {

    private final UserDashboardService dashboardService;

    public UserDashboardController(
            UserDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @Override
    @GetMapping
    public ResponseEntity<UserDashboardResponse> getDashboard(
            Authentication authentication) {

        return ResponseEntity.ok(
                dashboardService.getDashboard(
                        authentication.getName()));
    }
}
