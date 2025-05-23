package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Booking;
import com.gym.datn_be.entity.CheckInOut;
import com.gym.datn_be.entity.User;

@Repository
public interface CheckInOutRepository extends JpaRepository<CheckInOut, Long> {
    List<CheckInOut> findByUser(User user);
     
    @Query("SELECT c FROM CheckInOut c WHERE c.checkInTime BETWEEN ?1 AND ?2")
    List<CheckInOut> findByCheckInTimeBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT c FROM CheckInOut c WHERE c.user = ?1 AND c.checkInTime BETWEEN ?2 AND ?3")
    List<CheckInOut> findByUserAndCheckInTimeBetween(User user, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT c FROM CheckInOut c WHERE c.location = ?1 AND c.checkInTime BETWEEN ?2 AND ?3")
    List<CheckInOut> findByLocationAndCheckInTimeBetween(String location, LocalDateTime startDate, LocalDateTime endDate);
    
    Optional<CheckInOut> findFirstByBookingOrderByCheckInTimeDesc(Booking booking);
}