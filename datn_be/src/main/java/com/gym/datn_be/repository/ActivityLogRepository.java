package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.ActivityLog;
import com.gym.datn_be.entity.ActivityLog.ActivityType;
import com.gym.datn_be.entity.User;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findByUser(User user);
    List<ActivityLog> findByActivityType(ActivityType activityType);
    
    @Query("SELECT a FROM ActivityLog a WHERE a.activityTime BETWEEN ?1 AND ?2")
    List<ActivityLog> findByTimestampBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT a FROM ActivityLog a WHERE a.user = ?1 AND a.activityTime BETWEEN ?2 AND ?3")
    List<ActivityLog> findByUserAndTimestampBetween(User user, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT a FROM ActivityLog a WHERE a.activityType = ?1 AND a.activityTime BETWEEN ?2 AND ?3")
    List<ActivityLog> findByActivityTypeAndTimestampBetween(ActivityType activityType, LocalDateTime startDate, LocalDateTime endDate);
}