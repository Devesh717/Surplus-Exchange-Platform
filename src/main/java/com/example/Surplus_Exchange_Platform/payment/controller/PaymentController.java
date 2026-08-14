package com.example.Surplus_Exchange_Platform.payment.controller;

import com.example.Surplus_Exchange_Platform.payment.api.PaymentApi;
import com.example.Surplus_Exchange_Platform.payment.dto.request.VerifyPaymentRequest;
import com.example.Surplus_Exchange_Platform.payment.dto.response.CreatePaymentResponse;
import com.example.Surplus_Exchange_Platform.payment.dto.response.PaymentResponse;
import com.example.Surplus_Exchange_Platform.payment.service.interfaces.PaymentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController implements PaymentApi {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @Override
    @PostMapping("/orders/{orderId}")
    public ResponseEntity<CreatePaymentResponse> createPaymentOrder(
            @PathVariable Long orderId,
            Authentication authentication) {

        return ResponseEntity.ok(
                paymentService.createPaymentOrder(
                        authentication.getName(),
                        orderId)
        );
    }

    @Override
    @PostMapping("/verify")
    public ResponseEntity<PaymentResponse> verifyPayment(
            @Valid @RequestBody VerifyPaymentRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                paymentService.verifyPayment(
                        authentication.getName(),
                        request)
        );
    }

    @Override
    @GetMapping("/orders/{orderId}")
    public ResponseEntity<PaymentResponse> getPayment(
            @PathVariable Long orderId,
            Authentication authentication) {

        return ResponseEntity.ok(
                paymentService.getPayment(
                        authentication.getName(),
                        orderId)
        );
    }

    @Override
    @GetMapping
    public ResponseEntity<Page<PaymentResponse>> getMyPayments(
            Pageable pageable,
            Authentication authentication) {

        return ResponseEntity.ok(
                paymentService.getMyPayments(
                        authentication.getName(),
                        pageable)
        );
    }
}
