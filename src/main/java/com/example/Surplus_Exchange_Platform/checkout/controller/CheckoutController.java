package com.example.Surplus_Exchange_Platform.checkout.controller;

import com.example.Surplus_Exchange_Platform.checkout.api.CheckoutApi;
import com.example.Surplus_Exchange_Platform.checkout.dto.request.CheckoutRequest;
import com.example.Surplus_Exchange_Platform.checkout.dto.response.CheckoutResponse;
import com.example.Surplus_Exchange_Platform.checkout.dto.response.CheckoutSummaryResponse;
import com.example.Surplus_Exchange_Platform.checkout.service.interfaces.CheckoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
@RequiredArgsConstructor
public class CheckoutController implements CheckoutApi {

    private final CheckoutService checkoutService;

    @Override
    @GetMapping("/summary")
    public ResponseEntity<CheckoutSummaryResponse> getCheckoutSummary(
            Authentication authentication) {

        return ResponseEntity.ok(
                checkoutService.getCheckoutSummary(
                        authentication.getName())
        );
    }

    @Override
    @PostMapping
    public ResponseEntity<CheckoutResponse> checkout(
            @RequestBody CheckoutRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                checkoutService.checkout(
                        authentication.getName(),
                        request)
        );
    }
}
