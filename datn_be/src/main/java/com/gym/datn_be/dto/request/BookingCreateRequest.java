package com.gym.datn_be.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingCreateRequest {
    
    @NotNull(message = "UserId không được để trống")
    private Long userId;
    
    @NotNull(message = "Loại đặt lịch không được để trống")
    @Pattern(regexp = "GYM_SESSION|PT_SESSION|CLASS", message = "Loại đặt lịch phải là GYM_SESSION, PT_SESSION hoặc CLASS")
    private String bookingType;
    
    @NotNull(message = "Thời gian bắt đầu không được để trống")
    @FutureOrPresent(message = "Thời gian bắt đầu phải là hiện tại hoặc trong tương lai")
    private LocalDateTime startDateTime;
    
    @NotNull(message = "Thời gian kết thúc không được để trống")
    @FutureOrPresent(message = "Thời gian kết thúc phải là hiện tại hoặc trong tương lai")
    private LocalDateTime endDateTime;
    
    // Trainer info - required for PT_SESSION
    private Long trainerId;
    
    // Class info - required for CLASS
    private Long classScheduleId;
    
    // PT Package info - required for PT_SESSION
    private Long packageId;
    
    private String location;
    
    private String notes;
}