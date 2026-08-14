package com.example.Surplus_Exchange_Platform.auth.controller;

import com.example.Surplus_Exchange_Platform.auth.dto.request.ChangePasswordRequest;
import com.example.Surplus_Exchange_Platform.auth.dto.response.MessageResponse;
import com.example.Surplus_Exchange_Platform.auth.service.implementations.ChangePasswordService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class ChangePasswordController {

    private final ChangePasswordService changePasswordService;

    public ChangePasswordController(
            ChangePasswordService changePasswordService) {
        this.changePasswordService = changePasswordService;
    }

    @PostMapping("/change-password")
    public ResponseEntity<MessageResponse> changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request) {

        System.out.println("AUTH = " + authentication);
        System.out.println("USER = " + authentication.getName());

        return ResponseEntity.ok(
                changePasswordService.changePassword(
                        authentication,
                        request
                )
        );
    }
}
