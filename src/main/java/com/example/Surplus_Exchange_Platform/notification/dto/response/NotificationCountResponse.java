package com.example.Surplus_Exchange_Platform.notification.dto.response;

public class NotificationCountResponse {

    private long unreadCount;

    public NotificationCountResponse(long unreadCount) {
        this.unreadCount = unreadCount;
    }

    public long getUnreadCount() {
        return unreadCount;
    }
}
