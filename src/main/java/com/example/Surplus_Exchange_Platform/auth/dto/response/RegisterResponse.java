package com.example.Surplus_Exchange_Platform.auth.dto.response;

public class RegisterResponse {

    private String message;
    private Long userId;
    private String accessToken;

    public RegisterResponse(String message, Long userId, String accessToken) {
        this.message = message;
        this.userId = userId;
        this.accessToken = accessToken;
    }

    public String getMessage() {
        return message;
    }

    public Long getUserId() {
        return userId;
    }

    public String getAccessToken() {
        return accessToken;
    }
}