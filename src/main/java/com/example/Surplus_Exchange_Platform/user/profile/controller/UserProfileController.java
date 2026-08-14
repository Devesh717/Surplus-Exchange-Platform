package com.example.Surplus_Exchange_Platform.user.profile.controller;

import com.example.Surplus_Exchange_Platform.user.profile.api.UserProfileApi;
import com.example.Surplus_Exchange_Platform.user.profile.dto.request.UpdateUserProfileRequest;
import com.example.Surplus_Exchange_Platform.user.profile.dto.response.UserProfileResponse;
import com.example.Surplus_Exchange_Platform.user.profile.service.interfaces.UserProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/profile")
public class UserProfileController
        implements UserProfileApi {

    private final UserProfileService profileService;

    public UserProfileController(
            UserProfileService profileService) {
        this.profileService = profileService;
    }

    @Override
    @GetMapping
    public ResponseEntity<UserProfileResponse> getMyProfile(
            Authentication authentication) {

        return ResponseEntity.ok(
                profileService.getMyProfile(
                        authentication.getName()));
    }

    @Override
    @PutMapping
    public ResponseEntity<UserProfileResponse> updateMyProfile(
            @Valid @RequestBody UpdateUserProfileRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                profileService.updateMyProfile(
                        authentication.getName(),
                        request));
    }
}
