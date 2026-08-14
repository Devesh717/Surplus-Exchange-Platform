package com.example.Surplus_Exchange_Platform.seller.controller;

import com.example.Surplus_Exchange_Platform.seller.api.SellerApi;
import com.example.Surplus_Exchange_Platform.seller.dto.request.CreateSellerRequest;
import com.example.Surplus_Exchange_Platform.seller.dto.request.UpdateSellerRequest;
import com.example.Surplus_Exchange_Platform.seller.dto.response.SellerResponse;
import com.example.Surplus_Exchange_Platform.seller.service.interfaces.SellerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller")
public class SellerController implements SellerApi {

    private final SellerService sellerService;

    public SellerController(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    // Public: applicant does not need login or a Bearer token.
    @Override
    @PostMapping
    public ResponseEntity<SellerResponse> createSeller(
            @Valid @RequestBody CreateSellerRequest request) {

        return ResponseEntity.ok(
                sellerService.createSeller(request));
    }

    // Protected: only an approved SELLER can access this.
    @Override
    @GetMapping("/me")
    public ResponseEntity<SellerResponse> getMySeller(
            Authentication authentication) {

        return ResponseEntity.ok(
                sellerService.getMySeller(
                        authentication.getName()));
    }

    // Protected: only an approved SELLER can access this.
    @Override
    @PutMapping
    public ResponseEntity<SellerResponse> updateSeller(
            Authentication authentication,
            @Valid @RequestBody UpdateSellerRequest request) {

        return ResponseEntity.ok(
                sellerService.updateSeller(
                        authentication.getName(),
                        request));
    }
}
