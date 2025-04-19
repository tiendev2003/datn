package com.gym.datn_be.dto.request;

import java.time.LocalDate;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MembershipExtendRequest {
    
    @NotNull(message = "Số ngày gia hạn không được để trống")
    @Min(value = 1, message = "Số ngày gia hạn phải ít nhất là 1")
    private Integer daysToExtend;
    
    private LocalDate newEndDate;
    
    private Double additionalCost;
    
    @NotNull(message = "Lý do gia hạn không được để trống")
    private String reason;
}