package com.example.Surplus_Exchange_Platform.auth.controller;

import com.example.Surplus_Exchange_Platform.auth.dto.request.VerifyEmailRequest;
import com.example.Surplus_Exchange_Platform.auth.service.implementations.EmailVerificationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class EmailVerificationController {

    private final EmailVerificationService emailVerificationService;

    public EmailVerificationController(
            EmailVerificationService emailVerificationService) {
        this.emailVerificationService = emailVerificationService;
    }

    @PostMapping("/verify-email")
    public ResponseEntity<Map<String, String>> verifyEmail(
            @Valid @RequestBody VerifyEmailRequest request) {

        emailVerificationService.verifyEmail(
                request.getEmail(),
                request.getOtp()
        );

        return ResponseEntity.ok(
                Map.of("message", "Email verified successfully")
        );
    }
}
