package com.example.Surplus_Exchange_Platform.admin.profile.service.implementations;

import com.example.Surplus_Exchange_Platform.admin.profile.dto.request.UpdateAdminProfileRequest;
import com.example.Surplus_Exchange_Platform.admin.profile.dto.response.AdminProfileResponse;
import com.example.Surplus_Exchange_Platform.admin.profile.service.interfaces.AdminProfileService;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminProfileServiceImpl
        implements AdminProfileService {

    private final UserRepository userRepository;

    public AdminProfileServiceImpl(
            UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public AdminProfileResponse getMyProfile(
            String adminEmail) {

        User admin = getAdmin(adminEmail);

        return toResponse(admin);
    }

    @Override
    @Transactional
    public AdminProfileResponse updateMyProfile(
            String adminEmail,
            UpdateAdminProfileRequest request) {

        User admin = getAdmin(adminEmail);

        String newEmail = request.getEmail()
                .trim()
                .toLowerCase();

        if (!admin.getEmail().equalsIgnoreCase(newEmail)
                && userRepository.existsByEmail(newEmail)) {

            throw new IllegalArgumentException(
                    "Email already exists");
        }

        boolean emailChanged =
                !admin.getEmail()
                        .equalsIgnoreCase(newEmail);

        admin.setName(
                request.getName().trim());

        admin.setEmail(newEmail);

        if (request.getPhoneNumber() != null) {
            admin.setPhoneNumber(
                    request.getPhoneNumber().trim());
        }

        if (emailChanged) {
            admin.setEmailVerified(false);
        }

        return toResponse(
                userRepository.save(admin));
    }

    private User getAdmin(String email) {

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Admin not found"));

        if (admin.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException(
                    "Only admins can access admin profile");
        }

        return admin;
    }

    private AdminProfileResponse toResponse(User admin) {

        return new AdminProfileResponse(
                admin.getId(),
                admin.getName(),
                admin.getEmail(),
                admin.getPhoneNumber(),
                admin.getRole(),
                admin.isEmailVerified()
        );
    }
}
