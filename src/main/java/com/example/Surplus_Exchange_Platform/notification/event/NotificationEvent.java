package com.example.Surplus_Exchange_Platform.notification.event;

import com.example.Surplus_Exchange_Platform.notification.entity.NotificationType;

public class NotificationEvent {

    private Long userId;
    private String title;
    private String message;
    private NotificationType type;

    public NotificationEvent() {
    }

    public NotificationEvent(Long userId, String title, String message, NotificationType type) {
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.type = type;
    }

    public Long getUserId() { return userId; }
    public String getTitle() { return title; }
    public String getMessage() { return message; }
    public NotificationType getType() { return type; }

    public void setUserId(Long userId) { this.userId = userId; }
    public void setTitle(String title) { this.title = title; }
    public void setMessage(String message) { this.message = message; }
    public void setType(NotificationType type) { this.type = type; }
}
