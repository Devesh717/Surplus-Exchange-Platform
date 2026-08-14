package com.example.Surplus_Exchange_Platform.user.dashboard.api;

import com.example.Surplus_Exchange_Platform.user.dashboard.dto.response.UserDashboardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

@Tag(
        name = "User Dashboard",
        description = "Authenticated User Dashboard Endpoints"
)
public interface UserDashboardApi {

    @Operation(
            summary = "Get User Dashboard",
            description = "Get dashboard information for the authenticated user")
    ResponseEntity<UserDashboardResponse> getDashboard(
            Authentication authentication);
}
