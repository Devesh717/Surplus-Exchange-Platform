package com.example.Surplus_Exchange_Platform.seller.profile.dto.response;

import com.example.Surplus_Exchange_Platform.user.entity.Role;

public class SellerProfileResponse {

    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private Role role;
    private boolean emailVerified;

    public SellerProfileResponse(
            Long id,
            String name,
            String email,
            String phoneNumber,
            Role role,
            boolean emailVerified) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.emailVerified = emailVerified;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhoneNumber() { return phoneNumber; }
    public Role getRole() { return role; }
    public boolean isEmailVerified() { return emailVerified; }
}
