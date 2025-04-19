package com.gym.datn_be.dto.response;

import java.time.LocalDate;
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
public class TrainerDetailResponse {
    
    private Long id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private Integer age;
    private String gender;
    private String bio;
    private String specialization;
    private List<String> certifications;
    private Integer experienceYears;
    private String profileImageUrl;
    private Double averageRating;
    private Integer totalClients;
    private Integer completedSessions;
    private Double hourlyRate;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<AvailabilityInfo> availabilities;
    private List<TrainerRating> ratings;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AvailabilityInfo {
        private Long id;
        private String dayOfWeek;
        private String startTime;
        private String endTime;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TrainerRating {
        private Long id;
        private String clientName;
        private String clientProfileImage;
        private Integer rating;
        private String comment;
        private LocalDateTime createdAt;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ScheduleInfo {
        private Long trainerId;
        private List<ScheduleDay> scheduleDays;
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        @Builder
        public static class ScheduleDay {
            private LocalDate date;
            private String dayOfWeek;
            private List<ScheduleSession> sessions;
            private List<UnavailabilityPeriod> unavailabilityPeriods;
        }
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        @Builder
        public static class ScheduleSession {
            private Long sessionId;
            private String clientName;
            private String clientProfileImage;
            private String startTime;
            private String endTime;
            private String sessionType;
            private String status;
        }
        
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        @Builder
        public static class UnavailabilityPeriod {
            private Long id;
            private String reason;
            private String startTime;
            private String endTime;
        }
    }
}