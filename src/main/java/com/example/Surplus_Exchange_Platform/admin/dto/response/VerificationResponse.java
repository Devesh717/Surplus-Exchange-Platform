package com.example.Surplus_Exchange_Platform.admin.dto.response;

public class VerificationResponse {

    private Long id;
    private String type;
    private boolean verified;
    private boolean active;
    private String message;

    public VerificationResponse(
            Long id,
            String type,
            boolean verified,
            boolean active,
            String message) {
        this.id = id;
        this.type = type;
        this.verified = verified;
        this.active = active;
        this.message = message;
    }

    public Long getId() { return id; }
    public String getType() { return type; }
    public boolean isVerified() { return verified; }
    public boolean isActive() { return active; }
    public String getMessage() { return message; }
}
