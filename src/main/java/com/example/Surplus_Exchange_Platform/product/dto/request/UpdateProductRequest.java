package com.example.Surplus_Exchange_Platform.product.dto.request;

import com.example.Surplus_Exchange_Platform.product.entity.ProductCondition;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public class UpdateProductRequest {

    @NotBlank(message = "Product name is required")
    @Size(max = 200, message = "Product name must not exceed 200 characters")
    private String name;

    @NotBlank(message = "Product description is required")
    @Size(max = 5000, message = "Description must not exceed 5000 characters")
    private String description;

    @NotNull(message = "Product condition is required")
    private ProductCondition condition;

    @NotNull(message = "Original price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal originalPrice;

    @NotNull(message = "Selling price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal sellingPrice;

    @NotNull(message = "Quantity is required")
    @Min(value = 0)
    private Integer quantity;

    @NotBlank(message = "Unit is required")
    private String unit;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    private Boolean active;

    public String getName() { return name; }
    public String getDescription() { return description; }
    public ProductCondition getCondition() { return condition; }
    public BigDecimal getOriginalPrice() { return originalPrice; }
    public BigDecimal getSellingPrice() { return sellingPrice; }
    public Integer getQuantity() { return quantity; }
    public String getUnit() { return unit; }
    public Long getCategoryId() { return categoryId; }
    public Boolean getActive() { return active; }

    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setCondition(ProductCondition condition) { this.condition = condition; }
    public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }
    public void setSellingPrice(BigDecimal sellingPrice) { this.sellingPrice = sellingPrice; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public void setUnit(String unit) { this.unit = unit; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    public void setActive(Boolean active) { this.active = active; }
}
