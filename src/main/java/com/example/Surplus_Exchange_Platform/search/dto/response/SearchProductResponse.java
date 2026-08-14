package com.example.Surplus_Exchange_Platform.search.dto.response;

import java.math.BigDecimal;

public class SearchProductResponse {

    private Long id;
    private String name;
    private String description;
    private String condition;
    private BigDecimal sellingPrice;
    private Integer quantity;
    private String unit;
    private String categoryName;
    private Long sellerId;
    private String sellerName;

    public SearchProductResponse(
            Long id,
            String name,
            String description,
            String condition,
            BigDecimal sellingPrice,
            Integer quantity,
            String unit,
            String categoryName,
            Long sellerId,
            String sellerName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.condition = condition;
        this.sellingPrice = sellingPrice;
        this.quantity = quantity;
        this.unit = unit;
        this.categoryName = categoryName;
        this.sellerId = sellerId;
        this.sellerName = sellerName;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getCondition() { return condition; }
    public BigDecimal getSellingPrice() { return sellingPrice; }
    public Integer getQuantity() { return quantity; }
    public String getUnit() { return unit; }
    public String getCategoryName() { return categoryName; }
    public Long getSellerId() { return sellerId; }
    public String getSellerName() { return sellerName; }
}
