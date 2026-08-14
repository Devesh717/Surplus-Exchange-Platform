package com.example.Surplus_Exchange_Platform.wishlist.dto.request;

import jakarta.validation.constraints.NotNull;

public class AddToWishlistRequest {

    @NotNull(message = "Product ID is required")
    private Long productId;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
