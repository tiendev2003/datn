package com.gym.datn_be.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gym.datn_be.dto.response.DashboardStatsResponse;
import com.gym.datn_be.repository.BookingRepository;
import com.gym.datn_be.repository.SystemMetricRepository;
import com.gym.datn_be.repository.UserActivityMetricRepository;
import com.gym.datn_be.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminDashboardService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final SystemMetricRepository systemMetricRepository;
    private final UserActivityMetricRepository userActivityMetricRepository;
    
    public DashboardStatsResponse getDashboardStatistics() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfToday = LocalDateTime.of(today, LocalTime.MIN);
        LocalDateTime endOfToday = LocalDateTime.of(today, LocalTime.MAX);
        
        LocalDate startOfWeek = today.minusDays(today.getDayOfWeek().getValue() - 1);
        LocalDateTime startOfWeekTime = LocalDateTime.of(startOfWeek, LocalTime.MIN);
        
        LocalDate startOfMonth = today.withDayOfMonth(1);
        LocalDateTime startOfMonthTime = LocalDateTime.of(startOfMonth, LocalTime.MIN);

        // Thống kê tổng quan
        long totalUsers = userRepository.count();
        long activeMembers = userRepository.countActiveMembers();
        long totalTrainers = userRepository.countTrainers();
        long totalBookings = bookingRepository.count();
        
        // Thống kê tài chính (lấy từ metrics của 30 ngày trước)
        LocalDate thirtyDaysAgo = today.minusDays(30);
        BigDecimal totalRevenue = sumRevenueFromMetrics();
        BigDecimal membershipRevenue = sumMembershipRevenueFromMetrics();
        BigDecimal ptPackageRevenue = sumPtPackageRevenueFromMetrics();
        BigDecimal otherRevenue = totalRevenue.subtract(membershipRevenue).subtract(ptPackageRevenue);
        
        // Thống kê hoạt động ngày hôm nay
        int todayVisitors = countTodayVisitors();
        int todayBookings = (int) bookingRepository.countBookingsBetween(startOfToday, endOfToday);
        int todayClasses = (int) bookingRepository.countClassBookingsBetween(startOfToday, endOfToday);
        
        // Thống kê thành viên mới
        int newMembersToday = (int) userRepository.countUsersCreatedAfter(startOfToday);
        int newMembersThisWeek = (int) userRepository.countUsersCreatedAfter(startOfWeekTime);
        int newMembersThisMonth = (int) userRepository.countUsersCreatedAfter(startOfMonthTime);
        
        // Thống kê theo thời gian
        Map<String, Integer> visitorsByDay = getVisitorsByDayOfWeek();
        Map<String, Integer> visitorsByHour = getVisitorsByHourOfDay();
        
        // Tạo response
        return DashboardStatsResponse.builder()
                .totalUsers(totalUsers)
                .activeMembers(activeMembers)
                .totalTrainers(totalTrainers)
                .totalBookings(totalBookings)
                .totalRevenue(totalRevenue)
                .membershipRevenue(membershipRevenue)
                .ptPackageRevenue(ptPackageRevenue)
                .otherRevenue(otherRevenue)
                .todayVisitors(todayVisitors)
                .todayBookings(todayBookings)
                .todayClasses(todayClasses)
                .newMembersToday(newMembersToday)
                .newMembersThisWeek(newMembersThisWeek)
                .newMembersThisMonth(newMembersThisMonth)
                .occupancyRate(calculateOccupancyRate())
                .visitorsByDay(visitorsByDay)
                .visitorsByHour(visitorsByHour)
                .build();
    }
    
    private BigDecimal sumRevenueFromMetrics() {
        LocalDate today = LocalDate.now();
        LocalDate thirtyDaysAgo = today.minusDays(30);
        
        return systemMetricRepository.sumTotalRevenueBetween(thirtyDaysAgo, today)
                .map(BigDecimal::valueOf)
                .orElse(BigDecimal.ZERO);
    }
    
    private BigDecimal sumMembershipRevenueFromMetrics() {
        LocalDate today = LocalDate.now();
        LocalDate thirtyDaysAgo = today.minusDays(30);
        
        return systemMetricRepository.sumMembershipSalesBetween(thirtyDaysAgo, today)
                .map(BigDecimal::valueOf)
                .orElse(BigDecimal.ZERO);
    }
    
    private BigDecimal sumPtPackageRevenueFromMetrics() {
        LocalDate today = LocalDate.now();
        LocalDate thirtyDaysAgo = today.minusDays(30);
        
        return systemMetricRepository.sumPtPackageSalesBetween(thirtyDaysAgo, today)
                .map(BigDecimal::valueOf)
                .orElse(BigDecimal.ZERO);
    }
    
    private int countTodayVisitors() {
        LocalDate today = LocalDate.now();
        return userActivityMetricRepository.sumVisitCountByDate(today) != null ?
                userActivityMetricRepository.sumVisitCountByDate(today) : 0;
    }
    
    private double calculateOccupancyRate() {
        // Giả sử có trung bình 100 người có thể sử dụng cơ sở vật chất mỗi ngày
        int capacity = 100;
        int todayVisitors = countTodayVisitors();
        
        return Math.min(100.0, (double) todayVisitors / capacity * 100.0);
    }
    
    private Map<String, Integer> getVisitorsByDayOfWeek() {
        LocalDate today = LocalDate.now();
        LocalDate sevenDaysAgo = today.minusDays(6);
        
        // Get raw data from repository
        List<Object[]> rawData = userActivityMetricRepository.getVisitCountByDateRange(sevenDaysAgo, today);
        
        // Khởi tạo map với các ngày trong tuần
        Map<String, Integer> visitorsByDay = new LinkedHashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM");
        
        // Điền dữ liệu cho 7 ngày gần đây
        for (int i = 6; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            visitorsByDay.put(date.format(formatter), 0);
        }
        
        // Điền dữ liệu từ cơ sở dữ liệu
        if (rawData != null) {
            for (Object[] row : rawData) {
                LocalDate date = (LocalDate) row[0];
                Long count = (Long) row[1];
                visitorsByDay.put(date.format(formatter), count.intValue());
            }
        }
        
        return visitorsByDay;
    }
    
    private Map<String, Integer> getVisitorsByHourOfDay() {
        // Giả lập dữ liệu (trong thực tế, bạn sẽ lấy dữ liệu này từ database)
        Map<String, Integer> visitorsByHour = new HashMap<>();
        
        visitorsByHour.put("6-8", 15);
        visitorsByHour.put("8-10", 25);
        visitorsByHour.put("10-12", 20);
        visitorsByHour.put("12-14", 15);
        visitorsByHour.put("14-16", 20);
        visitorsByHour.put("16-18", 35);
        visitorsByHour.put("18-20", 45);
        visitorsByHour.put("20-22", 30);
        
        return visitorsByHour;
    }
}