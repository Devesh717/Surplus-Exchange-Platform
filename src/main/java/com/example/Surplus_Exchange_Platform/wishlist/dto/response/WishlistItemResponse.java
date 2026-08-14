package com.example.Surplus_Exchange_Platform.wishlist.dto.response;

import java.math.BigDecimal;

public class WishlistItemResponse {

    private Long itemId;
    private Long productId;
    private String productName;
    private BigDecimal sellingPrice;
    private Integer quantity;
    private String unit;
    private boolean available;

    public WishlistItemResponse(
            Long itemId,
            Long productId,
            String productName,
            BigDecimal sellingPrice,
            Integer quantity,
            String unit,
            boolean available) {
        this.itemId = itemId;
        this.productId = productId;
        this.productName = productName;
        this.sellingPrice = sellingPrice;
        this.quantity = quantity;
        this.unit = unit;
        this.available = available;
    }

    public Long getItemId() { return itemId; }
    public Long getProductId() { return productId; }
    public String getProductName() { return productName; }
    public BigDecimal getSellingPrice() { return sellingPrice; }
    public Integer getQuantity() { return quantity; }
    public String getUnit() { return unit; }
    public boolean isAvailable() { return available; }
}
