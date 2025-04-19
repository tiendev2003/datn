package com.gym.datn_be.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PackageExtensionRequest {
    
    private Long requestId;
    private Long userPackageId;
    private Long userId;
    private String userName;
    private Long trainerId;
    private String trainerName;
    private Long packageId;
    private String packageName;
    
    private String requestType; // EXTEND_DAYS, ADD_SESSIONS, CHANGE_TRAINER
    private Integer daysToAdd;
    private Integer sessionsToAdd;
    private Long newTrainerId;
    private String newTrainerName;
    
    private String reason;
    private String status; // PENDING, APPROVED, REJECTED
    private String rejectionReason;
    
    private LocalDateTime requestDate;
    private LocalDateTime processedDate;
    private String processedBy;
    
    private LocalDate currentEndDate;
    private LocalDate newEndDate;
    private Integer currentSessions;
    private Integer newSessions;
    private BigDecimal fee;
}