package com.example.Surplus_Exchange_Platform.ai.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class AiConfig {

    @Bean
    public ChatClient chatClient(ChatClient.Builder builder) {

        log.info("========== AI CONFIG ==========");
        log.info("Creating ChatClient bean");
        log.info("ChatClient.Builder received successfully");
        log.info("Building ChatClient");

        ChatClient chatClient = builder.build();

        log.info("ChatClient created successfully");
        log.info("===============================");


        return chatClient;
    }
}
