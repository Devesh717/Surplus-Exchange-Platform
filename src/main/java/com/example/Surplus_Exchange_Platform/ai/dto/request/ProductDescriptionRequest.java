package com.example.Surplus_Exchange_Platform.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProductDescriptionRequest {

    @NotBlank(message = "Product name is required")
    @Size(max = 200, message = "Product name must not exceed 200 characters")
    private String productName;

    @NotBlank(message = "Condition is required")
    @Size(max = 50, message = "Condition must not exceed 50 characters")
    private String condition;

    @Size(max = 2000, message = "Specifications must not exceed 2000 characters")
    private String specifications;

    @Size(max = 1000, message = "Additional details must not exceed 1000 characters")
    private String additionalDetails;

    public String getProductName() { return productName; }
    public String getCondition() { return condition; }
    public String getSpecifications() { return specifications; }
    public String getAdditionalDetails() { return additionalDetails; }

    public void setProductName(String productName) { this.productName = productName; }
    public void setCondition(String condition) { this.condition = condition; }
    public void setSpecifications(String specifications) { this.specifications = specifications; }
    public void setAdditionalDetails(String additionalDetails) { this.additionalDetails = additionalDetails; }
}
