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
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    // Thống kê tổng quan
    private long totalUsers;
    private long activeMembers;
    private long totalTrainers;
    private long totalBookings;
    
    // Thống kê tài chính
    private BigDecimal totalRevenue;
    private BigDecimal membershipRevenue;
    private BigDecimal ptPackageRevenue;
    private BigDecimal otherRevenue;
    
    // Thống kê hoạt động
    private int todayVisitors;
    private int todayBookings;
    private int todayClasses;
    
    // Thống kê thành viên mới
    private int newMembersToday;
    private int newMembersThisWeek;
    private int newMembersThisMonth;
    
    // Tỷ lệ sử dụng
    private double occupancyRate;
    private Map<String, Integer> classAttendance;
    
    // Thống kê gói dịch vụ
    private List<Map<String, Object>> topMembershipPackages;
    private List<Map<String, Object>> topPtPackages;
    
    // Thống kê theo thời gian
    private Map<String, Integer> visitorsByHour;
    private Map<String, Integer> visitorsByDay;
}