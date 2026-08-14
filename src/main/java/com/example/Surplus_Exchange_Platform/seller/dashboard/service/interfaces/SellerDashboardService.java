package com.example.Surplus_Exchange_Platform.seller.dashboard.service.interfaces;

import com.example.Surplus_Exchange_Platform.seller.dashboard.dto.response.SellerDashboardResponse;

public interface SellerDashboardService {

    SellerDashboardResponse getDashboard(String sellerEmail);
}
