package com.gym.datn_be.dto.response;

import java.math.BigDecimal;
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
public class PTPackageStatsResponse {
    
    private Integer totalPackages;
    private Integer activePackages;
    private Integer inactivePackages;
    private Integer totalUserRegistrations;
    private Integer activeUserRegistrations;
    private Integer expiredUserRegistrations;
    private Integer cancelledUserRegistrations;
    
    private BigDecimal totalRevenue;
    private BigDecimal averagePackagePrice;
    private BigDecimal highestPackagePrice;
    private BigDecimal lowestPackagePrice;
    
    private Map<String, Integer> packagesCountByStatus;
    private Map<String, BigDecimal> revenueByMonth;
    private Map<String, Integer> registrationsByMonth;
    
    private List<PTPackageResponse> topPackagesByRevenue;
    private List<PTPackageResponse> topPackagesByUsers;
}