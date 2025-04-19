package com.gym.datn_be.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PTPackageResponse {
    
    private Long packageId;
    private String packageName;
    private String description;
    private Integer numberOfSessions;
    private Integer validityDays;
    private BigDecimal price;
    private BigDecimal discountPercentage;
    private boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer activeUsersCount; // Số người đang sử dụng gói này
}