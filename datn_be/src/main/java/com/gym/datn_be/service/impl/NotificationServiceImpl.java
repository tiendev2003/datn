package com.gym.datn_be.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.dto.response.NotificationResponse;
import com.gym.datn_be.entity.Notification;
import com.gym.datn_be.entity.Notification.NotificationType;
import com.gym.datn_be.entity.User;
import com.gym.datn_be.exception.ResourceNotFoundException;
import com.gym.datn_be.repository.NotificationRepository;
import com.gym.datn_be.repository.UserRepository;
import com.gym.datn_be.service.NotificationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public Notification sendNotification(Long userId, String title, String message, String link) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));

        // Xác định loại thông báo dựa trên tiêu đề hoặc link
        NotificationType type = determineNotificationType(title, link);

        // Tạo thông báo mới
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setNotificationType(type);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setLink(link);
        notification.setRead(false);
        notification.setDeleted(false);
        notification.setSentAt(LocalDateTime.now());

        // Lưu và trả về thông báo
        return notificationRepository.save(notification);
    }

    @Override
    @Transactional
    public void sendNotificationToMultipleUsers(List<Long> userIds, String title, String message, String link) {
        List<User> users = userRepository.findAllById(userIds);
        
        // Xác định loại thông báo
        NotificationType type = determineNotificationType(title, link);
        
        List<Notification> notifications = new ArrayList<>();
        
        // Tạo thông báo cho từng người dùng
        for (User user : users) {
            Notification notification = new Notification();
            notification.setUser(user);
            notification.setNotificationType(type);
            notification.setTitle(title);
            notification.setMessage(message);
            notification.setLink(link);
            notification.setRead(false);
            notification.setDeleted(false);
            notification.setSentAt(LocalDateTime.now());
            
            notifications.add(notification);
        }
        
        // Lưu tất cả thông báo
        notificationRepository.saveAll(notifications);
    }

    @Override
    @Transactional
    public void sendNotificationToAllUsers(String title, String message, String link) {
        List<User> allUsers = userRepository.findAll();
        
        // Xác định loại thông báo
        NotificationType type = determineNotificationType(title, link);
        
        List<Notification> notifications = new ArrayList<>();
        
        // Tạo thông báo cho mỗi người dùng
        for (User user : allUsers) {
            Notification notification = new Notification();
            notification.setUser(user);
            notification.setNotificationType(type);
            notification.setTitle(title);
            notification.setMessage(message);
            notification.setLink(link);
            notification.setRead(false);
            notification.setDeleted(false);
            notification.setSentAt(LocalDateTime.now());
            
            notifications.add(notification);
        }
        
        // Lưu tất cả thông báo
        notificationRepository.saveAll(notifications);
    }

    @Override
    @Transactional
    public boolean markAsRead(Long notificationId, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));
                
        // Tìm thông báo theo ID và người dùng
        Notification notification = notificationRepository.findByNotificationIdAndUser(notificationId, user);
        
        if (notification == null || notification.isDeleted()) {
            return false;
        }
        
        // Đánh dấu đã đọc nếu chưa
        if (!notification.isRead()) {
            notification.setRead(true);
            notification.setReadAt(LocalDateTime.now());
            notificationRepository.save(notification);
        }
        
        return true;
    }

    @Override
    @Transactional
    public int markAllAsRead(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));
                
        // Đánh dấu tất cả thông báo là đã đọc
        return notificationRepository.markAllAsRead(user);
    }

    @Override
    public List<NotificationResponse> getUserNotifications(Long userId, int page, int size) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));
                
        // Tạo pageable cho phân trang
        Pageable pageable = PageRequest.of(page, size);
        
        // Lấy danh sách thông báo
        List<Notification> notifications = notificationRepository.findByUserAndIsDeletedFalseOrderBySentAtDesc(user, pageable);
        
        // Chuyển đổi sang response DTO
        return notifications.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public int getUnreadCount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));
                
        // Đếm số lượng thông báo chưa đọc
        return notificationRepository.countByUserAndIsReadFalseAndIsDeletedFalse(user);
    }

    @Override
    @Transactional
    public boolean deleteNotification(Long notificationId, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));
                
        // Tìm thông báo theo ID và người dùng
        Notification notification = notificationRepository.findByNotificationIdAndUser(notificationId, user);
        
        if (notification == null || notification.isDeleted()) {
            return false;
        }
        
        // Xóa mềm thông báo
        notification.setDeleted(true);
        notificationRepository.save(notification);
        
        return true;
    }

    @Override
    @Transactional
    public int deleteAllReadNotifications(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));
                
        // Xóa tất cả thông báo đã đọc
        return notificationRepository.deleteAllReadNotifications(user);
    }
    
    // Helper method to convert entity to DTO
    private NotificationResponse convertToResponse(Notification notification) {
        return NotificationResponse.builder()
                .notificationId(notification.getNotificationId())
                .userId(notification.getUser().getUserId())
                .notificationType(notification.getNotificationType())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .link(notification.getLink())
                .isRead(notification.isRead())
                .sentAt(notification.getSentAt())
                .readAt(notification.getReadAt())
                .build();
    }
    
    // Helper method to determine notification type based on content
    private NotificationType determineNotificationType(String title, String link) {
        // Default type
        NotificationType type = NotificationType.SYSTEM;
        
        // Logic xác định loại thông báo dựa vào tiêu đề hoặc link
        String titleLower = title.toLowerCase();
        
        if (link != null) {
            // Xác định loại thông báo dựa vào link
            if (link.contains("/bookings") || link.contains("/booking")) {
                return NotificationType.BOOKING;
            } else if (link.contains("/classes") || link.contains("/class")) {
                return NotificationType.CLASS;
            } else if (link.contains("/membership")) {
                return NotificationType.MEMBERSHIP;
            } else if (link.contains("/payments") || link.contains("/payment")) {
                return NotificationType.PAYMENT;
            } else if (link.contains("/pt-sessions") || link.contains("/pt-packages")) {
                return NotificationType.PT_SESSION;
            }
        }
        
        // Xác định loại thông báo dựa vào tiêu đề
        if (titleLower.contains("đặt chỗ") || titleLower.contains("lịch hẹn") || titleLower.contains("booking")) {
            type = NotificationType.BOOKING;
        } else if (titleLower.contains("lớp") || titleLower.contains("class")) {
            type = NotificationType.CLASS;
        } else if (titleLower.contains("hội viên") || titleLower.contains("membership") || titleLower.contains("gói tập")) {
            type = NotificationType.MEMBERSHIP;
        } else if (titleLower.contains("nhắc nhở") || titleLower.contains("reminder")) {
            type = NotificationType.REMINDER;
        } else if (titleLower.contains("khuyến mãi") || titleLower.contains("ưu đãi") || titleLower.contains("promotion")) {
            type = NotificationType.PROMOTION;
        } else if (titleLower.contains("pt") || titleLower.contains("huấn luyện viên") || titleLower.contains("buổi tập")) {
            type = NotificationType.PT_SESSION;
        } else if (titleLower.contains("thanh toán") || titleLower.contains("payment") || titleLower.contains("hóa đơn")) {
            type = NotificationType.PAYMENT;
        } else if (titleLower.contains("thông báo") || titleLower.contains("announcement")) {
            type = NotificationType.ANNOUNCEMENT;
        }
        
        return type;
    }
}