package com.gym.datn_be.dto.response;

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
public class BookingStatsResponse {
    // Tổng số lượng đặt lịch
    private Long totalBookings;
    
    // Thống kê đặt lịch theo loại
    private Long gymSessionsCount;
    private Long ptSessionsCount;
    private Long classBookingsCount;
    
    // Thống kê đặt lịch theo trạng thái
    private Long pendingCount;
    private Long confirmedCount;
    private Long cancelledCount;
    private Long completedCount;
    private Long noShowCount;
    
    // Thống kê đặt lịch theo ngày
    private Map<String, Long> dailyBookingCounts;
    
    // Thống kê các giờ đặt lịch phổ biến nhất
    private List<TimeSlotStats> popularTimeSlots;
    
    // Thống kê huấn luyện viên có nhiều lịch đặt nhất
    private List<TrainerBookingStats> topTrainers;
    
    // Thống kê lớp học có nhiều lịch đặt nhất
    private List<ClassBookingStats> topClasses;
    
    // Nested classes cho các thống kê chi tiết
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimeSlotStats {
        private String timeSlot;
        private Long bookingsCount;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TrainerBookingStats {
        private Long trainerId;
        private String trainerName;
        private Long bookingsCount;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ClassBookingStats {
        private Long classId;
        private String className;
        private Long bookingsCount;
        private Double fillRate; // Tỉ lệ lấp đầy (%)
    }
}