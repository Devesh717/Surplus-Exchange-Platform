package com.example.Surplus_Exchange_Platform.admin.service.interfaces;

import com.example.Surplus_Exchange_Platform.admin.dto.request.UpdateVerificationRequest;
import com.example.Surplus_Exchange_Platform.admin.dto.response.AdminUserResponse;
import com.example.Surplus_Exchange_Platform.admin.dto.response.VerificationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminService {

    Page<AdminUserResponse> getUsers(Pageable pageable);

    VerificationResponse verifySeller(
            Long sellerId,
            UpdateVerificationRequest request);

    VerificationResponse verifyProduct(
            Long productId,
            UpdateVerificationRequest request);
}
