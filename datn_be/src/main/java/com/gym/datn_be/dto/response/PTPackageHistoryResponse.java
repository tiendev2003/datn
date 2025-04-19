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
public class PTPackageHistoryResponse {
    
    private Long historyId;
    private Long packageId;
    private String packageName;
    private String action; // CREATE, UPDATE, ACTIVATE, DEACTIVATE
    private LocalDateTime timestamp;
    private String username; // Người thực hiện thay đổi
    
    private String fieldChanged; // Trường bị thay đổi
    private String oldValue; // Giá trị cũ
    private String newValue; // Giá trị mới
    
    // Các thông tin về gói PT tại thời điểm thay đổi
    private String description;
    private Integer numberOfSessions;
    private Integer validityDays;
    private BigDecimal price;
    private BigDecimal discountPercentage;
    private boolean wasActive;
}