package com.example.Surplus_Exchange_Platform.notification.controller;

import com.example.Surplus_Exchange_Platform.notification.api.NotificationApi;
import com.example.Surplus_Exchange_Platform.notification.dto.response.NotificationCountResponse;
import com.example.Surplus_Exchange_Platform.notification.dto.response.NotificationResponse;
import com.example.Surplus_Exchange_Platform.notification.service.interfaces.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@Tag(name = "Notifications", description = "User Notification Endpoints")
public class NotificationController implements NotificationApi {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @Override
    @GetMapping
    @Operation(
            summary = "Get Notifications",
            description = "Get notifications of the authenticated user")
    public ResponseEntity<Page<NotificationResponse>> getMyNotifications(
            Pageable pageable,
            Authentication authentication) {

        return ResponseEntity.ok(
                notificationService.getMyNotifications(
                        authentication.getName(),
                        pageable)
        );
    }

    @Override
    @GetMapping("/unread-count")
    @Operation(
            summary = "Get Unread Notification Count")
    public ResponseEntity<NotificationCountResponse> getUnreadCount(
            Authentication authentication) {

        return ResponseEntity.ok(
                notificationService.getUnreadCount(
                        authentication.getName())
        );
    }

    @Override
    @PutMapping("/{notificationId}/read")
    @Operation(
            summary = "Mark Notification As Read")
    public ResponseEntity<Void> markAsRead(
            @PathVariable Long notificationId,
            Authentication authentication) {

        notificationService.markAsRead(
                authentication.getName(),
                notificationId);

        return ResponseEntity.ok().build();
    }

    @Override
    @PutMapping("/read-all")
    @Operation(
            summary = "Mark All Notifications As Read")
    public ResponseEntity<Void> markAllAsRead(
            Authentication authentication) {

        notificationService.markAllAsRead(
                authentication.getName());

        return ResponseEntity.ok().build();
    }
}
