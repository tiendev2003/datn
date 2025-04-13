package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.ClassBooking;
import com.gym.datn_be.entity.ClassBooking.AttendanceStatus;
import com.gym.datn_be.entity.ClassSchedule;
import com.gym.datn_be.entity.User;

@Repository
public interface ClassBookingRepository extends JpaRepository<ClassBooking, Long> {
    @Query("SELECT cb FROM ClassBooking cb WHERE cb.booking.user = ?1")
    List<ClassBooking> findByBookingUser(User user);
    
    List<ClassBooking> findBySchedule(ClassSchedule schedule);
    List<ClassBooking> findByAttendanceStatus(AttendanceStatus attendanceStatus);
    
    @Query("SELECT cb FROM ClassBooking cb WHERE cb.booking.user = ?1 AND cb.attendanceStatus = ?2")
    List<ClassBooking> findByBookingUserAndAttendanceStatus(User user, AttendanceStatus attendanceStatus);
    
    List<ClassBooking> findByScheduleAndAttendanceStatus(ClassSchedule schedule, AttendanceStatus attendanceStatus);
    int countBySchedule(ClassSchedule schedule);
}