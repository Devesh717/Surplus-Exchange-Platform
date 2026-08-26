package com.example.Surplus_Exchange_Platform.admin.profile.api;

import com.example.Surplus_Exchange_Platform.admin.profile.dto.request.UpdateAdminProfileRequest;
import com.example.Surplus_Exchange_Platform.admin.profile.dto.response.AdminProfileResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

@Tag(
        name = "Admin Profile",
        description = "Admin Profile Management Endpoints"
)
public interface AdminProfileApi {

    @Operation(
            summary = "Get Admin Profile",
            description = "Get the authenticated administrator's profile")
    ResponseEntity<AdminProfileResponse> getMyProfile(
            Authentication authentication);

    @Operation(
            summary = "Update Admin Profile",
            description = "Update the authenticated administrator's profile")
    ResponseEntity<AdminProfileResponse> updateMyProfile(
            @Valid UpdateAdminProfileRequest request,
            Authentication authentication);
}
