package com.example.Surplus_Exchange_Platform.payment.repository;

import com.example.Surplus_Exchange_Platform.payment.entity.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByOrderId(Long orderId);

    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);

    boolean existsByRazorpayPaymentId(String razorpayPaymentId);

    Page<Payment> findByOrderBuyerIdOrderByCreatedAtDesc(
            Long buyerId,
            Pageable pageable);
}
