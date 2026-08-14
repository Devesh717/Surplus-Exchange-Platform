package com.example.Surplus_Exchange_Platform.notification.kafka;

import com.example.Surplus_Exchange_Platform.notification.entity.NotificationType;
import com.example.Surplus_Exchange_Platform.notification.event.NotificationEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class NotificationProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final String topic;

    public NotificationProducer(
            KafkaTemplate<String, Object> kafkaTemplate,
            @Value("${app.kafka.notification-topic:notification-events}") String topic) {
        this.kafkaTemplate = kafkaTemplate;
        this.topic = topic;
    }

    public void publish(
            Long userId,
            String title,
            String message,
            NotificationType type) {

        NotificationEvent event =
                new NotificationEvent(
                        userId,
                        title,
                        message,
                        type);

        kafkaTemplate.send(
                topic,
                String.valueOf(userId),
                event);
    }
}
