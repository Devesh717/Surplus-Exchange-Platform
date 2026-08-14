package com.example.Surplus_Exchange_Platform.user.profile.api;

import com.example.Surplus_Exchange_Platform.user.profile.dto.request.UpdateUserProfileRequest;
import com.example.Surplus_Exchange_Platform.user.profile.dto.response.UserProfileResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

@Tag(
        name = "User Profile",
        description = "Authenticated User Profile Management Endpoints"
)
public interface UserProfileApi {

    @Operation(
            summary = "Get My Profile",
            description = "Get the authenticated user's profile")
    ResponseEntity<UserProfileResponse> getMyProfile(
            Authentication authentication);

    @Operation(
            summary = "Update My Profile",
            description = "Update the authenticated user's profile")
    ResponseEntity<UserProfileResponse> updateMyProfile(
            @Valid UpdateUserProfileRequest request,
            Authentication authentication);
}
