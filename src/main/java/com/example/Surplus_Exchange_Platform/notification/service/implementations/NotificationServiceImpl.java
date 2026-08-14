package com.example.Surplus_Exchange_Platform.notification.service.implementations;

import com.example.Surplus_Exchange_Platform.notification.dto.response.NotificationCountResponse;
import com.example.Surplus_Exchange_Platform.notification.dto.response.NotificationResponse;
import com.example.Surplus_Exchange_Platform.notification.entity.Notification;
import com.example.Surplus_Exchange_Platform.notification.entity.NotificationType;
import com.example.Surplus_Exchange_Platform.notification.repository.NotificationRepository;
import com.example.Surplus_Exchange_Platform.notification.service.interfaces.NotificationService;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationServiceImpl implements NotificationService {

    private static final Logger log =
            LoggerFactory.getLogger(NotificationServiceImpl.class);

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

    public NotificationServiceImpl(
            NotificationRepository notificationRepository,
            UserRepository userRepository,
            JavaMailSender mailSender) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.mailSender = mailSender;
    }

    @Override
    @Transactional
    public void createNotification(
            Long userId,
            String title,
            String message,
            NotificationType type) {

        User user = getUser(userId);
        saveNotification(user, title, message, type);
    }

    @Override
    @Transactional
    public void createNotificationAndSendEmail(
            Long userId,
            String title,
            String message,
            NotificationType type) {

        User user = getUser(userId);

        // Always persist the in-app notification first.
        saveNotification(user, title, message, type);

        // Email failure must not prevent the Kafka notification
        // from being successfully processed and stored.
        if (!shouldSendEmail(type)) {
            return;
        }

        try {
            sendEmail(
                    user.getEmail(),
                    buildEmailSubject(type, title),
                    buildEmailBody(user, title, message));

            log.info(
                    "Notification email sent successfully to userId={} email={} type={}",
                    userId, user.getEmail(), type);

        } catch (Exception e) {
            log.error(
                    "Failed to send notification email to userId={} email={} type={}",
                    userId, user.getEmail(), type, e);
        }
    }

    private void saveNotification(
            User user,
            String title,
            String message,
            NotificationType type) {

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRead(false);

        notificationRepository.save(notification);
    }

    @Override
    public void sendEmail(
            String to,
            String subject,
            String message) {

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(to);
        mail.setSubject(subject);
        mail.setText(message);

        mailSender.send(mail);
    }

    private boolean shouldSendEmail(NotificationType type) {
        return switch (type) {
            case SELLER_APPROVED,
                 SELLER_REJECTED,
                 PRODUCT_APPROVED,
                 PRODUCT_REJECTED,
                 ORDER_PLACED,
                 PAYMENT_CONFIRMATION,
                 ORDER_SHIPPED,
                 ORDER_DELIVERED,
                 REVIEW_SUBMITTED -> true;
            default -> false;
        };
    }

    private String buildEmailSubject(
            NotificationType type,
            String title) {

        return "Surplus Exchange - " +
                (title == null || title.isBlank()
                        ? formatType(type)
                        : title);
    }

    private String buildEmailBody(
            User user,
            String title,
            String message) {

        String name = user.getName() == null
                ? "there"
                : user.getName();

        return "Hello " + name + ",\n\n" +
                (title == null ? "Notification" : title) +
                "\n\n" +
                (message == null ? "" : message) +
                "\n\n" +
                "Regards,\n" +
                "Surplus Exchange Platform";
    }

    private String formatType(NotificationType type) {
        return type.name()
                .replace('_', ' ');
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NotificationResponse> getMyNotifications(
            String email,
            Pageable pageable) {

        User user = getUser(email);

        return notificationRepository
                .findByUserIdOrderByCreatedAtDesc(
                        user.getId(),
                        pageable)
                .map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public NotificationCountResponse getUnreadCount(
            String email) {

        User user = getUser(email);

        return new NotificationCountResponse(
                notificationRepository
                        .countByUserIdAndReadFalse(user.getId()));
    }

    @Override
    @Transactional
    public void markAsRead(
            String email,
            Long notificationId) {

        User user = getUser(email);

        Notification notification =
                notificationRepository.findById(notificationId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Notification not found"));

        if (!notification.getUser().getId()
                .equals(user.getId())) {

            throw new IllegalArgumentException(
                    "You are not authorized to update this notification");
        }

        notification.setRead(true);
        notificationRepository.save(notification);
    }

    @Override
    @Transactional
    public void markAllAsRead(String email) {

        User user = getUser(email);

        notificationRepository
                .findByUserIdOrderByCreatedAtDesc(
                        user.getId(),
                        Pageable.unpaged())
                .forEach(notification -> {
                    notification.setRead(true);
                    notificationRepository.save(notification);
                });
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"));
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"));
    }

    private NotificationResponse toResponse(
            Notification notification) {

        return new NotificationResponse(
                notification.getId(),
                notification.getTitle(),
                notification.getMessage(),
                notification.getType().name(),
                notification.isRead(),
                notification.getCreatedAt()
        );
    }
}
