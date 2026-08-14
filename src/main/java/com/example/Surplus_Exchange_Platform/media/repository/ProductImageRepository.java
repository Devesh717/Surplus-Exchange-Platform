package com.example.Surplus_Exchange_Platform.media.repository;

import com.example.Surplus_Exchange_Platform.media.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductImageRepository
        extends JpaRepository<ProductImage, Long> {

    List<ProductImage>
    findByProductIdOrderByPrimaryImageDescCreatedAtAsc(
            Long productId);

    Optional<ProductImage> findByIdAndProductId(
            Long imageId,
            Long productId);

    long countByProductId(Long productId);

    Optional<ProductImage>
    findByProductIdAndPrimaryImageTrue(
            Long productId);
}