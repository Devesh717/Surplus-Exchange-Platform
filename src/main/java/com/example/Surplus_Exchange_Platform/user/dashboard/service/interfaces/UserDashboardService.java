package com.example.Surplus_Exchange_Platform.user.dashboard.service.interfaces;

import com.example.Surplus_Exchange_Platform.user.dashboard.dto.response.UserDashboardResponse;

public interface UserDashboardService {

    UserDashboardResponse getDashboard(String userEmail);
}
