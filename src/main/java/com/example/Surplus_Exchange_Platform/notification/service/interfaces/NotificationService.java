package com.example.Surplus_Exchange_Platform.notification.service.interfaces;

import com.example.Surplus_Exchange_Platform.notification.dto.response.NotificationCountResponse;
import com.example.Surplus_Exchange_Platform.notification.dto.response.NotificationResponse;
import com.example.Surplus_Exchange_Platform.notification.entity.NotificationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NotificationService {

    void createNotification(
            Long userId,
            String title,
            String message,
            NotificationType type);

    void createNotificationAndSendEmail(
            Long userId,
            String title,
            String message,
            NotificationType type);

    void sendEmail(
            String to,
            String subject,
            String message);

    Page<NotificationResponse> getMyNotifications(
            String email,
            Pageable pageable);

    NotificationCountResponse getUnreadCount(
            String email);

    void markAsRead(
            String email,
            Long notificationId);

    void markAllAsRead(
            String email);
}
