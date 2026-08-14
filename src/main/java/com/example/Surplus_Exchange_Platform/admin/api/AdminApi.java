package com.example.Surplus_Exchange_Platform.admin.api;

import com.example.Surplus_Exchange_Platform.admin.dto.request.UpdateVerificationRequest;
import com.example.Surplus_Exchange_Platform.admin.dto.response.AdminUserResponse;
import com.example.Surplus_Exchange_Platform.admin.dto.response.VerificationResponse;
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
        name = "Admin",
        description = "Administrator Management and Verification Endpoints"
)
public interface AdminApi {

    @Operation(
            summary = "Get Users",
            description = "Get registered users with pagination"
    )
    ResponseEntity<Page<AdminUserResponse>> getUsers(Pageable pageable);

    @Operation(
            summary = "Verify Seller",
            description = "Approve or reject a seller business profile"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Seller verification updated"),
            @ApiResponse(responseCode = "404", description = "Seller profile not found")
    })
    ResponseEntity<VerificationResponse> verifySeller(
            @PathVariable Long sellerId,
            @Valid @RequestBody UpdateVerificationRequest request);

    @Operation(
            summary = "Verify Product",
            description = "Approve or reject a product listing"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Product verification updated"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    ResponseEntity<VerificationResponse> verifyProduct(
            @PathVariable Long productId,
            @Valid @RequestBody UpdateVerificationRequest request);
}
