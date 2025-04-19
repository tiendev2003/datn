package com.gym.datn_be.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingUpdateRequest {
    
    @FutureOrPresent(message = "Thời gian bắt đầu phải là hiện tại hoặc trong tương lai")
    private LocalDateTime startDateTime;
    
    @FutureOrPresent(message = "Thời gian kết thúc phải là hiện tại hoặc trong tương lai")
    private LocalDateTime endDateTime;
    
    @Pattern(regexp = "PENDING|CONFIRMED|CANCELLED|COMPLETED|NO_SHOW", message = "Trạng thái phải là PENDING, CONFIRMED, CANCELLED, COMPLETED hoặc NO_SHOW")
    private String status;
    
    private Long trainerId;
    
    private Long classScheduleId;
    
    private String location;
    
    private String notes;
    
    private String cancellationReason;
}