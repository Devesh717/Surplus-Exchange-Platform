package com.example.Surplus_Exchange_Platform.review.repository;

import com.example.Surplus_Exchange_Platform.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByBuyerIdAndProductId(
            Long buyerId,
            Long productId);

    Page<Review> findByProductIdOrderByCreatedAtDesc(
            Long productId,
            Pageable pageable);

    boolean existsByBuyerIdAndProductId(
            Long buyerId,
            Long productId);
}
