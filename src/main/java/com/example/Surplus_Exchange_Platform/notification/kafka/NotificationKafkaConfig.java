package com.example.Surplus_Exchange_Platform.notification.kafka;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
@EnableKafka
public class NotificationKafkaConfig {

    @Bean
    public NewTopic notificationTopic(
            @Value("${app.kafka.notification-topic:notification-events}") String topic) {

        return TopicBuilder
                .name(topic)
                .build();
    }
}
