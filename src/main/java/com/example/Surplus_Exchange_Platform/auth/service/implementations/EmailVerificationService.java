package com.example.Surplus_Exchange_Platform.auth.service.implementations;

import com.example.Surplus_Exchange_Platform.auth.entity.EmailVerificationToken;
import com.example.Surplus_Exchange_Platform.auth.repository.EmailVerificationTokenRepository;
import com.example.Surplus_Exchange_Platform.auth.service.interfaces.EmailService;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class EmailVerificationService {

    private final UserRepository userRepository;
    private final EmailVerificationTokenRepository tokenRepository;
    private final EmailService emailService;

    public EmailVerificationService(
            UserRepository userRepository,
            EmailVerificationTokenRepository tokenRepository,
            EmailService emailService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.emailService = emailService;
    }

    @Transactional
    public void createAndSendVerificationToken(User user) {

        tokenRepository.deleteByUserId(user.getId());

        String otp = String.format(
                "%06d",
                new Random().nextInt(1_000_000)
        );

        EmailVerificationToken verificationToken =
                new EmailVerificationToken(
                        otp,
                        user,
                        LocalDateTime.now().plusMinutes(10)
                );

        tokenRepository.save(verificationToken);

        // Existing method name is retained so registration code does not break.
        // The second argument is now a 6-digit OTP instead of a UUID token.
        emailService.sendVerificationEmail(user, otp);
    }

    @Transactional
    public void verifyEmail(String email, String otp) {

        String normalizedEmail = email.trim().toLowerCase();

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"
                        ));

        EmailVerificationToken verificationToken =
                tokenRepository.findByUserIdAndOtp(
                        user.getId(),
                        otp.trim()
                ).orElseThrow(() ->
                        new IllegalArgumentException(
                                "Invalid OTP"
                        ));

        if (verificationToken.getExpiryDate()
                .isBefore(LocalDateTime.now())) {

            tokenRepository.delete(verificationToken);

            throw new IllegalArgumentException(
                    "OTP has expired"
            );
        }

        user.setEmailVerified(true);
        userRepository.save(user);

        tokenRepository.delete(verificationToken);
    }
}
