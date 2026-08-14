package com.example.Surplus_Exchange_Platform.wishlist.repository;

import com.example.Surplus_Exchange_Platform.wishlist.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    Optional<Wishlist> findByBuyerId(Long buyerId);
}
