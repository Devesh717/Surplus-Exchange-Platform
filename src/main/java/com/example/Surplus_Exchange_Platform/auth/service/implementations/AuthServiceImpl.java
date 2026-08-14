package com.example.Surplus_Exchange_Platform.auth.service.implementations;

import com.example.Surplus_Exchange_Platform.auth.dto.request.LoginRequest;
import com.example.Surplus_Exchange_Platform.auth.dto.request.RegisterRequest;
import com.example.Surplus_Exchange_Platform.auth.dto.response.LoginResponse;
import com.example.Surplus_Exchange_Platform.auth.dto.response.RegisterResponse;
import com.example.Surplus_Exchange_Platform.auth.security.JwtService;
import com.example.Surplus_Exchange_Platform.auth.repository.RevokedTokenRepository;
import com.example.Surplus_Exchange_Platform.auth.entity.RevokedToken;

import java.time.LocalDateTime;
import com.example.Surplus_Exchange_Platform.auth.service.interfaces.AuthService;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final EmailVerificationService emailVerificationService;
    private final RevokedTokenRepository revokedTokenRepository;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            EmailVerificationService emailVerificationService,
            RevokedTokenRepository revokedTokenRepository) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.emailVerificationService = emailVerificationService;
        this.revokedTokenRepository = revokedTokenRepository;
    }

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.phone}")
    private String adminPhoneNumber;

    @Override
    public RegisterResponse register(
            RegisterRequest request) {

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        if(email.equals(adminEmail)) {
            throw new IllegalArgumentException(
                    "This email is reserved for the administrator");
        }

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(
                    "Email is already registered");
        }


        String phoneNumber =
                request.getPhoneNumber()
                        .trim();

        if(phoneNumber.equals(adminPhoneNumber)) {
            throw new IllegalArgumentException(
                    "This phone number is reserved for the administrator");
        }

        if (userRepository.existsByPhoneNumber(phoneNumber)) {
            throw new IllegalArgumentException(
                    "Phone Number is already registered");
        }

        User user = new User();

        user.setName(
                request.getName().trim());

        user.setPhoneNumber(
                request.getPhoneNumber());

        user.setEmail(email);

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        user.setRole(
                Role.BUYER);

        User savedUser =
                userRepository.save(user);

        // Create and send email verification token
        emailVerificationService
                .createAndSendVerificationToken(
                        savedUser);

        // Generate JWT
        String token =
                jwtService.generateToken(
                        savedUser.getEmail());

        return new RegisterResponse(
                "Registration successful. Please verify your email.",
                savedUser.getId(),
                token
        );
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase();

        // Check whether email exists first
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Email is not registered"
                        )
                );

        try {

            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    request.getPassword()
                            )
                    );

            String token =
                    jwtService.generateToken(authentication);

            return new LoginResponse(
                    token,
                    "Login successful",
                    user.getRole().name()
            );

        } catch (BadCredentialsException e) {

            throw new IllegalArgumentException(
                    "Wrong password"
            );
        }
    }

    @Override
    public void logout(String token) {

        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException(
                    "Bearer token is required"
            );
        }

        String tokenHash = jwtService.hashToken(token);
        LocalDateTime expiryDate = jwtService.extractExpiration(token);

        if (expiryDate.isBefore(LocalDateTime.now())) {
            return;
        }

        if (!revokedTokenRepository
                .existsByTokenHashAndExpiryDateAfter(
                        tokenHash,
                        LocalDateTime.now())) {

            revokedTokenRepository.save(
                    new RevokedToken(
                            tokenHash,
                            expiryDate
                    )
            );
        }
    }

}