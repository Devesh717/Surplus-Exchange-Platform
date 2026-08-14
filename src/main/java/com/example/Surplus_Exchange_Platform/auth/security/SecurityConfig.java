package com.example.Surplus_Exchange_Platform.auth.security;

import com.example.Surplus_Exchange_Platform.auth.security.CustomUserDetailsService;
import com.example.Surplus_Exchange_Platform.auth.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            CustomUserDetailsService userDetailsService) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(
                        userDetailsService
                );

        provider.setPasswordEncoder(
                passwordEncoder()
        );

        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authenticationProvider(
                        authenticationProvider()
                )

                .authorizeHttpRequests(auth -> auth

                        // =====================================================
                        // PUBLIC AUTHENTICATION APIs
                        // =====================================================

                        /*
                         * These endpoints are accessible without JWT.
                         *
                         * Email verification uses:
                         * email + OTP
                         *
                         * Therefore NO Bearer token is required.
                         */
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/auth/register",
                                "/api/auth/login",
                                "/api/auth/forgot-password",
                                "/api/auth/reset-password",
                                "/api/auth/verify-email",
                                "/api/auth/resend-verification"
                        ).permitAll()


                        // =====================================================
                        // AUTHENTICATED AUTH APIs
                        // =====================================================

                        /*
                         * User must already be logged in.
                         */
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/auth/change-password",
                                "/api/auth/logout"
                        ).authenticated()


                        // =====================================================
                        // SWAGGER / OPENAPI
                        // =====================================================

                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**"
                        ).permitAll()


                        // =====================================================
                        // SELLER APPLICATION
                        // =====================================================

                        /*
                         * An authenticated BUYER can apply to become a SELLER.
                         *
                         * The existing User account is used.
                         *
                         * BUYER
                         *   ↓
                         * Seller application
                         *   ↓
                         * ADMIN approval
                         *   ↓
                         * SELLER
                         *
                         * A SELLER is also allowed here only if your
                         * application supports seller re-application.
                         */
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/seller"
                        ).hasAnyRole("BUYER", "SELLER")


                        // =====================================================
                        // ADMIN
                        // =====================================================

                        /*
                         * All admin APIs require ADMIN.
                         */
                        .requestMatchers(
                                "/api/admin/**"
                        ).hasRole("ADMIN")


                        // =====================================================
                        // SELLER PROFILE / SELLER APIs
                        // =====================================================

                        /*
                         * Only approved SELLERS can access seller-specific
                         * operations.
                         */
                        .requestMatchers(
                                "/api/seller/**"
                        ).hasRole("SELLER")


                        // =====================================================
                        // BUYER FUNCTIONALITY
                        // =====================================================

                        /*
                         * B2B marketplace rule:
                         *
                         * BUYER  → can buy
                         * SELLER → can also buy
                         *
                         * Therefore both roles can access buyer functionality.
                         */
                        .requestMatchers(
                                "/api/buyer/**"
                        ).hasAnyRole("BUYER", "SELLER")


                        // =====================================================
                        // USER
                        // =====================================================

                        /*
                         * Any authenticated user can access user APIs.
                         */
                        .requestMatchers(
                                "/api/user/**"
                        ).authenticated()


                        // =====================================================
                        // CATEGORY
                        // =====================================================

                        /*
                         * Only ADMIN can create categories.
                         */
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/categories/**"
                        ).hasRole("ADMIN")


                        /*
                         * Only ADMIN can update categories.
                         */
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/categories/**"
                        ).hasRole("ADMIN")


                        /*
                         * Only ADMIN can delete/deactivate categories.
                         */
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/categories/**"
                        ).hasRole("ADMIN")


                        /*
                         * Anyone can browse categories.
                         */
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/categories/**"
                        ).permitAll()


                        // =====================================================
                        // PRODUCTS
                        // =====================================================

                        /*
                         * Anyone can browse products.
                         */
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/products/**"
                        ).permitAll()


                        /*
                         * Only SELLERS can create products.
                         */
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/products"
                        ).hasRole("SELLER")


                        /*
                         * Only SELLERS can update products.
                         *
                         * Product ownership must also be checked
                         * inside ProductService.
                         */
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/products/**"
                        ).hasRole("SELLER")


                        /*
                         * Only SELLERS can delete products.
                         *
                         * Product ownership must also be checked
                         * inside ProductService.
                         */
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/products/**"
                        ).hasRole("SELLER")


                        // =====================================================
                        // PRODUCT SEARCH
                        // =====================================================

                        /*
                         * Product search is public.
                         */
                        .requestMatchers(
                                "/api/products/search/**"
                        ).permitAll()


                        // =====================================================
                        // PRODUCT MEDIA / IMAGES
                        // =====================================================

                        /*
                         * Upload product image.
                         *
                         * SELLER only.
                         * Ownership checked in MediaService.
                         */
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/media/*/images"
                        ).hasRole("SELLER")


                        /*
                         * Update/set primary image.
                         *
                         * SELLER only.
                         * Ownership checked in MediaService.
                         */
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/media/*/images/**"
                        ).hasRole("SELLER")


                        /*
                         * Delete product image.
                         *
                         * SELLER only.
                         * Ownership checked in MediaService.
                         */
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/media/*/images/**"
                        ).hasRole("SELLER")


                        /*
                         * Product images are publicly viewable.
                         */
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/media/**"
                        ).permitAll()


                        // =====================================================
                        // AI
                        // =====================================================

                        /*
                         * AI APIs require an authenticated user.
                         *
                         * This prevents anonymous users from consuming
                         * your Gemini API quota.
                         */
                        .requestMatchers(
                                "/api/ai/**"
                        ).authenticated()


                        // =====================================================
                        // EVERYTHING ELSE
                        // =====================================================

                        /*
                         * Anything not explicitly public requires JWT.
                         */
                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}