package com.example.Surplus_Exchange_Platform.seller.order.dto.response;

import com.example.Surplus_Exchange_Platform.seller.order.entity.SellerOrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class SellerOrderResponse {

    private Long sellerOrderId;
    private Long orderId;
    private Long buyerId;
    private SellerOrderStatus status;
    private String sellerNote;
    private BigDecimal orderTotal;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public SellerOrderResponse(
            Long sellerOrderId,
            Long orderId,
            Long buyerId,
            SellerOrderStatus status,
            String sellerNote,
            BigDecimal orderTotal,
            LocalDateTime createdAt,
            LocalDateTime updatedAt) {
        this.sellerOrderId = sellerOrderId;
        this.orderId = orderId;
        this.buyerId = buyerId;
        this.status = status;
        this.sellerNote = sellerNote;
        this.orderTotal = orderTotal;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getSellerOrderId() { return sellerOrderId; }
    public Long getOrderId() { return orderId; }
    public Long getBuyerId() { return buyerId; }
    public SellerOrderStatus getStatus() { return status; }
    public String getSellerNote() { return sellerNote; }
    public BigDecimal getOrderTotal() { return orderTotal; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
