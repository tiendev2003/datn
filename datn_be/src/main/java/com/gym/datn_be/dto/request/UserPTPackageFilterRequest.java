package com.gym.datn_be.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.gym.datn_be.entity.UserPTPackage.PackageStatus;
import com.gym.datn_be.entity.UserPTPackage.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserPTPackageFilterRequest {
    
    private String keyword; // Tìm kiếm theo tên người dùng, email, SĐT
    private Long packageId; // Lọc theo loại gói PT
    private Long trainerId; // Lọc theo huấn luyện viên
    
    private PackageStatus packageStatus; // Lọc theo tình trạng gói
    private PaymentStatus paymentStatus; // Lọc theo tình trạng thanh toán
    
    private LocalDate registrationDateFrom; // Lọc theo ngày đăng ký (từ ngày)
    private LocalDate registrationDateTo; // Lọc theo ngày đăng ký (đến ngày)
    
    private LocalDate startDateFrom; // Lọc theo ngày bắt đầu (từ ngày)
    private LocalDate startDateTo; // Lọc theo ngày bắt đầu (đến ngày)
    
    private LocalDate endDateFrom; // Lọc theo ngày kết thúc (từ ngày)
    private LocalDate endDateTo; // Lọc theo ngày kết thúc (đến ngày)
    
    private Integer sessionsRemainingMin; // Số buổi tập còn lại tối thiểu
    private Integer sessionsRemainingMax; // Số buổi tập còn lại tối đa
    
    private BigDecimal priceMin; // Giá tối thiểu
    private BigDecimal priceMax; // Giá tối đa
    
    private Boolean expiringSoon; // Sắp hết hạn (trong 7 ngày tới)
    private Boolean hasSessions; // Còn buổi tập
}