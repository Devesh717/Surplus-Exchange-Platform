package com.example.Surplus_Exchange_Platform.admin.service.implementations;

import com.example.Surplus_Exchange_Platform.admin.dto.request.UpdateVerificationRequest;
import com.example.Surplus_Exchange_Platform.admin.dto.response.AdminUserResponse;
import com.example.Surplus_Exchange_Platform.admin.dto.response.VerificationResponse;
import com.example.Surplus_Exchange_Platform.admin.service.interfaces.AdminService;
import com.example.Surplus_Exchange_Platform.notification.entity.NotificationType;
import com.example.Surplus_Exchange_Platform.notification.kafka.NotificationProducer;
import com.example.Surplus_Exchange_Platform.product.entity.Product;
import com.example.Surplus_Exchange_Platform.product.repository.ProductRepository;
import com.example.Surplus_Exchange_Platform.seller.entity.Seller;
import com.example.Surplus_Exchange_Platform.seller.entity.SellerVerificationStatus;
import com.example.Surplus_Exchange_Platform.seller.repository.SellerRepository;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;
    private final NotificationProducer notificationProducer;

    public AdminServiceImpl(
            UserRepository userRepository,
            SellerRepository sellerRepository,
            ProductRepository productRepository,
            NotificationProducer notificationProducer) {

        this.userRepository = userRepository;
        this.sellerRepository = sellerRepository;
        this.productRepository = productRepository;
        this.notificationProducer = notificationProducer;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AdminUserResponse> getUsers(
            Pageable pageable) {

        return userRepository.findAll(pageable)
                .map(user ->
                        new AdminUserResponse(
                                user.getId(),
                                user.getName(),
                                user.getEmail(),
                                user.getRole().name(),
                                user.isEmailVerified()
                        ));
    }

    @Override
    @Transactional
    public VerificationResponse verifySeller(
            Long sellerId,
            UpdateVerificationRequest request) {

        Seller seller = sellerRepository
                .findBySellerId(sellerId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Seller not found"));

        boolean verified = request.getVerified();

        /*
         * Seller application approval controls:
         *
         * 1. Seller verification status
         * 2. User role
         */
        seller.setVerificationStatus(
                verified
                        ? SellerVerificationStatus.VERIFIED
                        : SellerVerificationStatus.REJECTED
        );

        User applicant = seller.getSeller();

        /*
         * Only an approved seller gets SELLER privileges.
         */
        if (verified) {
            applicant.setRole(Role.SELLER);
        } else {
            applicant.setRole(Role.BUYER);
        }

        userRepository.save(applicant);
        sellerRepository.save(seller);

        /*
         * Publish notification event through Kafka.
         *
         * The notification is sent to the seller applicant,
         * not the admin who performed the approval.
         */
        if (verified) {

            notificationProducer.publish(
                    applicant.getId(),
                    "Seller Application Approved",
                    "Your seller application has been approved. "
                            + "You can now access seller features.",
                    NotificationType.SELLER_APPROVED
            );

        } else {

            notificationProducer.publish(
                    applicant.getId(),
                    "Seller Application Rejected",
                    "Your seller application has been rejected."
                            + (request.getReason() != null
                            && !request.getReason().isBlank()
                            ? " Reason: " + request.getReason()
                            : ""),
                    NotificationType.SELLER_REJECTED
            );
        }

        return new VerificationResponse(
                seller.getId(),
                "SELLER",
                verified,
                verified,
                verified
                        ? "Seller application verified successfully"
                        : "Seller application rejected"
        );
    }

    @Override
    @Transactional
    public VerificationResponse verifyProduct(
            Long productId,
            UpdateVerificationRequest request) {

        Product product = productRepository
                .findById(productId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Product not found"));

        boolean verified = request.getVerified();

        /*
         * Product becomes publicly available only
         * after admin approval.
         */
        product.setVerified(verified);
        product.setActive(verified);

        productRepository.save(product);

        /*
         * Notify the seller about the admin's decision.
         */
        if (verified) {

            notificationProducer.publish(
                    product.getSeller().getId(),
                    "Product Approved",
                    "Your product '" + product.getName()
                            + "' has been approved and is now available to buyers.",
                    NotificationType.PRODUCT_APPROVED
            );

        } else {

            notificationProducer.publish(
                    product.getSeller().getId(),
                    "Product Rejected",
                    "Your product '" + product.getName()
                            + "' has been rejected by the admin.",
                    NotificationType.PRODUCT_REJECTED
            );
        }

        return new VerificationResponse(
                product.getId(),
                "PRODUCT",
                verified,
                verified,
                verified
                        ? "Product listing verified successfully"
                        : "Product listing rejected"
        );
    }
}