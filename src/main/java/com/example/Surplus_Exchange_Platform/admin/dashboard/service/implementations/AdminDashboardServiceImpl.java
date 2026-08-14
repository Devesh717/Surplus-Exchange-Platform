package com.example.Surplus_Exchange_Platform.admin.dashboard.service.implementations;

import com.example.Surplus_Exchange_Platform.admin.dashboard.dto.response.AdminDashboardResponse;
import com.example.Surplus_Exchange_Platform.admin.dashboard.service.interfaces.AdminDashboardService;
import com.example.Surplus_Exchange_Platform.product.repository.ProductRepository;
import com.example.Surplus_Exchange_Platform.seller.entity.SellerVerificationStatus;
import com.example.Surplus_Exchange_Platform.seller.repository.SellerRepository;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminDashboardServiceImpl
        implements AdminDashboardService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final SellerRepository sellerRepository;

    public AdminDashboardServiceImpl(
            UserRepository userRepository,
            ProductRepository productRepository,
            SellerRepository sellerRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.sellerRepository = sellerRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public AdminDashboardResponse getDashboard() {

        long totalUsers = userRepository.count();

        long totalBuyers =
                userRepository.countByRole(Role.BUYER);

        long totalSellers =
                userRepository.countByRole(Role.SELLER);

        long totalAdmins =
                userRepository.countByRole(Role.ADMIN);

        long totalProducts =
                productRepository.count();

        long verifiedProducts =
                productRepository.countByVerifiedTrue();

        long pendingProducts =
                productRepository.countByVerifiedFalse();

        long totalSellerApplications =
                sellerRepository.count();

        long verifiedSellerApplications =
                sellerRepository.findAll()
                        .stream()
                        .filter(seller ->
                                seller.getVerificationStatus()
                                        == SellerVerificationStatus.VERIFIED)
                        .count();

        long pendingSellerApplications =
                sellerRepository.findAll()
                        .stream()
                        .filter(seller ->
                                seller.getVerificationStatus()
                                        == SellerVerificationStatus.PENDING)
                        .count();

        return new AdminDashboardResponse(
                totalUsers,
                totalBuyers,
                totalSellers,
                totalAdmins,
                totalProducts,
                verifiedProducts,
                pendingProducts,
                totalSellerApplications,
                verifiedSellerApplications,
                pendingSellerApplications
        );
    }
}
