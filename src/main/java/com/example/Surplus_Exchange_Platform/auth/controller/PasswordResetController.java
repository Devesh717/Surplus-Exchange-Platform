package com.example.Surplus_Exchange_Platform.auth.controller;

import com.example.Surplus_Exchange_Platform.auth.dto.request.ForgotPasswordRequest;
import com.example.Surplus_Exchange_Platform.auth.dto.request.ResetPasswordRequest;
import com.example.Surplus_Exchange_Platform.auth.dto.response.MessageResponse;
import com.example.Surplus_Exchange_Platform.auth.service.implementations.PasswordResetService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    public PasswordResetController(
            PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<MessageResponse> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        return ResponseEntity.ok(
                passwordResetService.forgotPassword(request)
        );
    }

    @PostMapping("/reset-password")
    public ResponseEntity<MessageResponse> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        return ResponseEntity.ok(
                passwordResetService.resetPassword(request)
        );
    }
}
