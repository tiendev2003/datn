package com.gym.datn_be.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PTRevenueReportResponse {
    
    // Thời gian của báo cáo
    private LocalDate startDate;
    private LocalDate endDate;
    
    // Tổng doanh thu
    private BigDecimal totalRevenue;
    
    // Tổng số gói PT bán được
    private Integer totalPackagesSold;
    
    // Số liệu về buổi tập
    private Integer totalSessionsScheduled;
    private Integer totalSessionsCompleted;
    private Integer totalSessionsCancelled;
    
    // Tỷ lệ hoàn thành và hủy buổi tập
    private Double completionRate;
    private Double cancellationRate;
    
    // Phân tích doanh thu theo huấn luyện viên
    @Builder.Default
    private Map<String, BigDecimal> revenueByTrainer = new HashMap<>();
    
    // Phân tích doanh thu theo loại gói
    @Builder.Default
    private Map<String, BigDecimal> revenueByPackage = new HashMap<>();
    
    // Phân tích doanh thu theo ngày
    @Builder.Default
    private Map<String, BigDecimal> revenueByDay = new HashMap<>();
    
    // Phân tích doanh thu theo tháng
    @Builder.Default
    private Map<String, BigDecimal> revenueByMonth = new HashMap<>();
    
    // Chi tiết doanh thu theo từng loại gói
    @Builder.Default
    private List<PackageRevenueDetail> packageDetails = new ArrayList<>();
    
    /**
     * Lớp bên trong để chứa chi tiết doanh thu theo từng loại gói
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PackageRevenueDetail {
        private Long packageId;
        private String packageName;
        private Integer numberOfSessions;
        private Integer validityDays;
        private BigDecimal price;
        private BigDecimal revenue;
        private Long packagesSold;
        private Double percentageOfTotalRevenue; // tỷ lệ đóng góp vào tổng doanh thu
        private Long activePackages;
        private Long completedPackages;
    }
}