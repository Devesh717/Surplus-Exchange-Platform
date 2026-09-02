package com.example.Surplus_Exchange_Platform.admin.service.interfaces;

import com.example.Surplus_Exchange_Platform.admin.dto.request.UpdateVerificationRequest;
import com.example.Surplus_Exchange_Platform.admin.dto.response.AdminUserResponse;
import com.example.Surplus_Exchange_Platform.admin.dto.response.VerificationResponse;
import com.example.Surplus_Exchange_Platform.product.entity.Product;
import com.example.Surplus_Exchange_Platform.seller.entity.Seller;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AdminService {

    Page<AdminUserResponse> getUsers(Pageable pageable);

    VerificationResponse verifySeller(
            Long sellerId,
            UpdateVerificationRequest request);

    VerificationResponse verifyProduct(
            Long productId,
            UpdateVerificationRequest request);

    List<Seller> getPendingSellerApplications();

    List<Product> getPendingProducts();

    Product getProductById(Long productId);
}
