package com.gym.datn_be.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PTRevenueReportResponse {
    
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal totalRevenue;
    private Integer totalPackagesSold;
    private Integer totalSessionsScheduled;
    private Integer totalSessionsCompleted;
    private Integer totalSessionsCancelled;
    private Double completionRate; // Tỷ lệ buổi tập hoàn thành
    private Double cancellationRate; // Tỷ lệ buổi tập bị hủy
    
    private Map<String, BigDecimal> revenueByPackage;
    private Map<String, BigDecimal> revenueByTrainer;
    private Map<String, BigDecimal> revenueByDay;
    private Map<String, BigDecimal> revenueByMonth;
    
    private List<PackageRevenueDetail> packageDetails;
    
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PackageRevenueDetail {
        private Long packageId;
        private String packageName;
        private Integer numberOfSessions;
        private Integer validityDays;
        private BigDecimal basePrice;
        private BigDecimal revenue;
        private Integer packagesSold;
        private Double percentageOfTotalRevenue;
        private Integer activeUsers;
        private Integer completedUsers;
    }
}