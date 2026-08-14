package com.example.Surplus_Exchange_Platform.auth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

import com.example.Surplus_Exchange_Platform.auth.repository.RevokedTokenRepository;

import java.time.LocalDateTime;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;
    private final RevokedTokenRepository revokedTokenRepository;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService,
            RevokedTokenRepository revokedTokenRepository) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.revokedTokenRepository = revokedTokenRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authorization =
                request.getHeader("Authorization");

        System.out.println("========== JWT FILTER ==========");
        System.out.println("REQUEST = " + request.getRequestURI());
        System.out.println("AUTH HEADER PRESENT = "
                + (authorization != null));

        if (authorization == null
                || !authorization.startsWith("Bearer ")) {

            System.out.println("NO BEARER TOKEN");

            filterChain.doFilter(request, response);
            return;
        }

        String token = authorization.substring(7);

        System.out.println("BEARER TOKEN FOUND");

        try {

            boolean revoked =
                    revokedTokenRepository
                            .existsByTokenHashAndExpiryDateAfter(
                                    jwtService.hashToken(token),
                                    LocalDateTime.now()
                            );

            if (revoked) {
                System.out.println("TOKEN IS REVOKED");

                filterChain.doFilter(request, response);
                return;
            }

            String email =
                    jwtService.extractUsername(token);

            System.out.println("JWT EMAIL = " + email);

            if (email != null
                    && SecurityContextHolder
                    .getContext()
                    .getAuthentication() == null) {

                UserDetails userDetails =
                        userDetailsService
                                .loadUserByUsername(email);

                System.out.println(
                        "USER = " +
                                userDetails.getUsername());

                System.out.println(
                        "AUTHORITIES = " +
                                userDetails.getAuthorities());

                boolean valid =
                        jwtService.isTokenValid(
                                token,
                                userDetails.getUsername());

                System.out.println(
                        "TOKEN VALID = " + valid);

                if (valid) {

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);

                    System.out.println(
                            "AUTHENTICATION SET = " +
                                    SecurityContextHolder
                                            .getContext()
                                            .getAuthentication());
                }
            }

        } catch (Exception exception) {

            System.out.println(
                    "JWT ERROR = " +
                            exception.getMessage());

            exception.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}