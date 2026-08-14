package com.example.Surplus_Exchange_Platform.seller.api;

import com.example.Surplus_Exchange_Platform.seller.dto.request.CreateSellerRequest;
import com.example.Surplus_Exchange_Platform.seller.dto.request.UpdateSellerRequest;
import com.example.Surplus_Exchange_Platform.seller.dto.response.SellerResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Seller", description = "Seller application and approved seller profile APIs")
public interface SellerApi {

    /*
     * Seller workflow:
     * 1. POST /api/seller -> public application, no login required.
     * 2. Admin verifies the Seller record.
     * 3. Admin changes User role from BUYER to SELLER.
     * 4. Approved user logs in again and receives a SELLER JWT.
     * 5. GET /api/seller/me and PUT /api/seller require SELLER.
     */

    @Operation(
            summary = "Submit Seller Application",
            description = "Public endpoint. Creates the applicant account as BUYER until an admin approves the seller application."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Seller application submitted successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid data or email/registration number already exists")
    })
    ResponseEntity<SellerResponse> createSeller(
            @Valid @RequestBody CreateSellerRequest request);

    @Operation(
            summary = "Get My Seller Profile",
            description = "Get the profile of an already approved seller"
    )
    ResponseEntity<SellerResponse> getMySeller(
            Authentication authentication);

    @Operation(
            summary = "Update Seller Profile",
            description = "Update the profile of an already approved seller and return it to pending verification"
    )
    ResponseEntity<SellerResponse> updateSeller(
            Authentication authentication,
            @Valid @RequestBody UpdateSellerRequest request);
}
