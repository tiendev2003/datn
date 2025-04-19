package com.gym.datn_be.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "pt_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PTSession {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id")
    private Long sessionId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_package_id", nullable = false)
    private UserPTPackage userPackage;
    
    @Column(name = "session_number")
    private Integer sessionNumber;
    
    @Column(name = "session_focus")
    private String sessionFocus;
    
    @Column(name = "session_notes")
    private String sessionNotes;
    
    @Column(name = "feedback")
    private String feedback;
    
    @Column(name = "rating")
    private Integer rating;
    
    @Column(name = "user_comments")
    private String userComments;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
}