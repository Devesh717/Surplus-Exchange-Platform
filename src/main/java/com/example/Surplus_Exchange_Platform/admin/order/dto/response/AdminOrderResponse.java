package com.example.Surplus_Exchange_Platform.admin.order.dto.response;

import java.math.BigDecimal;

public class AdminOrderResponse {

    private Long orderId;
    private Long buyerId;
    private BigDecimal totalAmount;

    public AdminOrderResponse(
            Long orderId,
            Long buyerId,
            BigDecimal totalAmount) {
        this.orderId = orderId;
        this.buyerId = buyerId;
        this.totalAmount = totalAmount;
    }

    public Long getOrderId() {
        return orderId;
    }

    public Long getBuyerId() {
        return buyerId;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }
}
