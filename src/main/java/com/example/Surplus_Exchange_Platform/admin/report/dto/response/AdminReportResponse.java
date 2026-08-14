package com.example.Surplus_Exchange_Platform.admin.report.dto.response;

import java.time.LocalDateTime;

public class AdminReportResponse {

    private String reportType;
    private LocalDateTime generatedAt;
    private String message;

    public AdminReportResponse(
            String reportType,
            LocalDateTime generatedAt,
            String message) {
        this.reportType = reportType;
        this.generatedAt = generatedAt;
        this.message = message;
    }

    public String getReportType() { return reportType; }
    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public String getMessage() { return message; }
}
