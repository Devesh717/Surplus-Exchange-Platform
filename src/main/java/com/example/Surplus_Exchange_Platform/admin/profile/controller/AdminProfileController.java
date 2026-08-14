package com.example.Surplus_Exchange_Platform.admin.profile.controller;

import com.example.Surplus_Exchange_Platform.admin.profile.api.AdminProfileApi;
import com.example.Surplus_Exchange_Platform.admin.profile.dto.request.UpdateAdminProfileRequest;
import com.example.Surplus_Exchange_Platform.admin.profile.dto.response.AdminProfileResponse;
import com.example.Surplus_Exchange_Platform.admin.profile.service.interfaces.AdminProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/profile")
public class AdminProfileController
        implements AdminProfileApi {

    private final AdminProfileService profileService;

    public AdminProfileController(
            AdminProfileService profileService) {
        this.profileService = profileService;
    }

    @Override
    @GetMapping
    public ResponseEntity<AdminProfileResponse> getMyProfile(
            Authentication authentication) {

        return ResponseEntity.ok(
                profileService.getMyProfile(
                        authentication.getName()));
    }

    @Override
    @PutMapping
    public ResponseEntity<AdminProfileResponse> updateMyProfile(
            @Valid @RequestBody UpdateAdminProfileRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                profileService.updateMyProfile(
                        authentication.getName(),
                        request));
    }
}
