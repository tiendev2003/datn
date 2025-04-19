package com.gym.datn_be.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrainerSummaryResponse {
    
    private Long id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private String phone;
    private String specialization;
    private Integer experienceYears;
    private String profileImageUrl;
    private Double averageRating;
    private Integer totalClients;
    private Integer completedSessions;
    private Double hourlyRate;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}