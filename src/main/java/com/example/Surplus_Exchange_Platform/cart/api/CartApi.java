package com.example.Surplus_Exchange_Platform.cart.api;

import com.example.Surplus_Exchange_Platform.cart.dto.request.AddToCartRequest;
import com.example.Surplus_Exchange_Platform.cart.dto.request.UpdateCartItemRequest;
import com.example.Surplus_Exchange_Platform.cart.dto.response.CartResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Cart",
        description = "Buyer Shopping Cart Endpoints"
)
public interface CartApi {

    @Operation(
            summary = "Get Cart",
            description = "Get the authenticated buyer's cart"
    )
    ResponseEntity<CartResponse> getCart(org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Add Product To Cart",
            description = "Add a product to the authenticated buyer's cart"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Product added to cart"),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid product or insufficient stock"),
            @ApiResponse(
                    responseCode = "403",
                    description = "Buyer access required")
    })
    ResponseEntity<CartResponse> addToCart(
            @Valid @RequestBody AddToCartRequest request,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Update Cart Item",
            description = "Update quantity of a cart item"
    )
    ResponseEntity<CartResponse> updateItem(
            @PathVariable Long itemId,
            @Valid @RequestBody UpdateCartItemRequest request,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Remove Cart Item",
            description = "Remove an item from the cart"
    )
    ResponseEntity<Void> removeItem(
            @PathVariable Long itemId,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Clear Cart",
            description = "Remove all items from the authenticated buyer's cart"
    )
    ResponseEntity<Void> clearCart(org.springframework.security.core.Authentication authentication);
}
