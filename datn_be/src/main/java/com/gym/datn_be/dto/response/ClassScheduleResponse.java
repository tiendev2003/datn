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
public class ClassScheduleResponse {
    private Long id;
    private Long classTypeId;
    private String className;
    private Long trainerId;
    private String trainerName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
    private Integer registeredAttendees;
    private Integer maxAttendees;
}