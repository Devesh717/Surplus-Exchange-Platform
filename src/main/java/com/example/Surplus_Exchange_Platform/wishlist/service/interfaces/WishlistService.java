package com.example.Surplus_Exchange_Platform.wishlist.service.interfaces;

import com.example.Surplus_Exchange_Platform.wishlist.dto.request.AddToWishlistRequest;
import com.example.Surplus_Exchange_Platform.wishlist.dto.response.WishlistResponse;

public interface WishlistService {

    WishlistResponse getWishlist(String buyerEmail);

    WishlistResponse addToWishlist(
            String buyerEmail,
            AddToWishlistRequest request);

    void removeItem(
            String buyerEmail,
            Long itemId);

    void clearWishlist(String buyerEmail);
}
