package com.example.Surplus_Exchange_Platform.auth.service.implementations;

import com.example.Surplus_Exchange_Platform.auth.service.interfaces.EmailService;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.backend.url}")
    private String backendUrl;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendVerificationEmail(User user, String token) {

        String verificationLink =
                backendUrl +
                "/api/auth/verify-email?token=" +
                token;

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(user.getEmail());
        message.setSubject(
                "Verify your Surplus Exchange account"
        );

        message.setText(
                "Hello " + user.getName() + ",\n\n" +
                        "Please verify your email by clicking the link below:\n" +
                        verificationLink + "\n\n" +
                        "This verification link will expire in 24 hours.\n\n" +
                        "Your Verification OTP is: " + token + "\n\n" +
                        "Regards,\n" +
                        "Surplus Exchange Platform"
        );

        mailSender.send(message);
    }

    @Override
    public void sendPasswordResetEmail(User user, String token) {

        String resetLink =
                backendUrl +
                "/api/auth/reset-password?token=" +
                token;

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(user.getEmail());
        message.setSubject(
                "Reset your Surplus Exchange password"
        );

        message.setText(
                "Hello " + user.getName() + "," + "We received a request to reset your password." +
                        "Use the reset token below with the reset-password API:" +
                token + " " + "Or open this link if your frontend handles the reset page:" +
                resetLink + " " + "This reset token will expire in 30 minutes." +
                "If you did not request this, you can safely ignore this email." +
                "Regards," +
                "Surplus Exchange Platform"
        );

        mailSender.send(message);
    }
}
