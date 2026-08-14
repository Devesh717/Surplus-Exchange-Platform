package com.example.Surplus_Exchange_Platform.auth.service.implementations;

import com.example.Surplus_Exchange_Platform.auth.dto.request.ForgotPasswordRequest;
import com.example.Surplus_Exchange_Platform.auth.dto.request.ResetPasswordRequest;
import com.example.Surplus_Exchange_Platform.auth.dto.response.MessageResponse;
import com.example.Surplus_Exchange_Platform.auth.entity.PasswordResetToken;
import com.example.Surplus_Exchange_Platform.auth.repository.PasswordResetTokenRepository;
import com.example.Surplus_Exchange_Platform.auth.service.interfaces.EmailService;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public PasswordResetService(
            UserRepository userRepository,
            PasswordResetTokenRepository tokenRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Transactional
    public MessageResponse forgotPassword(
            ForgotPasswordRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase();

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user != null) {

            tokenRepository.deleteByUserId(user.getId());

            tokenRepository.flush();

            String token =
                    UUID.randomUUID().toString();

            PasswordResetToken resetToken =
                    new PasswordResetToken(
                            token,
                            user,
                            LocalDateTime.now().plusMinutes(30)
                    );

            tokenRepository.save(resetToken);

            emailService.sendPasswordResetEmail(
                    user,
                    token
            );
        }

        return new MessageResponse(
                "If the email is registered, a password reset link has been sent."
        );
    }

    @Transactional
    public MessageResponse resetPassword(
            ResetPasswordRequest request) {

        PasswordResetToken resetToken =
                tokenRepository.findByToken(request.getToken())
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Invalid or expired reset token"
                                ));

        if (resetToken.getExpiryDate()
                .isBefore(LocalDateTime.now())) {

            tokenRepository.delete(resetToken);

            throw new IllegalArgumentException(
                    "Reset token has expired"
            );
        }

        User user = resetToken.getUser();

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(user);

        tokenRepository.delete(resetToken);

        return new MessageResponse(
                "Password reset successfully"
        );
    }
}
