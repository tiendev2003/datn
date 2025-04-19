package com.gym.datn_be.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassScheduleDetailResponse {
    private Long id;
    private Long classTypeId;
    private String className;
    private String classDescription;
    private String intensity;
    private Long trainerId;
    private String trainerName;
    private String trainerEmail;
    private String trainerPhone;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
    private Integer registeredAttendees;
    private Integer maxAttendees;
    private List<ClassAttendeeResponse> attendees;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}