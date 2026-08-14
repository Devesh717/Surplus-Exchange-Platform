package com.example.Surplus_Exchange_Platform.product.dto.response;

import java.math.BigDecimal;

public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private String condition;
    private BigDecimal originalPrice;
    private BigDecimal sellingPrice;
    private Integer quantity;
    private String unit;
    private boolean active;
    private Long sellerId;
    private String sellerName;
    private Long categoryId;
    private String categoryName;

    public ProductResponse(
            Long id,
            String name,
            String description,
            String condition,
            BigDecimal originalPrice,
            BigDecimal sellingPrice,
            Integer quantity,
            String unit,
            boolean active,
            Long sellerId,
            String sellerName,
            Long categoryId,
            String categoryName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.condition = condition;
        this.originalPrice = originalPrice;
        this.sellingPrice = sellingPrice;
        this.quantity = quantity;
        this.unit = unit;
        this.active = active;
        this.sellerId = sellerId;
        this.sellerName = sellerName;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getCondition() { return condition; }
    public BigDecimal getOriginalPrice() { return originalPrice; }
    public BigDecimal getSellingPrice() { return sellingPrice; }
    public Integer getQuantity() { return quantity; }
    public String getUnit() { return unit; }
    public boolean isActive() { return active; }
    public Long getSellerId() { return sellerId; }
    public String getSellerName() { return sellerName; }
    public Long getCategoryId() { return categoryId; }
    public String getCategoryName() { return categoryName; }
}
