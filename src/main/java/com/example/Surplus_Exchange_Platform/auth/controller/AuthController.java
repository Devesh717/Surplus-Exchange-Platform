package com.example.Surplus_Exchange_Platform.auth.controller;

import com.example.Surplus_Exchange_Platform.auth.api.AuthApi;
import com.example.Surplus_Exchange_Platform.auth.dto.request.LoginRequest;
import com.example.Surplus_Exchange_Platform.auth.dto.request.RegisterRequest;
import com.example.Surplus_Exchange_Platform.auth.dto.response.LoginResponse;
import com.example.Surplus_Exchange_Platform.auth.dto.response.MessageResponse;
import com.example.Surplus_Exchange_Platform.auth.dto.response.RegisterResponse;
import com.example.Surplus_Exchange_Platform.auth.service.interfaces.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController implements AuthApi {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        return ResponseEntity.ok(
                authService.register(request)
        );
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }

    @Override
    @PostMapping("/logout")
    public ResponseEntity<MessageResponse> logout(
            @RequestHeader(value = "Authorization", required = false)
            String authorization) {

        if (authorization == null
                || !authorization.startsWith("Bearer ")) {

            throw new IllegalArgumentException(
                    "Bearer token is required"
            );
        }

        String token = authorization.substring(7);

        authService.logout(token);

        return ResponseEntity.ok(
                new MessageResponse(
                        "Logout successful"
                )
        );
    }

}