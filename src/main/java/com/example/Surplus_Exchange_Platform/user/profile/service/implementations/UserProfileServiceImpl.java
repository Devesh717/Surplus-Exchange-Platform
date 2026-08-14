package com.example.Surplus_Exchange_Platform.user.profile.service.implementations;

import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.profile.dto.request.UpdateUserProfileRequest;
import com.example.Surplus_Exchange_Platform.user.profile.dto.response.UserProfileResponse;
import com.example.Surplus_Exchange_Platform.user.profile.service.interfaces.UserProfileService;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserProfileServiceImpl
        implements UserProfileService {

    private final UserRepository userRepository;

    public UserProfileServiceImpl(
            UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfileResponse getMyProfile(
            String userEmail) {

        User user = getUser(userEmail);

        return toResponse(user);
    }

    @Override
    @Transactional
    public UserProfileResponse updateMyProfile(
            String userEmail,
            UpdateUserProfileRequest request) {

        User user = getUser(userEmail);

        String newEmail =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        if (!user.getEmail().equalsIgnoreCase(newEmail)
                && userRepository.existsByEmail(newEmail)) {

            throw new IllegalArgumentException(
                    "Email already exists");
        }

        user.setName(
                request.getName().trim());

        user.setEmail(newEmail);

        if (request.getPhoneNumber() != null) {
            user.setPhoneNumber(
                    request.getPhoneNumber().trim());
        }

        /*
         * Changing email requires verification again.
         */
        if (!user.getEmail().equalsIgnoreCase(userEmail)) {
            user.setEmailVerified(false);
        }

        return toResponse(
                userRepository.save(user));
    }

    private User getUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"));
    }

    private UserProfileResponse toResponse(
            User user) {

        return new UserProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getRole(),
                user.isEmailVerified()
        );
    }
}