package com.example.Surplus_Exchange_Platform.cart.controller;

import com.example.Surplus_Exchange_Platform.cart.api.CartApi;
import com.example.Surplus_Exchange_Platform.cart.dto.request.AddToCartRequest;
import com.example.Surplus_Exchange_Platform.cart.dto.request.UpdateCartItemRequest;
import com.example.Surplus_Exchange_Platform.cart.dto.response.CartResponse;
import com.example.Surplus_Exchange_Platform.cart.service.interfaces.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController implements CartApi {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @Override
    @GetMapping
    public ResponseEntity<CartResponse> getCart(
            Authentication authentication) {

        return ResponseEntity.ok(
                cartService.getCart(
                        authentication.getName())
        );
    }

    @Override
    @PostMapping("/items")
    public ResponseEntity<CartResponse> addToCart(
            @Valid @RequestBody AddToCartRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                cartService.addToCart(
                        authentication.getName(),
                        request)
        );
    }

    @Override
    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> updateItem(
            @PathVariable Long itemId,
            @Valid @RequestBody UpdateCartItemRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                cartService.updateItem(
                        authentication.getName(),
                        itemId,
                        request)
        );
    }

    @Override
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> removeItem(
            @PathVariable Long itemId,
            Authentication authentication) {

        cartService.removeItem(
                authentication.getName(),
                itemId);

        return ResponseEntity.ok().build();
    }

    @Override
    @DeleteMapping
    public ResponseEntity<Void> clearCart(
            Authentication authentication) {

        cartService.clearCart(
                authentication.getName());

        return ResponseEntity.ok().build();
    }
}
