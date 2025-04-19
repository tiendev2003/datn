package com.gym.datn_be.service;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gym.datn_be.dto.response.PTRevenueReportResponse;
import com.gym.datn_be.dto.response.TrainerPerformanceResponse;

public interface ReportService {
    
    /**
     * Tạo báo cáo doanh thu từ gói PT
     * 
     * @param startDate Ngày bắt đầu
     * @param endDate Ngày kết thúc
     * @param packageTypeId ID loại gói PT (null để xem tất cả)
     * @return Báo cáo doanh thu
     */
    PTRevenueReportResponse generatePTRevenueReport(LocalDate startDate, LocalDate endDate, Long packageTypeId);
    
    /**
     * Lấy thông tin hiệu suất của huấn luyện viên
     * 
     * @param startDate Ngày bắt đầu
     * @param endDate Ngày kết thúc
     * @param trainerId ID huấn luyện viên (null để xem tất cả)
     * @param pageable Phân trang
     * @return Danh sách hiệu suất huấn luyện viên
     */
    Page<TrainerPerformanceResponse> getTrainerPerformance(LocalDate startDate, LocalDate endDate, Long trainerId, Pageable pageable);
    
    /**
     * Tạo báo cáo tình trạng gói PT theo các khoảng thời gian
     * 
     * @param startDate Ngày bắt đầu
     * @param endDate Ngày kết thúc
     * @param groupBy Nhóm theo (day, week, month, quarter, year)
     * @return Dữ liệu báo cáo
     */
    Map<String, Object> generatePackageStatusReport(LocalDate startDate, LocalDate endDate, String groupBy);
    
    /**
     * Lấy thông tin thống kê về tỷ lệ gia hạn gói PT
     * 
     * @param startDate Ngày bắt đầu
     * @param endDate Ngày kết thúc
     * @return Dữ liệu thống kê
     */
    Map<String, Object> getRenewalStatistics(LocalDate startDate, LocalDate endDate);
}