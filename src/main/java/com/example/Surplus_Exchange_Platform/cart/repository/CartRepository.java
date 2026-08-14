package com.example.Surplus_Exchange_Platform.cart.repository;

import com.example.Surplus_Exchange_Platform.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByBuyerId(Long buyerId);
}
