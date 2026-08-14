package com.example.Surplus_Exchange_Platform.admin.report.api;

import com.example.Surplus_Exchange_Platform.admin.dashboard.dto.response.AdminDashboardResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(
        name = "Admin Reports",
        description = "Platform Reporting Endpoints"
)
public interface AdminReportApi {

    @Operation(
            summary = "Generate Platform Summary",
            description = "Generate a current platform summary for administrative reporting")
    ResponseEntity<AdminDashboardResponse> generatePlatformSummary();
}
