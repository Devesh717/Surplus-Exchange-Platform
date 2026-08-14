package com.example.Surplus_Exchange_Platform.admin.report.service.implementations;

import com.example.Surplus_Exchange_Platform.admin.dashboard.dto.response.AdminDashboardResponse;
import com.example.Surplus_Exchange_Platform.admin.dashboard.service.interfaces.AdminDashboardService;
import com.example.Surplus_Exchange_Platform.admin.report.service.interfaces.AdminReportService;
import org.springframework.stereotype.Service;

@Service
public class AdminReportServiceImpl
        implements AdminReportService {

    private final AdminDashboardService dashboardService;

    public AdminReportServiceImpl(
            AdminDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @Override
    public AdminDashboardResponse generatePlatformSummary() {
        return dashboardService.getDashboard();
    }
}
