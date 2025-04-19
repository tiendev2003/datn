package com.gym.datn_be.dto.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SessionRescheduleRequest {
    
    @NotNull(message = "Thời gian bắt đầu không được để trống")
    @FutureOrPresent(message = "Thời gian bắt đầu phải là hiện tại hoặc tương lai")
    private LocalDateTime newStartTime;
    
    @NotNull(message = "Thời gian kết thúc không được để trống")
    @FutureOrPresent(message = "Thời gian kết thúc phải là hiện tại hoặc tương lai")
    private LocalDateTime newEndTime;
    
    @Size(max = 500, message = "Lý do thay đổi không được vượt quá 500 ký tự")
    private String reason;
    
    private boolean notifyUser = true;
    
    @Size(max = 500, message = "Ghi chú không được vượt quá 500 ký tự")
    private String notes;
}