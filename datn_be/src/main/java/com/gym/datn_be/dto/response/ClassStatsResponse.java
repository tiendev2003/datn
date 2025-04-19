package com.gym.datn_be.dto.response;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassStatsResponse {
    private Long totalClasses;
    private Long completedClasses;
    private Long cancelledClasses;
    private Long upcomingClasses;
    private Double attendanceRate;
    private Long totalRegistrations;
    private Long totalAttendees;
    private Map<String, Long> registrationsByClassType;
    private Map<String, Long> attendanceByClassType;
    private List<Map<String, Object>> popularClasses;
    private List<Map<String, Object>> dailyStats;
    private LocalDate startDate;
    private LocalDate endDate;
}