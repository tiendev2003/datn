package com.gym.datn_be.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "security_notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SecurityNotification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "notification_type", nullable = false)
    private NotificationType notificationType;
    
    @Column(name = "message", nullable = false)
    private String message;
    
    @Column(name = "details")
    private String details;
    
    @Column(name = "is_read", nullable = false)
    private boolean isRead = false;
    
    @Column(name = "read_at")
    private LocalDateTime readAt;
    
    @Column(name = "ip_address")
    private String ipAddress;
    
    @Column(name = "location")
    private String location;
    
    @Column(name = "device_info")
    private String deviceInfo;
    
    public enum NotificationType {
        NEW_LOGIN, 
        PASSWORD_CHANGED, 
        EMAIL_CHANGED, 
        TWO_FACTOR_ENABLED, 
        TWO_FACTOR_DISABLED, 
        PROFILE_UPDATED,
        SUSPICIOUS_ACTIVITY, 
        ACCOUNT_LOCKED, 
        ACCOUNT_UNLOCKED
    }
}