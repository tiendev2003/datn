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
public class SessionAddRequest {
    
    @NotNull(message = "ID gói PT người dùng không được để trống")
    private Long userPackageId;
    
    @NotNull(message = "Thời gian bắt đầu không được để trống")
    @FutureOrPresent(message = "Thời gian bắt đầu phải là hiện tại hoặc tương lai")
    private LocalDateTime startTime;
    
    @NotNull(message = "Thời gian kết thúc không được để trống")
    @FutureOrPresent(message = "Thời gian kết thúc phải là hiện tại hoặc tương lai")
    private LocalDateTime endTime;
    
    @Size(max = 200, message = "Mục tiêu buổi tập không được vượt quá 200 ký tự")
    private String sessionFocus;
    
    @Size(max = 500, message = "Ghi chú không được vượt quá 500 ký tự")
    private String notes;
    
    private String location;
    
    private boolean notifyUser = true;
}