package com.example.Surplus_Exchange_Platform.seller.profile.service.interfaces;

import com.example.Surplus_Exchange_Platform.seller.profile.dto.request.UpdateSellerProfileRequest;
import com.example.Surplus_Exchange_Platform.seller.profile.dto.response.SellerProfileResponse;

public interface SellerProfileService {

    SellerProfileResponse getMyProfile(String SellerEmail);

    SellerProfileResponse updateMyProfile(
            String SellerEmail,
            UpdateSellerProfileRequest request);
}
