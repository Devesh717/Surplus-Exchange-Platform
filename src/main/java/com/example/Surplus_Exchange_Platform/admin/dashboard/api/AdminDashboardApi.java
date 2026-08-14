package com.example.Surplus_Exchange_Platform.admin.dashboard.api;

import com.example.Surplus_Exchange_Platform.admin.dashboard.dto.response.AdminDashboardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(
        name = "Admin Dashboard",
        description = "Admin Dashboard and Platform Analytics"
)
public interface AdminDashboardApi {

    @Operation(
            summary = "Get Admin Dashboard",
            description = "Get platform-level user, product and seller verification statistics")
    ResponseEntity<AdminDashboardResponse> getDashboard();
}
