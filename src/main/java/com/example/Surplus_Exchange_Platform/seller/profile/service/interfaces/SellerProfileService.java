package com.example.Surplus_Exchange_Platform.admin.profile.service.interfaces;

import com.example.Surplus_Exchange_Platform.admin.profile.dto.request.UpdateAdminProfileRequest;
import com.example.Surplus_Exchange_Platform.admin.profile.dto.response.AdminProfileResponse;

public interface AdminProfileService {

    AdminProfileResponse getMyProfile(String adminEmail);

    AdminProfileResponse updateMyProfile(
            String adminEmail,
            UpdateAdminProfileRequest request);
}
