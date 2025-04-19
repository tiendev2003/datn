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
public class ClassBookingResponse {
    private Long bookingId;
    private Long userId;
    private String userName;
    private String userEmail;
    private String userPhone;
    private Long scheduleId;
    private String className;
    private LocalDateTime bookingTime;
    private String status;
    private Boolean attended;
}