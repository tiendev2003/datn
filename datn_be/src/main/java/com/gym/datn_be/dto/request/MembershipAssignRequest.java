package com.gym.datn_be.dto.request;

import java.time.LocalDate;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MembershipAssignRequest {
    
    @NotNull(message = "ID người dùng không được để trống")
    @Positive(message = "ID người dùng phải là số dương")
    private Long userId;
    
    @NotNull(message = "ID loại gói tập không được để trống")
    @Positive(message = "ID loại gói tập phải là số dương")
    private Long membershipTypeId;
    
    @NotNull(message = "Ngày bắt đầu không được để trống")
    private LocalDate startDate;
    
    @NotNull(message = "Giá thực tế không được để trống")
    @Positive(message = "Giá thực tế phải là số dương")
    private Double actualPrice;
    
    private String promoCode;
    
    private String notes;
}