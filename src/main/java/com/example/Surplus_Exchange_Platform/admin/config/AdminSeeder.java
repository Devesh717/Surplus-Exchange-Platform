package com.example.Surplus_Exchange_Platform.admin.config;

import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminSeeder {

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.phone}")
    private String adminPhone;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Bean
    CommandLineRunner seedAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository.findByEmail(adminEmail).isEmpty()) {

                User admin = new User();

                admin.setName("Admin");
                admin.setEmail(adminEmail);
                admin.setPhoneNumber(adminPhone);

                admin.setPassword(
                        passwordEncoder.encode(adminPassword)
                );

                admin.setRole(Role.ADMIN);

                admin.setEmailVerified(true);

                userRepository.save(admin);

                System.out.println(
                        "Default ADMIN account created: "
                                + adminEmail
                );
            }
        };
    }
}