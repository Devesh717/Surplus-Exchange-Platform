package com.example.Surplus_Exchange_Platform.wishlist.repository;

import com.example.Surplus_Exchange_Platform.wishlist.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WishlistItemRepository
        extends JpaRepository<WishlistItem, Long> {

    Optional<WishlistItem> findByWishlistIdAndProductId(
            Long wishlistId,
            Long productId);

    Optional<WishlistItem> findByIdAndWishlistId(
            Long itemId,
            Long wishlistId);
}
