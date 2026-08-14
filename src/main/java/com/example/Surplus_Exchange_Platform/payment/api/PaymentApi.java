package com.example.Surplus_Exchange_Platform.payment.api;

import com.example.Surplus_Exchange_Platform.payment.dto.request.VerifyPaymentRequest;
import com.example.Surplus_Exchange_Platform.payment.dto.response.CreatePaymentResponse;
import com.example.Surplus_Exchange_Platform.payment.dto.response.PaymentResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Payment",
        description = "Razorpay Payment Endpoints"
)
public interface PaymentApi {

    @Operation(
            summary = "Create Razorpay Order",
            description = "Create a Razorpay payment order for a pending marketplace order"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Razorpay order created"),
            @ApiResponse(responseCode = "400", description = "Invalid order or payment state"),
            @ApiResponse(responseCode = "403", description = "Not authorized")
    })
    ResponseEntity<CreatePaymentResponse> createPaymentOrder(
            @PathVariable Long orderId,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Verify Payment",
            description = "Verify Razorpay payment signature and confirm the marketplace order"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Payment verified successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid payment or signature")
    })
    ResponseEntity<PaymentResponse> verifyPayment(
            @Valid @RequestBody VerifyPaymentRequest request,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Get Payment",
            description = "Get payment details for a specific order"
    )
    ResponseEntity<PaymentResponse> getPayment(
            @PathVariable Long orderId,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Get My Payment History",
            description = "Get the authenticated user's payment transaction history, newest first"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Payment history retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Authentication required")
    })
    ResponseEntity<Page<PaymentResponse>> getMyPayments(
            Pageable pageable,
            org.springframework.security.core.Authentication authentication);
}
