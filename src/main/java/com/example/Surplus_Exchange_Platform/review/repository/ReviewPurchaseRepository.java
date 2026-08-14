package com.example.Surplus_Exchange_Platform.review.repository;

import com.example.Surplus_Exchange_Platform.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewPurchaseRepository
        extends JpaRepository<OrderItem, Long> {

    @Query("""
            SELECT CASE WHEN COUNT(oi) > 0 THEN true ELSE false END
            FROM OrderItem oi
            JOIN oi.order o
            WHERE o.buyer.id = :buyerId
              AND oi.product.id = :productId
              AND o.status = com.example.Surplus_Exchange_Platform.order.entity.OrderStatus.DELIVERED
            """)
    boolean hasDeliveredPurchase(
            @Param("buyerId") Long buyerId,
            @Param("productId") Long productId);
}
