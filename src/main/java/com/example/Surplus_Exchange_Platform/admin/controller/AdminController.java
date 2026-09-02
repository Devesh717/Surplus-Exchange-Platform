package com.example.Surplus_Exchange_Platform.admin.controller;

import com.example.Surplus_Exchange_Platform.admin.api.AdminApi;
import com.example.Surplus_Exchange_Platform.admin.dto.request.UpdateVerificationRequest;
import com.example.Surplus_Exchange_Platform.admin.dto.response.AdminUserResponse;
import com.example.Surplus_Exchange_Platform.admin.dto.response.VerificationResponse;
import com.example.Surplus_Exchange_Platform.admin.service.interfaces.AdminService;
import com.example.Surplus_Exchange_Platform.product.entity.Product;
import com.example.Surplus_Exchange_Platform.seller.entity.Seller;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController implements AdminApi {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @Override
    @GetMapping("/users")
    public ResponseEntity<Page<AdminUserResponse>> getUsers(
            Pageable pageable) {

        return ResponseEntity.ok(
                adminService.getUsers(pageable));
    }

    @Override
    @PutMapping("/sellers/{sellerId}/verification")
    public ResponseEntity<VerificationResponse> verifySeller(
            @PathVariable Long sellerId,
            @Valid @RequestBody UpdateVerificationRequest request) {

        return ResponseEntity.ok(
                adminService.verifySeller(
                        sellerId,
                        request));
    }

    @Override
    @PutMapping("/products/{productId}/verification")
    public ResponseEntity<VerificationResponse> verifyProduct(
            @PathVariable Long productId,
            @Valid @RequestBody UpdateVerificationRequest request) {

        return ResponseEntity.ok(
                adminService.verifyProduct(
                        productId,
                        request));
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<Product> getProduct(
            @PathVariable Long productId) {

        return ResponseEntity.ok(
                adminService.getProductById(productId)
        );
    }

    @GetMapping("/sellers/pending")
    public ResponseEntity<List<Seller>> getPendingSellerApplications() {

        return ResponseEntity.ok(
                adminService.getPendingSellerApplications()
        );
    }

    @GetMapping("/products/pending")
    public ResponseEntity<List<Product>> getPendingProducts() {

        return ResponseEntity.ok(
                adminService.getPendingProducts()
        );
    }
}
