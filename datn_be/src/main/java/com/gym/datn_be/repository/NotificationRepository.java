package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gym.datn_be.entity.Notification;
import com.gym.datn_be.entity.User;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    /**
     * Tìm danh sách thông báo của một người dùng, sắp xếp theo thời gian gửi giảm dần
     */
    List<Notification> findByUserAndIsDeletedFalseOrderBySentAtDesc(User user, Pageable pageable);
    
    /**
     * Đếm số lượng thông báo chưa đọc của một người dùng
     */
    int countByUserAndIsReadFalseAndIsDeletedFalse(User user);
    
    /**
     * Tìm thông báo theo ID và người dùng
     */
    Notification findByNotificationIdAndUser(Long notificationId, User user);
    
    /**
     * Đánh dấu tất cả thông báo của người dùng là đã đọc
     */
    @Modifying
    @Query("UPDATE Notification n SET n.isRead = true, n.readAt = CURRENT_TIMESTAMP WHERE n.user = :user AND n.isRead = false AND n.isDeleted = false")
    int markAllAsRead(@Param("user") User user);
    
    /**
     * Xóa (mềm) tất cả thông báo đã đọc của người dùng
     */
    @Modifying
    @Query("UPDATE Notification n SET n.isDeleted = true WHERE n.user = :user AND n.isRead = true AND n.isDeleted = false")
    int deleteAllReadNotifications(@Param("user") User user);
    
    /**
     * Tìm tất cả người dùng có trong hệ thống
     */
    @Query("SELECT DISTINCT n.user FROM Notification n")
    List<User> findAllUsersWithNotifications();
}