package com.gym.datn_be.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassScheduleUpdateRequest {
    
    @NotNull(message = "ID loại lớp không được để trống")
    private Long classTypeId;
    
    @NotNull(message = "ID huấn luyện viên không được để trống")
    private Long trainerId;
    
    @NotNull(message = "Thời gian bắt đầu không được để trống")
    @Future(message = "Thời gian bắt đầu phải trong tương lai")
    private LocalDateTime startTime;
    
    private Integer maxAttendees;
    
    private String notes;
    
    private String status; // SCHEDULED, CANCELLED, COMPLETED
}