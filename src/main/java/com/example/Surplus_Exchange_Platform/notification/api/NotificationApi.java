package com.example.Surplus_Exchange_Platform.notification.api;

import com.example.Surplus_Exchange_Platform.notification.dto.response.NotificationCountResponse;
import com.example.Surplus_Exchange_Platform.notification.dto.response.NotificationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface NotificationApi {

    ResponseEntity<Page<NotificationResponse>> getMyNotifications(
            Pageable pageable,
            org.springframework.security.core.Authentication authentication);

    ResponseEntity<NotificationCountResponse> getUnreadCount(
            org.springframework.security.core.Authentication authentication);

    ResponseEntity<Void> markAsRead(
            Long notificationId,
            org.springframework.security.core.Authentication authentication);

    ResponseEntity<Void> markAllAsRead(
            org.springframework.security.core.Authentication authentication);
}
