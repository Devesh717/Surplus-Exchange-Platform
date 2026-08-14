package com.example.Surplus_Exchange_Platform.review.dto.response;

import java.time.LocalDateTime;

public class ReviewResponse {

    private Long id;
    private Long productId;
    private Long buyerId;
    private String buyerName;
    private Integer rating;
    private String comment;
    private boolean verifiedPurchase;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ReviewResponse(
            Long id,
            Long productId,
            Long buyerId,
            String buyerName,
            Integer rating,
            String comment,
            boolean verifiedPurchase,
            LocalDateTime createdAt,
            LocalDateTime updatedAt) {
        this.id = id;
        this.productId = productId;
        this.buyerId = buyerId;
        this.buyerName = buyerName;
        this.rating = rating;
        this.comment = comment;
        this.verifiedPurchase = verifiedPurchase;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public Long getProductId() { return productId; }
    public Long getBuyerId() { return buyerId; }
    public String getBuyerName() { return buyerName; }
    public Integer getRating() { return rating; }
    public String getComment() { return comment; }
    public boolean isVerifiedPurchase() { return verifiedPurchase; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
