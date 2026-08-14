package com.example.Surplus_Exchange_Platform.seller.order.repository;

import com.example.Surplus_Exchange_Platform.seller.order.entity.SellerOrder;
import com.example.Surplus_Exchange_Platform.seller.order.entity.SellerOrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SellerOrderRepository
        extends JpaRepository<SellerOrder, Long> {

    Page<SellerOrder> findBySellerIdOrderByCreatedAtDesc(
            Long sellerId,
            Pageable pageable);

    Optional<SellerOrder> findByIdAndSellerId(
            Long sellerOrderId,
            Long sellerId);

    Page<SellerOrder> findBySellerIdAndStatusOrderByCreatedAtDesc(
            Long sellerId,
            SellerOrderStatus status,
            Pageable pageable);
}
