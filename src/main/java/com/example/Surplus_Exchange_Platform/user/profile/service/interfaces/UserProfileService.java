package com.example.Surplus_Exchange_Platform.user.profile.service.interfaces;

import com.example.Surplus_Exchange_Platform.user.profile.dto.request.UpdateUserProfileRequest;
import com.example.Surplus_Exchange_Platform.user.profile.dto.response.UserProfileResponse;

public interface UserProfileService {

    UserProfileResponse getMyProfile(String userEmail);

    UserProfileResponse updateMyProfile(
            String userEmail,
            UpdateUserProfileRequest request);
}
