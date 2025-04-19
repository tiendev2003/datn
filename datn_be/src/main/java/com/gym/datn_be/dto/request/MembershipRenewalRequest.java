package com.gym.datn_be.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MembershipRenewalRequest {
    
    @NotNull(message = "Số tháng gia hạn không được để trống")
    @Positive(message = "Số tháng gia hạn phải là số dương")
    private Integer monthsToRenew;
    
    @NotNull(message = "Giá gia hạn không được để trống")
    @Positive(message = "Giá gia hạn phải là số dương")
    private Double renewalPrice;
    
    private String promoCode;
    
    private String notes;
}