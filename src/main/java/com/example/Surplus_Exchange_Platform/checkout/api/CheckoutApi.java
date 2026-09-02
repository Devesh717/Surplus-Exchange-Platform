package com.example.Surplus_Exchange_Platform.checkout.api;

import com.example.Surplus_Exchange_Platform.checkout.dto.request.CheckoutRequest;
import com.example.Surplus_Exchange_Platform.checkout.dto.response.CheckoutResponse;
import com.example.Surplus_Exchange_Platform.checkout.dto.response.CheckoutSummaryResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

public interface CheckoutApi {

    @GetMapping("/summary")
    ResponseEntity<CheckoutSummaryResponse> getCheckoutSummary(
            Authentication authentication);

    @PostMapping
    ResponseEntity<CheckoutResponse> checkout(
            @RequestBody CheckoutRequest request,
            Authentication authentication);
}
