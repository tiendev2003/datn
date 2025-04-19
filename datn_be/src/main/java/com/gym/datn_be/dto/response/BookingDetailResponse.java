package com.gym.datn_be.dto.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDetailResponse {
    private Long bookingId;
    
    // User info
    private Long userId;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String userGender;
    
    // Booking details
    private String bookingType;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startDateTime;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endDateTime;
    
    private String location;
    private String status;
    private String notes;
    
    // Trainer info (for PT sessions)
    private Long trainerId;
    private String trainerName;
    private String trainerSpecialty;
    
    // Class info (for class bookings)
    private Long classScheduleId;
    private String className;
    private String classDescription;
    private Integer maxParticipants;
    private Integer currentParticipants;
    
    // PT Package info
    private Long packageId;
    private String packageName;
    private Integer sessionsRemaining;
    
    // Administrative info
    private String cancellationReason;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime checkInTime;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime completionTime;
}