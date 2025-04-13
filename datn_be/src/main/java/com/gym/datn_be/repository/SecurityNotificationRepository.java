package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.SecurityNotification;
import com.gym.datn_be.entity.User;

@Repository
public interface SecurityNotificationRepository extends JpaRepository<SecurityNotification, Long> {
    List<SecurityNotification> findByUserOrderByCreatedAtDesc(User user);
    
    List<SecurityNotification> findByUserAndIsReadFalseOrderByCreatedAtDesc(User user);
    
    long countByUserAndIsReadFalse(User user);
    
    void deleteByUser(User user);
}