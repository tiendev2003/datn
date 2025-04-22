package com.gym.datn_be.dto.response;

import java.time.LocalDateTime;

import com.gym.datn_be.entity.Notification.NotificationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {
    private Long notificationId;
    private Long userId;
    private NotificationType notificationType;
    private String title;
    private String message;
    private String link;
    private boolean isRead;
    private LocalDateTime sentAt;
    private LocalDateTime readAt;
}