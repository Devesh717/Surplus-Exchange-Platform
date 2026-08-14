package com.example.Surplus_Exchange_Platform.stock.dto.response;

public class StockResponse {

    private Long productId;
    private Integer quantity;
    private String unit;
    private boolean available;

    public StockResponse(
            Long productId,
            Integer quantity,
            String unit,
            boolean available) {
        this.productId = productId;
        this.quantity = quantity;
        this.unit = unit;
        this.available = available;
    }

    public Long getProductId() {
        return productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getUnit() {
        return unit;
    }

    public boolean isAvailable() {
        return available;
    }
}
