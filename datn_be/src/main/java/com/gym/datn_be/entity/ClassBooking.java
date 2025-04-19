package com.gym.datn_be.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "class_bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private ClassSchedule classSchedule;
    
    @Column(name = "booking_time", nullable = false)
    private LocalDateTime bookingTime;
    
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.CONFIRMED;
    
    @Column(name = "attended")
    private Boolean attended = false;
    
    @Column(name = "cancellation_reason")
    private String cancellationReason;
    
    @Column(name = "cancellation_time")
    private LocalDateTime cancellationTime;
    
    public enum BookingStatus {
        CONFIRMED, CANCELLED, ATTENDED
    }
}