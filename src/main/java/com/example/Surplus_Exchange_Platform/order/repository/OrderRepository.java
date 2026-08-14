package com.example.Surplus_Exchange_Platform.order.repository;

import com.example.Surplus_Exchange_Platform.order.entity.Order;
import com.example.Surplus_Exchange_Platform.order.entity.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderNumber(String orderNumber);

    Page<Order> findByBuyerIdOrderByCreatedAtDesc(
            Long buyerId,
            Pageable pageable);

    Page<Order> findByBuyerIdAndStatusOrderByCreatedAtDesc(
            Long buyerId,
            OrderStatus status,
            Pageable pageable);

    long countByBuyerId(Long buyerId);
}
