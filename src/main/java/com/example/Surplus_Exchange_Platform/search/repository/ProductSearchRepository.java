package com.example.Surplus_Exchange_Platform.search.repository;

import com.example.Surplus_Exchange_Platform.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface ProductSearchRepository
        extends JpaRepository<Product, Long> {

    @Query("""
            SELECT p
            FROM Product p
            JOIN p.category c
            JOIN p.seller s
            WHERE p.active = true
              AND (
                    LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
                  )
              AND (:categoryId IS NULL OR c.id = :categoryId)
              AND (:minPrice IS NULL OR p.sellingPrice >= :minPrice)
              AND (:maxPrice IS NULL OR p.sellingPrice <= :maxPrice)
              AND (:availableOnly = false OR p.quantity > 0)
            """)
    Page<Product> search(
            @Param("keyword") String keyword,
            @Param("categoryId") Long categoryId,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("availableOnly") boolean availableOnly,
            Pageable pageable);
}
