package com.gym.datn_be.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse {
    
    private Long notificationId;
    private Long userId;
    private String title;
    private String message;
    private String link;
    private boolean read;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
}