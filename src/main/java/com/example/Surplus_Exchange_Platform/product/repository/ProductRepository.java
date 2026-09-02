package com.example.Surplus_Exchange_Platform.product.repository;

import com.example.Surplus_Exchange_Platform.product.enums.ProductVerificationStatus;
import com.example.Surplus_Exchange_Platform.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    Page<Product> findByActiveTrueAndVerifiedTrue(
            Pageable pageable);

    Page<Product> findByCategoryIdAndActiveTrueAndVerifiedTrue(
            Long categoryId,
            Pageable pageable);

    Page<Product> findBySellerId(
            Long sellerId,
            Pageable pageable);

    long countBySellerId(Long sellerId);

    long countBySellerIdAndActiveTrue(Long sellerId);

    long countBySellerIdAndVerifiedFalse(Long sellerId);

    long countBySellerIdAndQuantityBetween(
            Long sellerId,
            Integer min,
            Integer max);

    long countBySellerIdAndQuantity(
            Long sellerId,
            Integer quantity);

    long countByVerifiedTrue();

    long countByVerifiedFalse();

    List<Product> findByVerificationStatus(
            ProductVerificationStatus productVerificationStatus
    );
}