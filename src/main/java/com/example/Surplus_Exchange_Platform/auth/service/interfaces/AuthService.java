package com.example.Surplus_Exchange_Platform.auth.service.interfaces;

import com.example.Surplus_Exchange_Platform.auth.dto.request.LoginRequest;
import com.example.Surplus_Exchange_Platform.auth.dto.request.RegisterRequest;
import com.example.Surplus_Exchange_Platform.auth.dto.response.LoginResponse;
import com.example.Surplus_Exchange_Platform.auth.dto.response.RegisterResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    void logout(String token);
}
