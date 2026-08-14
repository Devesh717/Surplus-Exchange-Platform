package com.example.Surplus_Exchange_Platform.wishlist.api;

import com.example.Surplus_Exchange_Platform.wishlist.dto.request.AddToWishlistRequest;
import com.example.Surplus_Exchange_Platform.wishlist.dto.response.WishlistResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Wishlist",
        description = "Buyer Wishlist Endpoints"
)
public interface WishlistApi {

    @Operation(
            summary = "Get Wishlist",
            description = "Get the authenticated buyer's wishlist"
    )
    ResponseEntity<WishlistResponse> getWishlist(
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Add Product To Wishlist",
            description = "Add an active product to the buyer's wishlist"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Product added to wishlist"),
            @ApiResponse(
                    responseCode = "400",
                    description = "Product already exists or is unavailable"),
            @ApiResponse(
                    responseCode = "403",
                    description = "Buyer access required")
    })
    ResponseEntity<WishlistResponse> addToWishlist(
            @Valid @RequestBody AddToWishlistRequest request,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Remove Wishlist Item",
            description = "Remove an item from the buyer's wishlist"
    )
    ResponseEntity<Void> removeItem(
            @PathVariable Long itemId,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Clear Wishlist",
            description = "Remove all items from the buyer's wishlist"
    )
    ResponseEntity<Void> clearWishlist(
            org.springframework.security.core.Authentication authentication);
}
