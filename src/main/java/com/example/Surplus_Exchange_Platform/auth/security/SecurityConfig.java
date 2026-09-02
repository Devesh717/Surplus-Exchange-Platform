package com.example.Surplus_Exchange_Platform.auth.security;

import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService userDetailsService;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            CustomUserDetailsService userDetailsService) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userDetailsService = userDetailsService;
    }

    // =====================================================
    // PASSWORD ENCODER
    // =====================================================

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // =====================================================
    // AUTHENTICATION PROVIDER
    // =====================================================

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(userDetailsService);

        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }

    // =====================================================
    // AUTHENTICATION MANAGER
    // =====================================================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }

    // =====================================================
    // SECURITY FILTER CHAIN
    // =====================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http)
            throws Exception {

        http

                // =====================================================
                // CORS
                // =====================================================

                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )

                // =====================================================
                // CSRF
                // =====================================================

                .csrf(csrf -> csrf.disable())

                // =====================================================
                // SESSION
                // =====================================================

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // =====================================================
                // AUTHENTICATION PROVIDER
                // =====================================================

                .authenticationProvider(
                        authenticationProvider()
                )

                // =====================================================
                // AUTHORIZATION
                // =====================================================

                .authorizeHttpRequests(auth -> auth

                // -----------------------------------------------------
                // CORS PREFLIGHT
                // -----------------------------------------------------

                .requestMatchers(
                        HttpMethod.OPTIONS,
                        "/**"
                ).permitAll()

                // =====================================================
                // PUBLIC AUTHENTICATION APIs
                // =====================================================

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
                // EMAIL VERIFICATION LINK//
                // =====================================================

                .requestMatchers(
                HttpMethod.GET,
                "/api/auth/verify-email"
                ).permitAll()

                // =====================================================
                // AUTHENTICATED AUTH APIs
                // =====================================================

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
                                 * BUYER can apply to become SELLER.
                                 *
                                 * SELLER is also allowed in case the application
                                 * supports re-application.
                                 */

                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/seller"
                                ).hasAnyRole(
                                        "BUYER",
                                        "SELLER"
                                )

                // =====================================================
                // ADMIN
                // =====================================================

                .requestMatchers(
                        "/api/admin/**"
                ).hasRole("ADMIN")

                                // =====================================================
                                // SELLER APIs
                                // =====================================================

                                .requestMatchers(
                                        "/api/seller/**"
                                ).hasRole("SELLER")

                // =====================================================
                // BUYER APIs
                // =====================================================

                /*
                 * BUYER can buy.
                 * SELLER can also buy.
                 */

                .requestMatchers(
                        "/api/buyer/**"
                ).hasAnyRole(
                        "BUYER",
                        "SELLER"
                )

                // =====================================================
                // USER APIs
                // =====================================================

                /*
                 * Any authenticated user.
                 */

                .requestMatchers(
                        "/api/user/**"
                ).authenticated()

                // =====================================================
                // CATEGORY APIs
                // =====================================================

                /*
                 * ADMIN creates categories.
                 */

                .requestMatchers(
                        HttpMethod.POST,
                        "/api/categories/**"
                ).hasRole("ADMIN")

                /*
                 * ADMIN updates categories.
                 */

                .requestMatchers(
                        HttpMethod.PUT,
                        "/api/categories/**"
                ).hasRole("ADMIN")

                /*
                 * ADMIN deletes/deactivates categories.
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
                                // PRODUCT APIs
                                // =====================================================

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/products/**"
                                ).permitAll()

                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/products"
                                ).hasRole("SELLER")

                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "/api/products/**"
                                ).hasRole("SELLER")

                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "/api/products/**"
                                ).hasRole("SELLER")

// =====================================================
// PRODUCT SEARCH
// =====================================================

                                .requestMatchers(
                                        "/api/products/search/**"
                                ).permitAll()

// =====================================================
// PRODUCT MEDIA / IMAGES
// =====================================================

                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/media/*/images"
                                ).hasRole("SELLER")

                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "/api/media/*/images/**"
                                ).hasRole("SELLER")

                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "/api/media/*/images/**"
                                ).hasRole("SELLER")

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/media/**"
                                ).permitAll()

                // =====================================================
                // AI
                // =====================================================

                /*
                 * AI requires authentication.
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

        // =====================================================
        // JWT FILTER
        // =====================================================

                .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }

    // =====================================================
    // CORS CONFIGURATION
    // =====================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        // -----------------------------------------------------
        // FRONTEND URL
        // -----------------------------------------------------

        configuration.setAllowedOrigins(
                List.of(frontendUrl)
        );

        // -----------------------------------------------------
        // ALLOWED HTTP METHODS
        // -----------------------------------------------------

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "OPTIONS"
                )
        );

        // -----------------------------------------------------
        // ALLOWED HEADERS
        // -----------------------------------------------------

        configuration.setAllowedHeaders(
                List.of("*")
        );

        // -----------------------------------------------------
        // CREDENTIALS
        // -----------------------------------------------------

        configuration.setAllowCredentials(true);

        // -----------------------------------------------------
        // REGISTER CORS CONFIGURATION
        // -----------------------------------------------------

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}