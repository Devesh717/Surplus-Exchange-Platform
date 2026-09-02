package com.example.Surplus_Exchange_Platform.seller.repository;

import com.example.Surplus_Exchange_Platform.product.enums.ProductVerificationStatus;
import com.example.Surplus_Exchange_Platform.seller.entity.Seller;
import com.example.Surplus_Exchange_Platform.seller.entity.SellerVerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller, Long> {

    Optional<Seller> findBySellerId(Long sellerId);

    boolean existsBySellerId(Long sellerId);

    boolean existsByRegistrationNumber(String registrationNumber);

    List<Seller> findByVerificationStatus(SellerVerificationStatus sellerVerificationStatus);
}
