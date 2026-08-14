package com.example.Surplus_Exchange_Platform.cart.dto.response;

import java.math.BigDecimal;

public class CartItemResponse {

    private Long itemId;
    private Long productId;
    private String productName;
    private BigDecimal sellingPrice;
    private Integer quantity;
    private String unit;
    private BigDecimal subtotal;

    public CartItemResponse(
            Long itemId,
            Long productId,
            String productName,
            BigDecimal sellingPrice,
            Integer quantity,
            String unit,
            BigDecimal subtotal) {
        this.itemId = itemId;
        this.productId = productId;
        this.productName = productName;
        this.sellingPrice = sellingPrice;
        this.quantity = quantity;
        this.unit = unit;
        this.subtotal = subtotal;
    }

    public Long getItemId() { return itemId; }
    public Long getProductId() { return productId; }
    public String getProductName() { return productName; }
    public BigDecimal getSellingPrice() { return sellingPrice; }
    public Integer getQuantity() { return quantity; }
    public String getUnit() { return unit; }
    public BigDecimal getSubtotal() { return subtotal; }
}
