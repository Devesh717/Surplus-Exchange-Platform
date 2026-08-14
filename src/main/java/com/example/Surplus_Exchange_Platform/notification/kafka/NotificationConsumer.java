package com.example.Surplus_Exchange_Platform.notification.kafka;

import com.example.Surplus_Exchange_Platform.notification.event.NotificationEvent;
import com.example.Surplus_Exchange_Platform.notification.service.interfaces.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationConsumer {

    private static final Logger log =
            LoggerFactory.getLogger(NotificationConsumer.class);

    private final NotificationService notificationService;

    public NotificationConsumer(
            NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @KafkaListener(
            topics = "${app.kafka.notification-topic:notification-events}",
            groupId = "${spring.kafka.consumer.group-id:notification-service}")
    public void consume(NotificationEvent event) {

        log.info(
                "Notification event received: userId={} type={} title={}",
                event.getUserId(),
                event.getType(),
                event.getTitle());

        notificationService.createNotificationAndSendEmail(
                event.getUserId(),
                event.getTitle(),
                event.getMessage(),
                event.getType());

        log.info(
                "Notification processed: userId={} type={}",
                event.getUserId(),
                event.getType());
    }
}
