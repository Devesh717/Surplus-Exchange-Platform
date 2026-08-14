package com.example.Surplus_Exchange_Platform.seller.service.implementations;

import com.example.Surplus_Exchange_Platform.auth.service.implementations.EmailVerificationService;
import com.example.Surplus_Exchange_Platform.seller.dto.request.CreateSellerRequest;
import com.example.Surplus_Exchange_Platform.seller.dto.request.UpdateSellerRequest;
import com.example.Surplus_Exchange_Platform.seller.dto.response.SellerResponse;
import com.example.Surplus_Exchange_Platform.seller.entity.Seller;
import com.example.Surplus_Exchange_Platform.seller.entity.SellerVerificationStatus;
import com.example.Surplus_Exchange_Platform.seller.repository.SellerRepository;
import com.example.Surplus_Exchange_Platform.seller.service.interfaces.SellerService;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SellerServiceImpl implements SellerService {

    private final SellerRepository sellerRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailVerificationService emailVerificationService;

    public SellerServiceImpl(
            SellerRepository sellerRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            EmailVerificationService emailVerificationService) {
        this.sellerRepository = sellerRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailVerificationService = emailVerificationService;
    }

    @Override
    @Transactional
    public SellerResponse createSeller(
            CreateSellerRequest request) {

        /*
         * Seller application is submitted by an existing,
         * email-verified BUYER.
         *
         * IMPORTANT:
         * Do not create a second User account.
         * The same User account can buy products and, after
         * admin approval, sell products.
         */
        Authentication authentication =
                SecurityContextHolder.getContext()
                        .getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication.getName() == null) {
            throw new IllegalArgumentException(
                    "Authentication is required to apply as a seller");
        }

        String email = authentication.getName()
                .trim()
                .toLowerCase();

        String requestedEmail = request.getEmail()
                .trim()
                .toLowerCase();

        if (!email.equals(requestedEmail)) {
            throw new IllegalArgumentException(
                    "Seller application email must match the logged-in account");
        }

        User applicant = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found. Please register as a buyer first."));

        if (!applicant.isEmailVerified()) {
            throw new IllegalArgumentException(
                    "Please verify your email before applying as a seller");
        }

        if (applicant.getRole() == Role.ADMIN) {
            throw new IllegalArgumentException(
                    "Administrator cannot apply as a seller");
        }

        if (applicant.getRole() == Role.SELLER) {
            throw new IllegalArgumentException(
                    "You are already an approved seller");
        }

        String phoneNumber = request.getPhone()
                .trim();

        /*
         * The seller application must use the same phone number
         * already registered with the buyer account.
         */
        if (!applicant.getPhoneNumber().equals(phoneNumber)) {
            throw new IllegalArgumentException(
                    "Seller application phone number must match your registered phone number");
        }

        String registrationNumber =
                request.getRegistrationNumber().trim();

        /*
         * A rejected seller application can be submitted again.
         * A pending application cannot be duplicated.
         */
        Seller seller = sellerRepository
                .findBySellerId(applicant.getId())
                .orElse(null);

        if (seller != null
                && seller.getVerificationStatus()
                == SellerVerificationStatus.PENDING) {

            throw new IllegalArgumentException(
                    "Seller application is already pending");
        }

        /*
         * Do not allow another seller profile to use the same
         * business registration number.
         */
        boolean registrationNumberUsedByAnotherSeller =
                sellerRepository.existsByRegistrationNumber(
                        registrationNumber)
                        && (seller == null
                        || !registrationNumber.equals(
                        seller.getRegistrationNumber()));

        if (registrationNumberUsedByAnotherSeller) {
            throw new IllegalArgumentException(
                    "Registration number is already registered");
        }

        /*
         * Reuse the existing Seller profile after rejection.
         * This keeps the same User/Seller relationship.
         */
        if (seller == null) {
            seller = new Seller();
            seller.setSeller(applicant);
        }

        seller.setBusinessName(
                request.getBusinessName().trim());

        seller.setBusinessDescription(
                trimNullable(
                        request.getBusinessDescription()));

        seller.setBusinessType(
                request.getBusinessType().trim());

        seller.setRegistrationNumber(
                registrationNumber);

        seller.setGstNumber(
                trimNullable(request.getGstNumber()));

        seller.setPhone(phoneNumber);

        seller.setAddress(
                request.getAddress().trim());

        seller.setCity(
                request.getCity().trim());

        seller.setState(
                request.getState().trim());

        seller.setPincode(
                request.getPincode().trim());

        seller.setVerificationStatus(
                SellerVerificationStatus.PENDING);

        /*
         * Keep the user as BUYER until admin approval.
         *
         * A BUYER can already purchase products.
         * After approval the same User becomes SELLER and
         * remains able to purchase products.
         */
        applicant.setRole(Role.BUYER);

        userRepository.save(applicant);

        Seller savedSeller =
                sellerRepository.save(seller);

        /*
         * Email verification is NOT sent again because the
         * applicant is required to have a verified email.
         */
        return toResponse(savedSeller);
    }

    @Override
    @Transactional(readOnly = true)
    public SellerResponse getMySeller(String sellerEmail) {

        User seller = getApprovedSeller(sellerEmail);

        Seller business = sellerRepository
                .findBySellerId(seller.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Seller not found"));

        return toResponse(business);
    }

    @Override
    @Transactional
    public SellerResponse updateSeller(
            String sellerEmail,
            UpdateSellerRequest request) {

        User seller = getApprovedSeller(sellerEmail);

        Seller business = sellerRepository
                .findBySellerId(seller.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Seller not found"));

        business.setBusinessName(
                request.getBusinessName().trim());

        business.setBusinessType(
                request.getBusinessType().trim());

        business.setPhone(
                request.getPhone().trim());

        business.setAddress(
                request.getAddress().trim());

        business.setCity(
                request.getCity().trim());

        business.setState(
                request.getState().trim());

        business.setPincode(
                request.getPincode().trim());

        return toResponse(
                sellerRepository.save(business));
    }

    private User getApprovedSeller(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"));

        if (user.getRole() != Role.SELLER) {
            throw new IllegalArgumentException(
                    "Only approved sellers can access this resource");
        }

        if (!user.isEmailVerified()) {
            throw new IllegalArgumentException(
                    "Please verify your email first");
        }

        return user;
    }

    private String trimNullable(String value) {
        return value == null || value.isBlank()
                ? null
                : value.trim();
    }

    private SellerResponse toResponse(Seller seller) {

        User user = seller.getSeller();

        return new SellerResponse(
                seller.getId(),
                user.getId(),
                user.getName(),
                user.getEmail(),
                seller.getBusinessName(),
                seller.getBusinessDescription(),
                seller.getBusinessType(),
                seller.getRegistrationNumber(),
                seller.getGstNumber(),
                seller.getPhone(),
                seller.getAddress(),
                seller.getCity(),
                seller.getState(),
                seller.getPincode(),
                seller.getVerificationStatus().name()
        );
    }
}
