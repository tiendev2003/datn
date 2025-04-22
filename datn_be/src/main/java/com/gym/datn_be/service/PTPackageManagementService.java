package com.gym.datn_be.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gym.datn_be.dto.request.PTPackageCreateRequest;
import com.gym.datn_be.dto.request.PTPackageUpdateRequest;
import com.gym.datn_be.dto.request.PackageExtensionRequest;
import com.gym.datn_be.dto.request.UserPTPackageFilterRequest;
import com.gym.datn_be.dto.response.PTPackageDetailResponse;
import com.gym.datn_be.dto.response.PTPackageHistoryResponse;
import com.gym.datn_be.dto.response.PTPackageResponse;
import com.gym.datn_be.dto.response.PTPackageStatsResponse;
import com.gym.datn_be.dto.response.PTRevenueReportResponse;
import com.gym.datn_be.dto.response.UserPTPackageResponse;

public interface PTPackageManagementService {
    
    // Quản lý loại gói PT
    List<PTPackageResponse> getAllPTPackages();
    PTPackageDetailResponse getPTPackageDetails(Long packageId);
    PTPackageDetailResponse createPTPackage(PTPackageCreateRequest request);
    PTPackageDetailResponse updatePTPackage(Long packageId, PTPackageUpdateRequest request);
    void deletePTPackage(Long packageId);
    void activatePTPackage(Long packageId);
    void deactivatePTPackage(Long packageId);
    
    // Quản lý đăng ký gói PT của người dùng
    Page<UserPTPackageResponse> getAllUserPTPackages(String keyword, String status, Long trainerId, Long packageTypeId, Pageable pageable);
    UserPTPackageResponse getUserPTPackageDetails(Long userPackageId);
    void cancelUserPTPackage(Long userPackageId, String reason);
    void addSessionsToUserPTPackage(Long userPackageId, Integer sessionsToAdd, String reason);
    void extendUserPTPackage(Long userPackageId, Integer daysToAdd, String reason);
    
    // Thống kê gói PT
    PTPackageStatsResponse getPTPackageStatistics(String startDate, String endDate);
    
    // Báo cáo doanh thu từ gói PT
    List<PTRevenueReportResponse> generateRevenueReport(LocalDate startDate, LocalDate endDate);
    
    // Tìm kiếm nâng cao
    Page<UserPTPackageResponse> searchUserPTPackages(UserPTPackageFilterRequest request, Pageable pageable);
    
    // Lịch sử thay đổi gói PT
    List<PTPackageHistoryResponse> getPTPackageHistory(Long packageId);
    
    // Đề xuất mở rộng gói PT
    Page<PackageExtensionRequest> getExtensionRequests(String status, Pageable pageable);
    void approveExtensionRequest(Long requestId);
    void rejectExtensionRequest(Long requestId, String reason);
    
    // Thông báo gói PT sắp hết hạn
    int notifyExpiringPackages(Integer daysThreshold);
}