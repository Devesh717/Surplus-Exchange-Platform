package com.example.Surplus_Exchange_Platform.admin.api;

import com.example.Surplus_Exchange_Platform.admin.dto.request.UpdateVerificationRequest;
import com.example.Surplus_Exchange_Platform.admin.dto.response.AdminUserResponse;
import com.example.Surplus_Exchange_Platform.admin.dto.response.VerificationResponse;
import com.example.Surplus_Exchange_Platform.product.entity.Product;
import com.example.Surplus_Exchange_Platform.seller.entity.Seller;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Admin",
        description = "Administrator Management and Verification Endpoints"
)
public interface AdminApi {

    // ============================================================
    // USERS
    // ============================================================

    @Operation(
            summary = "Get Users",
            description = "Get registered users with pagination"
    )
    ResponseEntity<Page<AdminUserResponse>> getUsers(
            Pageable pageable
    );


    // ============================================================
    // PENDING SELLER APPLICATIONS
    // ============================================================

    @Operation(
            summary = "Get Pending Seller Applications",
            description = "Get all seller applications waiting for admin verification"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Pending seller applications retrieved successfully"
            )
    })
    @GetMapping("/sellers/pending")
    ResponseEntity<List<Seller>> getPendingSellerApplications();


    // ============================================================
    // PENDING PRODUCTS
    // ============================================================

    @Operation(
            summary = "Get Pending Products",
            description = "Get all products waiting for admin verification"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Pending products retrieved successfully"
            )
    })
    @GetMapping("/products/pending")
    ResponseEntity<List<Product>> getPendingProducts();


    // ============================================================
    // PRODUCT DETAILS
    // ============================================================

    @Operation(
            summary = "Get Product Details",
            description = "Get complete product details for admin review, including pending or unverified products"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Product details retrieved successfully"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Product not found"
            )
    })
    @GetMapping("/products/{productId}")
    ResponseEntity<Product> getProduct(
            @PathVariable Long productId
    );


    // ============================================================
    // SELLER VERIFICATION
    // ============================================================

    @Operation(
            summary = "Verify Seller",
            description = "Approve or reject a seller business profile"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Seller verification updated"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Seller profile not found"
            )
    })
    ResponseEntity<VerificationResponse> verifySeller(
            @PathVariable Long sellerId,
            @Valid @RequestBody UpdateVerificationRequest request
    );


    // ============================================================
    // PRODUCT VERIFICATION
    // ============================================================

    @Operation(
            summary = "Verify Product",
            description = "Approve or reject a product listing"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Product verification updated"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Product not found"
            )
    })
    ResponseEntity<VerificationResponse> verifyProduct(
            @PathVariable Long productId,
            @Valid @RequestBody UpdateVerificationRequest request
    );
}