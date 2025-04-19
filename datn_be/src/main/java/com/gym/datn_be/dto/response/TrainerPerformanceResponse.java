package com.gym.datn_be.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrainerPerformanceResponse {
    
    private Long trainerId;
    private String trainerName;
    private String trainerEmail;
    private String trainerSpecialization;
    private String profileImage;
    private BigDecimal hourlyRate;
    
    private LocalDate startDate;
    private LocalDate endDate;
    
    private Integer totalClients;
    private Integer activeClients;
    private Integer totalSessionsScheduled;
    private Integer sessionsCompleted;
    private Integer sessionsCancelled;
    private Integer sessionsNoShow;
    
    private Double completionRate; // Tỷ lệ hoàn thành
    private Double cancellationRate; // Tỷ lệ hủy
    private Double clientRetentionRate; // Tỷ lệ giữ chân khách hàng
    
    private Double averageRating; // Đánh giá trung bình
    private Integer totalReviews; // Số lượng đánh giá
    private Map<Integer, Integer> ratingsDistribution; // Phân phối đánh giá (1-5 sao)
    
    private BigDecimal totalRevenue; // Doanh thu
    private Integer averageSessionsPerClient; // Số buổi trung bình mỗi khách hàng
    private Double averageSessionDuration; // Thời lượng trung bình mỗi buổi
    
    private Map<String, Integer> clientsByPackage; // Số khách hàng theo từng gói PT
    private Map<String, Integer> sessionsByWeekday; // Phân phối buổi tập theo ngày trong tuần
    private Map<String, Integer> sessionsByTimeOfDay; // Phân phối buổi tập theo thời gian trong ngày
}