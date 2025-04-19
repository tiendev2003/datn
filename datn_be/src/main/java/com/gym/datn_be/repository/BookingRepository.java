package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Booking;
import com.gym.datn_be.entity.User;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByUser(User user);
    
    List<Booking> findByStartDateTimeBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.startDateTime >= :startDate AND b.startDateTime <= :endDate")
    long countBookingsBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.bookingType = 'CLASS' AND b.startDateTime >= :startDate AND b.startDateTime <= :endDate")
    long countClassBookingsBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.bookingType = 'PT' AND b.startDateTime >= :startDate AND b.startDateTime <= :endDate")
    long countPtBookingsBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT b FROM Booking b WHERE b.trainer.trainerId = :trainerId " +
           "AND b.startDateTime >= :startDateTime AND b.endDateTime <= :endDateTime")
    List<Booking> findByTrainerAndDateRange(
            @Param("trainerId") Long trainerId, 
            @Param("startDateTime") LocalDateTime startDateTime,
            @Param("endDateTime") LocalDateTime endDateTime);
    
    @Query("SELECT COUNT(DISTINCT b.user.userId) FROM Booking b WHERE b.trainer.trainerId = :trainerId")
    Integer countDistinctClientsByTrainer(@Param("trainerId") Long trainerId);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.trainer.trainerId = :trainerId AND b.status = 'COMPLETED'")
    Integer countCompletedSessionsByTrainer(@Param("trainerId") Long trainerId);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.trainer.trainerId = :trainerId AND b.status = 'CONFIRMED'")
    Integer countUpcomingSessionsByTrainer(@Param("trainerId") Long trainerId);
    
    @Query("SELECT b FROM Booking b WHERE b.user.userId = :userId AND b.trainer.trainerId = :trainerId " +
           "ORDER BY b.startDateTime DESC")
    List<Booking> findByUserIdAndTrainerId(
            @Param("userId") Long userId,
            @Param("trainerId") Long trainerId);
}