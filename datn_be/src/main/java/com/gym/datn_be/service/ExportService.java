package com.gym.datn_be.service;

import java.time.LocalDate;

import org.springframework.core.io.Resource;

public interface ExportService {
    
    /**
     * Xuất báo cáo doanh thu từ gói PT
     * 
     * @param startDate Ngày bắt đầu
     * @param endDate Ngày kết thúc
     * @param format Định dạng xuất (excel, pdf)
     * @return Resource chứa báo cáo
     */
    Resource exportPTRevenueReport(LocalDate startDate, LocalDate endDate, String format);
    
    /**
     * Xuất thông tin về các gói PT
     * 
     * @param format Định dạng xuất (excel, pdf)
     * @return Resource chứa báo cáo
     */
    Resource exportPTPackages(String format);
}