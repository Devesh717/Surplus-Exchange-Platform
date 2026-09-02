package com.example.Surplus_Exchange_Platform.auth.dto.response;

public class LoginResponse {

    private String token;
    private String message;
    private String role;
    private String name;

    public LoginResponse(
            String token,
            String message,
            String role,
            String name) {

        this.token = token;
        this.message = message;
        this.role = role;
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public String getMessage() {
        return message;
    }

    public String getRole() {
        return role;
    }

    public String getName() {
        return name;
    }
}