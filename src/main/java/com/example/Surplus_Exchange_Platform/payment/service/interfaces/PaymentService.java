package com.example.Surplus_Exchange_Platform.payment.service.interfaces;

import com.example.Surplus_Exchange_Platform.payment.dto.request.VerifyPaymentRequest;
import com.example.Surplus_Exchange_Platform.payment.dto.response.CreatePaymentResponse;
import com.example.Surplus_Exchange_Platform.payment.dto.response.PaymentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PaymentService {

    CreatePaymentResponse createPaymentOrder(
            String buyerEmail,
            Long orderId);

    PaymentResponse verifyPayment(
            String buyerEmail,
            VerifyPaymentRequest request);

    PaymentResponse getPayment(
            String buyerEmail,
            Long orderId);

    Page<PaymentResponse> getMyPayments(
            String buyerEmail,
            Pageable pageable);
}
