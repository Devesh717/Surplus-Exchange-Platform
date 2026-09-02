package com.example.Surplus_Exchange_Platform.user.dashboard.dto.response;

import com.example.Surplus_Exchange_Platform.user.entity.Role;

public class UserDashboardResponse {

    private Long userId;
    private String name;
    private String email;
    private Role role;
    private long totalOrders;

    public UserDashboardResponse(
            Long userId,
            String name,
            String email,
            Role role,
            long totalOrders) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
        this.totalOrders = totalOrders;
    }

    public Long getUserId() {
        return userId;
    }
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public long getTotalOrders() {
        return totalOrders;
    }
}
