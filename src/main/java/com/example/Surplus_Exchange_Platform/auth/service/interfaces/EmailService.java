package com.example.Surplus_Exchange_Platform.auth.service.interfaces;

import com.example.Surplus_Exchange_Platform.user.entity.User;

public interface EmailService {

    /**
     * Sends the email verification OTP.
     * The value previously called token is now a 6-digit OTP.
     */
    void sendVerificationEmail(User user, String otp);

    void sendPasswordResetEmail(User user, String token);
}
