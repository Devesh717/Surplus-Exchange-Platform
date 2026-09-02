package com.example.Surplus_Exchange_Platform.seller.profile.service.implementations;

import com.example.Surplus_Exchange_Platform.seller.profile.dto.request.UpdateSellerProfileRequest;
import com.example.Surplus_Exchange_Platform.seller.profile.dto.response.SellerProfileResponse;
import com.example.Surplus_Exchange_Platform.seller.profile.service.interfaces.SellerProfileService;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SellerProfileServiceImpl
        implements SellerProfileService {

    private final UserRepository userRepository;

    public SellerProfileServiceImpl(
            UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public SellerProfileResponse getMyProfile(
            String SellerEmail) {

        User Seller = getSeller(SellerEmail);

        return toResponse(Seller);
    }

    @Override
    @Transactional
    public SellerProfileResponse updateMyProfile(
            String SellerEmail,
            UpdateSellerProfileRequest request) {

        User Seller = getSeller(SellerEmail);

        String newEmail = request.getEmail()
                .trim()
                .toLowerCase();

        if (!Seller.getEmail().equalsIgnoreCase(newEmail)
                && userRepository.existsByEmail(newEmail)) {

            throw new IllegalArgumentException(
                    "Email already exists");
        }

        boolean emailChanged =
                !Seller.getEmail()
                        .equalsIgnoreCase(newEmail);

        Seller.setName(
                request.getName().trim());

        Seller.setEmail(newEmail);

        if (request.getPhoneNumber() != null) {
            Seller.setPhoneNumber(
                    request.getPhoneNumber().trim());
        }

        if (emailChanged) {
            Seller.setEmailVerified(false);
        }

        return toResponse(
                userRepository.save(Seller));
    }

    private User getSeller(String email) {

        User Seller = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Seller not found"));

        if (Seller.getRole() != Role.SELLER) {
            throw new IllegalArgumentException(
                    "Only Sellers can access Seller profile");
        }

        return Seller;
    }

    private SellerProfileResponse toResponse(User Seller) {

        return new SellerProfileResponse(
                Seller.getId(),
                Seller.getName(),
                Seller.getEmail(),
                Seller.getPhoneNumber(),
                Seller.getRole(),
                Seller.isEmailVerified()
        );
    }
}
