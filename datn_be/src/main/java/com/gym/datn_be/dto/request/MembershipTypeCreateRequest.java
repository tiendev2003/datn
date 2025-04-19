package com.gym.datn_be.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MembershipTypeCreateRequest {
    
    @NotBlank(message = "Tên gói tập không được để trống")
    @Size(max = 100, message = "Tên gói tập không được vượt quá 100 ký tự")
    private String typeName;
    
    @Size(max = 1000, message = "Mô tả không được vượt quá 1000 ký tự")
    private String description;
    
    @NotNull(message = "Số ngày của gói tập không được để trống")
    @Positive(message = "Số ngày của gói tập phải là số dương")
    private Integer durationDays;
    
    @NotNull(message = "Giá gói tập không được để trống")
    @Positive(message = "Giá gói tập phải là số dương")
    private Double price;
    
    private Integer maxFreezeDays = 0;
    
    private Integer guestPasses = 0;
}