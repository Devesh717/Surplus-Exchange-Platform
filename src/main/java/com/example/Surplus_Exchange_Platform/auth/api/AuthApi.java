package com.example.Surplus_Exchange_Platform.auth.api;

import com.example.Surplus_Exchange_Platform.auth.dto.request.LoginRequest;
import com.example.Surplus_Exchange_Platform.auth.dto.request.RegisterRequest;
import com.example.Surplus_Exchange_Platform.auth.dto.response.LoginResponse;
import com.example.Surplus_Exchange_Platform.auth.dto.response.MessageResponse;
import com.example.Surplus_Exchange_Platform.auth.dto.response.RegisterResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Tag(
        name = "Authentication",
        description = "User Authentication and Authorization Endpoints"
)
public interface AuthApi {

    @Operation(
            summary = "Register User",
            description = "Register a new Buyer or Seller account"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Registration successful"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid registration details"
            )
    })
    ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request
    );

    @Operation(
            summary = "Login User",
            description = "Authenticate user and generate JWT token"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Login successful"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Invalid email or password"
            )
    })
    ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    );

    @Operation(
            summary = "Logout User",
            description = "Revokes the current JWT access token"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Logout successful"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Authentication token is missing or invalid"
            )
    })
    ResponseEntity<MessageResponse> logout(
            @RequestHeader("Authorization") String authorization
    );

}