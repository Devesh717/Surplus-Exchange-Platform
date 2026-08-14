package com.example.Surplus_Exchange_Platform.auth.repository;

import com.example.Surplus_Exchange_Platform.auth.entity.RevokedToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface RevokedTokenRepository
        extends JpaRepository<RevokedToken, Long> {

    boolean existsByTokenHashAndExpiryDateAfter(
            String tokenHash,
            LocalDateTime now);
}
