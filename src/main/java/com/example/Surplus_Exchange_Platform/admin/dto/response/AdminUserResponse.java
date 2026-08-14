package com.example.Surplus_Exchange_Platform.admin.dto.response;

public class AdminUserResponse {

    private Long id;
    private String name;
    private String email;
    private String role;
    private boolean emailVerified;

    public AdminUserResponse(
            Long id,
            String name,
            String email,
            String role,
            boolean emailVerified) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.emailVerified = emailVerified;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public boolean isEmailVerified() { return emailVerified; }
}
