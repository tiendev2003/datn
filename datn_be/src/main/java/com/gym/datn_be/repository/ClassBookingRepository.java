package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.ClassBooking;
import com.gym.datn_be.entity.ClassBooking.BookingStatus;
import com.gym.datn_be.entity.ClassSchedule;
import com.gym.datn_be.entity.User;

@Repository
public interface ClassBookingRepository extends JpaRepository<ClassBooking, Long> {
    
    List<ClassBooking> findByUser(User user);
    
    List<ClassBooking> findByClassSchedule(ClassSchedule classSchedule);
    
    Optional<ClassBooking> findByUserAndClassSchedule(User user, ClassSchedule classSchedule);
    
    @Query("SELECT cb FROM ClassBooking cb WHERE cb.classSchedule.scheduleId = :scheduleId AND cb.status = :status")
    List<ClassBooking> findByScheduleIdAndStatus(Long scheduleId, BookingStatus status);
    
    @Query("SELECT COUNT(cb) FROM ClassBooking cb WHERE cb.classSchedule.scheduleId = :scheduleId AND cb.status = :status")
    Long countByScheduleIdAndStatus(Long scheduleId, BookingStatus status);
    
    @Query("SELECT cb FROM ClassBooking cb WHERE cb.user.userId = :userId " +
           "AND (:status IS NULL OR cb.status = :status) " +
           "AND (:fromDate IS NULL OR cb.classSchedule.startTime >= :fromDate) " +
           "AND (:toDate IS NULL OR cb.classSchedule.startTime <= :toDate)")
    Page<ClassBooking> findByUserIdAndFilters(
            Long userId, BookingStatus status, LocalDateTime fromDate, LocalDateTime toDate, Pageable pageable);
    
    @Query("SELECT COUNT(cb) FROM ClassBooking cb WHERE cb.status = :status " + 
           "AND cb.classSchedule.startTime BETWEEN :start AND :end")
    Long countByStatusAndDateBetween(BookingStatus status, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT COUNT(cb) FROM ClassBooking cb WHERE cb.classSchedule.classType.classTypeId = :classTypeId " +
           "AND cb.status = :status AND cb.attended = true")
    Long countAttendedByClassTypeId(Long classTypeId, BookingStatus status);
}