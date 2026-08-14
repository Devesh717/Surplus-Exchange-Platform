package com.example.Surplus_Exchange_Platform.notification.repository;

import com.example.Surplus_Exchange_Platform.notification.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    Page<Notification> findByUserIdOrderByCreatedAtDesc(
            Long userId,
            Pageable pageable);

    long countByUserIdAndReadFalse(Long userId);
}
