package com.gym.datn_be.dto.response;

import java.time.LocalDateTime;

import com.gym.datn_be.entity.Booking.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PTSessionResponse {
    
    private Long sessionId;
    private Long bookingId;
    private Long userPackageId;
    
    private Long userId;
    private String userName;
    private String userEmail;
    private String userProfileImage;
    
    private Long trainerId;
    private String trainerName;
    private String trainerProfileImage;
    
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    
    private Integer sessionNumber;
    private String sessionFocus;
    private String sessionNotes;
    
    private BookingStatus status;
    private Integer rating;
    private String feedback;
    private String userComments;
    
    private String location;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}