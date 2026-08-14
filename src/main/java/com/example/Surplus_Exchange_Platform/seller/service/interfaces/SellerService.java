package com.example.Surplus_Exchange_Platform.seller.service.interfaces;

import com.example.Surplus_Exchange_Platform.seller.dto.request.CreateSellerRequest;
import com.example.Surplus_Exchange_Platform.seller.dto.request.UpdateSellerRequest;
import com.example.Surplus_Exchange_Platform.seller.dto.response.SellerResponse;

public interface SellerService {

    // Public seller application. No authentication is required.
    SellerResponse createSeller(CreateSellerRequest request);

    SellerResponse getMySeller(String sellerEmail);

    SellerResponse updateSeller(
            String sellerEmail,
            UpdateSellerRequest request);
}
