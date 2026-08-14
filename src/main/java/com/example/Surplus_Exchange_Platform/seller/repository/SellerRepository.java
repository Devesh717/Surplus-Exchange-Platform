package com.example.Surplus_Exchange_Platform.seller.repository;

import com.example.Surplus_Exchange_Platform.seller.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller, Long> {

    Optional<Seller> findBySellerId(Long sellerId);

    boolean existsBySellerId(Long sellerId);

    boolean existsByRegistrationNumber(String registrationNumber);
}
