package com.example.Surplus_Exchange_Platform.cart.service.interfaces;

import com.example.Surplus_Exchange_Platform.cart.dto.request.AddToCartRequest;
import com.example.Surplus_Exchange_Platform.cart.dto.request.UpdateCartItemRequest;
import com.example.Surplus_Exchange_Platform.cart.dto.response.CartResponse;

public interface CartService {

    CartResponse getCart(String buyerEmail);

    CartResponse addToCart(
            String buyerEmail,
            AddToCartRequest request);

    CartResponse updateItem(
            String buyerEmail,
            Long itemId,
            UpdateCartItemRequest request);

    void removeItem(
            String buyerEmail,
            Long itemId);

    void clearCart(String buyerEmail);
}
