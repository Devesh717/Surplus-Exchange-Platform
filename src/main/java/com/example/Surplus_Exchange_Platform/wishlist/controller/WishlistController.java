package com.example.Surplus_Exchange_Platform.wishlist.controller;

import com.example.Surplus_Exchange_Platform.wishlist.api.WishlistApi;
import com.example.Surplus_Exchange_Platform.wishlist.dto.request.AddToWishlistRequest;
import com.example.Surplus_Exchange_Platform.wishlist.dto.response.WishlistResponse;
import com.example.Surplus_Exchange_Platform.wishlist.service.interfaces.WishlistService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController implements WishlistApi {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @Override
    @GetMapping
    public ResponseEntity<WishlistResponse> getWishlist(
            Authentication authentication) {

        return ResponseEntity.ok(
                wishlistService.getWishlist(
                        authentication.getName())
        );
    }

    @Override
    @PostMapping("/items")
    public ResponseEntity<WishlistResponse> addToWishlist(
            @Valid @RequestBody AddToWishlistRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                wishlistService.addToWishlist(
                        authentication.getName(),
                        request)
        );
    }

    @Override
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> removeItem(
            @PathVariable Long itemId,
            Authentication authentication) {

        wishlistService.removeItem(
                authentication.getName(),
                itemId);

        return ResponseEntity.ok().build();
    }

    @Override
    @DeleteMapping
    public ResponseEntity<Void> clearWishlist(
            Authentication authentication) {

        wishlistService.clearWishlist(
                authentication.getName());

        return ResponseEntity.ok().build();
    }
}
