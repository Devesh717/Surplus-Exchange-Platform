package com.example.Surplus_Exchange_Platform.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProductRecommendationRequest {

    @NotBlank(message = "Requirement is required")
    @Size(max = 2000, message = "Requirement must not exceed 2000 characters")
    private String requirement;

    public String getRequirement() {
        return requirement;
    }

    public void setRequirement(String requirement) {
        this.requirement = requirement;
    }
}
