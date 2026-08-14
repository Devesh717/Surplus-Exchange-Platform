package com.example.Surplus_Exchange_Platform.admin.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UpdateVerificationRequest {

    @NotNull(message = "Verification status is required")
    private Boolean verified;

    @Size(max = 500, message = "Reason cannot exceed 500 characters")
    private String reason;

    public Boolean getVerified() {
        return verified;
    }

    public String getReason() {
        return reason;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
