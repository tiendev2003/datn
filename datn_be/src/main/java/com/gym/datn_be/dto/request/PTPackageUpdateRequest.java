package com.gym.datn_be.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PTPackageUpdateRequest {
    
    @Size(max = 100, message = "Tên gói PT không được vượt quá 100 ký tự")
    private String packageName;
    
    @Size(max = 1000, message = "Mô tả không được vượt quá 1000 ký tự")
    private String description;
    
    @Min(value = 1, message = "Số buổi tập phải lớn hơn 0")
    private Integer numberOfSessions;
    
    @Min(value = 1, message = "Số ngày hiệu lực phải lớn hơn 0")
    private Integer validityDays;
    
    @DecimalMin(value = "0.0", inclusive = false, message = "Giá gói PT phải lớn hơn 0")
    private BigDecimal price;
    
    @DecimalMin(value = "0.0", message = "Phần trăm giảm giá không được âm")
    private BigDecimal discountPercentage;
    
    private Boolean isActive;
}
