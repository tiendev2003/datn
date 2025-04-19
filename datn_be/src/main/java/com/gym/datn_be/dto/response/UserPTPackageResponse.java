package com.gym.datn_be.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.gym.datn_be.entity.UserPTPackage.PackageStatus;
import com.gym.datn_be.entity.UserPTPackage.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserPTPackageResponse {
    
    private Long userPackageId;
    private Long userId;
    private String userName;
    private String userEmail;
    private String userPhoneNumber;
    private String userProfileImage;
    
    private Long packageId;
    private String packageName;
    private Integer numberOfSessions;
    private Integer validityDays;
    
    private Long trainerId;
    private String trainerName;
    private String trainerSpecialization;
    private String trainerProfileImage;
    
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer sessionsRemaining;
    private Integer sessionsUsed;
    private Integer sessionsCancelled;
    private PackageStatus packageStatus;
    private PaymentStatus paymentStatus;
    private BigDecimal actualPrice;
    private String notes;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime lastSessionDate;
    private LocalDateTime nextSessionDate;
}