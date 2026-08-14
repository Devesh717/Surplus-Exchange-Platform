package com.example.Surplus_Exchange_Platform.media.dto.response;

import java.time.LocalDateTime;

public class ProductImageResponse {

    private Long id;
    private Long productId;
    private String imageUrl;
    private boolean primaryImage;
    private LocalDateTime createdAt;

    public ProductImageResponse(
            Long id,
            Long productId,
            String imageUrl,
            boolean primaryImage,
            LocalDateTime createdAt) {

        this.id = id;
        this.productId = productId;
        this.imageUrl = imageUrl;
        this.primaryImage = primaryImage;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getProductId() {
        return productId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public boolean isPrimaryImage() {
        return primaryImage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}