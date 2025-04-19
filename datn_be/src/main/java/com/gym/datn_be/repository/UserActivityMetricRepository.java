package com.gym.datn_be.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.UserActivityMetric;
import com.gym.datn_be.entity.User;

@Repository
public interface UserActivityMetricRepository extends JpaRepository<UserActivityMetric, Long> {
    
    List<UserActivityMetric> findByUser(User user);
    
    List<UserActivityMetric> findByActivityDateBetween(LocalDate startDate, LocalDate endDate);
    
    List<UserActivityMetric> findByUserAndActivityDateBetween(User user, LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT SUM(uam.visitCount) FROM UserActivityMetric uam WHERE uam.activityDate = :date")
    Integer sumVisitCountByDate(LocalDate date);
    
    @Query("SELECT SUM(uam.classAttendances) FROM UserActivityMetric uam WHERE uam.activityDate = :date")
    Integer sumClassAttendancesByDate(LocalDate date);
    
    @Query("SELECT SUM(uam.ptSessions) FROM UserActivityMetric uam WHERE uam.activityDate = :date")
    Integer sumPtSessionsByDate(LocalDate date);
    
    @Query("SELECT uam.activityDate, SUM(uam.visitCount) FROM UserActivityMetric uam " +
           "WHERE uam.activityDate BETWEEN :startDate AND :endDate " +
           "GROUP BY uam.activityDate ORDER BY uam.activityDate")
    List<Object[]> getVisitCountByDateRange(LocalDate startDate, LocalDate endDate);
}