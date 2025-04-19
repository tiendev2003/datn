package com.gym.datn_be.dto.request;

import java.time.LocalTime;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OperationHoursRequest {
    @NotNull(message = "Ngày trong tuần không được để trống")
    private String dayOfWeek;
    
    private LocalTime openingTime;
    
    private LocalTime closingTime;
    
    private Boolean isClosed;
}