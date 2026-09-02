package com.example.Surplus_Exchange_Platform.seller.profile.api;

import com.example.Surplus_Exchange_Platform.seller.profile.dto.request.UpdateSellerProfileRequest;
import com.example.Surplus_Exchange_Platform.seller.profile.dto.response.SellerProfileResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

@Tag(
        name = "Seller Profile",
        description = "Seller Profile Management Endpoints"
)
public interface SellerProfileApi {

    @Operation(
            summary = "Get Seller Profile",
            description = "Get the authenticated Seller's profile")
    ResponseEntity<SellerProfileResponse> getMyProfile(
            Authentication authentication);

    @Operation(
            summary = "Update Seller Profile",
            description = "Update the authenticated Seller's profile")
    ResponseEntity<SellerProfileResponse> updateMyProfile(
            @Valid UpdateSellerProfileRequest request,
            Authentication authentication);
}
