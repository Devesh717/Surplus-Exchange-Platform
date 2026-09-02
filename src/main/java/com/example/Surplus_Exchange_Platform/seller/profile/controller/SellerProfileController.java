package com.example.Surplus_Exchange_Platform.seller.profile.controller;

import com.example.Surplus_Exchange_Platform.seller.profile.api.SellerProfileApi;
import com.example.Surplus_Exchange_Platform.seller.profile.dto.request.UpdateSellerProfileRequest;
import com.example.Surplus_Exchange_Platform.seller.profile.dto.response.SellerProfileResponse;
import com.example.Surplus_Exchange_Platform.seller.profile.service.interfaces.SellerProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller/profile")
public class SellerProfileController
        implements SellerProfileApi {

    private final SellerProfileService profileService;

    public SellerProfileController(
            SellerProfileService profileService) {
        this.profileService = profileService;
    }

    @Override
    @GetMapping
    public ResponseEntity<SellerProfileResponse> getMyProfile(
            Authentication authentication) {

        return ResponseEntity.ok(
                profileService.getMyProfile(
                        authentication.getName()));
    }

    @Override
    @PutMapping
    public ResponseEntity<SellerProfileResponse> updateMyProfile(
            @Valid @RequestBody UpdateSellerProfileRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                profileService.updateMyProfile(
                        authentication.getName(),
                        request));
    }
}
