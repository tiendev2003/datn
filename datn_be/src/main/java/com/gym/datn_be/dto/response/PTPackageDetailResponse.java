package com.gym.datn_be.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PTPackageDetailResponse {

    private Long packageId;
    private String packageName;
    private String description;
    private Integer numberOfSessions;
    private Integer validityDays;
    private BigDecimal price;
    private BigDecimal finalPrice; // Giá sau khi áp dụng giảm giá
    private boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer totalUsers; // Tổng số người đã đăng ký gói này
    private Integer activeUsers; // Số người đang hoạt động với gói này
    private Integer expiredUsers; // Số người đã hết hạn
    private Integer cancelledUsers; // Số người đã hủy
    private List<UserPTPackageResponse> recentRegistrations; // Các đăng ký gần đây
}