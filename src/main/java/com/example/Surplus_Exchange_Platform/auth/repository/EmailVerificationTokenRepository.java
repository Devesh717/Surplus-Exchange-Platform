package com.example.Surplus_Exchange_Platform.auth.repository;

import com.example.Surplus_Exchange_Platform.auth.entity.EmailVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailVerificationTokenRepository
        extends JpaRepository<EmailVerificationToken, Long> {

    Optional<EmailVerificationToken> findByUserIdAndOtp(
            Long userId,
            String otp);

    void deleteByUserId(Long userId);
}
