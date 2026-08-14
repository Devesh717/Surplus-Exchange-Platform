package com.example.Surplus_Exchange_Platform.wishlist.dto.response;

import java.util.List;

public class WishlistResponse {

    private Long wishlistId;
    private List<WishlistItemResponse> items;

    public WishlistResponse(
            Long wishlistId,
            List<WishlistItemResponse> items) {
        this.wishlistId = wishlistId;
        this.items = items;
    }

    public Long getWishlistId() {
        return wishlistId;
    }

    public List<WishlistItemResponse> getItems() {
        return items;
    }
}
