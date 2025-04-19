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
public class ClassTypeDetailResponse {
    private Long id;
    private String typeName;
    private String description;
    private Integer durationMinutes;
    private Integer maxCapacity;
    private String intensity;
    private String imageUrl;
    private Boolean isActive;
    private Integer totalSchedules;
    private Integer completedSchedules;
    private Integer upcomingSchedules;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}