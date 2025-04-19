package com.gym.datn_be.service;

import java.util.List;

import com.gym.datn_be.dto.response.NotificationResponse;
import com.gym.datn_be.entity.Notification;

/**
 * Service để quản lý thông báo trong hệ thống
 */
public interface NotificationService {
    
    /**
     * Gửi thông báo đến một người dùng
     * 
     * @param userId ID người dùng nhận thông báo
     * @param title Tiêu đề thông báo
     * @param message Nội dung thông báo
     * @param link Đường dẫn khi click vào thông báo (tùy chọn)
     * @return Thông báo đã tạo
     */
    Notification sendNotification(Long userId, String title, String message, String link);
    
    /**
     * Gửi thông báo đến nhiều người dùng
     * 
     * @param userIds Danh sách ID người dùng nhận thông báo
     * @param title Tiêu đề thông báo
     * @param message Nội dung thông báo
     * @param link Đường dẫn khi click vào thông báo (tùy chọn)
     */
    void sendNotificationToMultipleUsers(List<Long> userIds, String title, String message, String link);
    
    /**
     * Gửi thông báo đến tất cả người dùng
     * 
     * @param title Tiêu đề thông báo
     * @param message Nội dung thông báo
     * @param link Đường dẫn khi click vào thông báo (tùy chọn)
     */
    void sendNotificationToAllUsers(String title, String message, String link);
    
    /**
     * Đánh dấu thông báo đã đọc
     * 
     * @param notificationId ID thông báo
     * @param userId ID người dùng
     * @return true nếu đánh dấu thành công, false nếu không
     */
    boolean markAsRead(Long notificationId, Long userId);
    
    /**
     * Đánh dấu tất cả thông báo của người dùng là đã đọc
     * 
     * @param userId ID người dùng
     * @return Số lượng thông báo đã được đánh dấu
     */
    int markAllAsRead(Long userId);
    
    /**
     * Lấy tất cả thông báo của người dùng
     * 
     * @param userId ID người dùng
     * @param page Số trang
     * @param size Số lượng mỗi trang
     * @return Danh sách thông báo
     */
    List<NotificationResponse> getUserNotifications(Long userId, int page, int size);
    
    /**
     * Lấy số lượng thông báo chưa đọc của người dùng
     * 
     * @param userId ID người dùng
     * @return Số lượng thông báo chưa đọc
     */
    int getUnreadCount(Long userId);
    
    /**
     * Xóa thông báo
     * 
     * @param notificationId ID thông báo
     * @param userId ID người dùng
     * @return true nếu xóa thành công, false nếu không
     */
    boolean deleteNotification(Long notificationId, Long userId);
    
    /**
     * Xóa tất cả thông báo đã đọc của người dùng
     * 
     * @param userId ID người dùng
     * @return Số lượng thông báo đã xóa
     */
    int deleteAllReadNotifications(Long userId);
}