package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Booking;
import com.gym.datn_be.entity.Booking.BookingStatus;
import com.gym.datn_be.entity.Booking.BookingType;
 import com.gym.datn_be.entity.User;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    List<Booking> findByStatus(BookingStatus status);
    List<Booking> findByBookingType(BookingType bookingType);
     
    @Query("SELECT b FROM Booking b WHERE b.user = ?1 AND b.status = ?2")
    List<Booking> findByUserAndStatus(User user, BookingStatus status);
    
    @Query("SELECT b FROM Booking b WHERE b.startDateTime BETWEEN ?1 AND ?2")
    List<Booking> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT b FROM Booking b WHERE b.user = ?1 AND b.startDateTime BETWEEN ?2 AND ?3")
    List<Booking> findByUserAndDateTimeBetween(User user, LocalDateTime start, LocalDateTime end);
}