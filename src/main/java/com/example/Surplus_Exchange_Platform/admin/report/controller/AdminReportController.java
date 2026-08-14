package com.example.Surplus_Exchange_Platform.admin.report.controller;

import com.example.Surplus_Exchange_Platform.admin.dashboard.dto.response.AdminDashboardResponse;
import com.example.Surplus_Exchange_Platform.admin.report.api.AdminReportApi;
import com.example.Surplus_Exchange_Platform.admin.report.service.interfaces.AdminReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/reports")
public class AdminReportController
        implements AdminReportApi {

    private final AdminReportService reportService;

    public AdminReportController(
            AdminReportService reportService) {
        this.reportService = reportService;
    }

    @Override
    @GetMapping("/summary")
    public ResponseEntity<AdminDashboardResponse>
    generatePlatformSummary() {

        return ResponseEntity.ok(
                reportService.generatePlatformSummary());
    }
}
