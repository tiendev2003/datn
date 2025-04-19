package com.gym.datn_be.controller.admin;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gym.datn_be.dto.request.PTPackageCreateRequest;
import com.gym.datn_be.dto.request.PTPackageUpdateRequest;
import com.gym.datn_be.dto.request.PackageExtensionRequest;
import com.gym.datn_be.dto.request.SessionRescheduleRequest;
import com.gym.datn_be.dto.request.UserPTPackageFilterRequest;
import com.gym.datn_be.dto.response.ApiResponse;
import com.gym.datn_be.dto.response.PTPackageDetailResponse;
import com.gym.datn_be.dto.response.PTPackageHistoryResponse;
import com.gym.datn_be.dto.response.PTPackageResponse;
import com.gym.datn_be.dto.response.PTPackageStatsResponse;
import com.gym.datn_be.dto.response.PTRevenueReportResponse;
import com.gym.datn_be.dto.response.PTSessionResponse;
import com.gym.datn_be.dto.response.TrainerPerformanceResponse;
import com.gym.datn_be.dto.response.UserPTPackageResponse;
import com.gym.datn_be.service.ExportService;
import com.gym.datn_be.service.PTPackageManagementService;
import com.gym.datn_be.service.PTSessionService;
import com.gym.datn_be.service.ReportService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/pt-packages")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class PTPackageManagementController {

    private final PTPackageManagementService ptPackageService;
    private final PTSessionService ptSessionService;
    private final ExportService exportService;
    private final ReportService reportService;

    // Quản lý gói PT
    @GetMapping("/types")
    public ResponseEntity<List<PTPackageResponse>> getAllPTPackages() {
        return ResponseEntity.ok(ptPackageService.getAllPTPackages());
    }
    
    @GetMapping("/types/{packageId}")
    public ResponseEntity<PTPackageDetailResponse> getPTPackageDetails(@PathVariable Long packageId) {
        return ResponseEntity.ok(ptPackageService.getPTPackageDetails(packageId));
    }
    
    @PostMapping("/types")
    public ResponseEntity<PTPackageDetailResponse> createPTPackage(
            @Valid @RequestBody PTPackageCreateRequest request) {
        return new ResponseEntity<>(ptPackageService.createPTPackage(request), HttpStatus.CREATED);
    }
    
    @PutMapping("/types/{packageId}")
    public ResponseEntity<PTPackageDetailResponse> updatePTPackage(
            @PathVariable Long packageId,
            @Valid @RequestBody PTPackageUpdateRequest request) {
        return ResponseEntity.ok(ptPackageService.updatePTPackage(packageId, request));
    }
    
    @DeleteMapping("/types/{packageId}")
    public ResponseEntity<ApiResponse> deletePTPackage(@PathVariable Long packageId) {
        ptPackageService.deletePTPackage(packageId);
        return ResponseEntity.ok(new ApiResponse(true, "Gói PT đã được xóa thành công"));
    }
    
    @PutMapping("/types/{packageId}/activate")
    public ResponseEntity<ApiResponse> activatePTPackage(@PathVariable Long packageId) {
        ptPackageService.activatePTPackage(packageId);
        return ResponseEntity.ok(new ApiResponse(true, "Gói PT đã được kích hoạt"));
    }
    
    @PutMapping("/types/{packageId}/deactivate")
    public ResponseEntity<ApiResponse> deactivatePTPackage(@PathVariable Long packageId) {
        ptPackageService.deactivatePTPackage(packageId);
        return ResponseEntity.ok(new ApiResponse(true, "Gói PT đã bị vô hiệu hóa"));
    }
    
    // Quản lý đăng ký gói PT của người dùng
    @GetMapping
    public ResponseEntity<Page<UserPTPackageResponse>> getAllUserPTPackages(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long trainerId,
            @RequestParam(required = false) Long packageTypeId,
            Pageable pageable) {
        return ResponseEntity.ok(ptPackageService.getAllUserPTPackages(keyword, status, trainerId, packageTypeId, pageable));
    }
    
    @GetMapping("/{userPackageId}")
    public ResponseEntity<UserPTPackageResponse> getUserPTPackageDetails(@PathVariable Long userPackageId) {
        return ResponseEntity.ok(ptPackageService.getUserPTPackageDetails(userPackageId));
    }
    
    @PutMapping("/{userPackageId}/cancel")
    public ResponseEntity<ApiResponse> cancelUserPTPackage(
            @PathVariable Long userPackageId,
            @RequestParam(required = false) String reason) {
        ptPackageService.cancelUserPTPackage(userPackageId, reason);
        return ResponseEntity.ok(new ApiResponse(true, "Gói PT đã được hủy thành công"));
    }
    
    @PutMapping("/{userPackageId}/add-sessions")
    public ResponseEntity<ApiResponse> addSessionsToUserPTPackage(
            @PathVariable Long userPackageId,
            @RequestParam Integer sessionsToAdd,
            @RequestParam(required = false) String reason) {
        ptPackageService.addSessionsToUserPTPackage(userPackageId, sessionsToAdd, reason);
        return ResponseEntity.ok(new ApiResponse(true, "Đã thêm buổi tập thành công"));
    }
    
    @PutMapping("/{userPackageId}/extend")
    public ResponseEntity<ApiResponse> extendUserPTPackage(
            @PathVariable Long userPackageId,
            @RequestParam Integer daysToAdd,
            @RequestParam(required = false) String reason) {
        ptPackageService.extendUserPTPackage(userPackageId, daysToAdd, reason);
        return ResponseEntity.ok(new ApiResponse(true, "Đã gia hạn gói PT thành công"));
    }
    
    // Thống kê gói PT
    @GetMapping("/statistics")
    public ResponseEntity<PTPackageStatsResponse> getPTPackageStatistics(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        return ResponseEntity.ok(ptPackageService.getPTPackageStatistics(startDate, endDate));
    }
    
    // Báo cáo doanh thu gói PT
    @GetMapping("/revenue-report")
    public ResponseEntity<PTRevenueReportResponse> getPTRevenueReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Long packageTypeId) {
        return ResponseEntity.ok(reportService.generatePTRevenueReport(startDate, endDate, packageTypeId));
    }
    
    // Báo cáo hiệu suất huấn luyện viên
    @GetMapping("/trainer-performance")
    public ResponseEntity<Page<TrainerPerformanceResponse>> getTrainerPerformance(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Long trainerId,
            Pageable pageable) {
        return ResponseEntity.ok(reportService.getTrainerPerformance(startDate, endDate, trainerId, pageable));
    }
    
    // Quản lý buổi tập PT
    @GetMapping("/sessions")
    public ResponseEntity<Page<PTSessionResponse>> getPTSessions(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) Long trainerId,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String status,
            Pageable pageable) {
        return ResponseEntity.ok(ptSessionService.getPTSessions(date, trainerId, userId, status, pageable));
    }
    
    @GetMapping("/sessions/{sessionId}")
    public ResponseEntity<PTSessionResponse> getPTSessionDetail(@PathVariable Long sessionId) {
        return ResponseEntity.ok(ptSessionService.getPTSessionDetail(sessionId));
    }
    
    @PutMapping("/sessions/{sessionId}/cancel")
    public ResponseEntity<ApiResponse> cancelPTSession(
            @PathVariable Long sessionId,
            @RequestParam(required = false) String reason) {
        ptSessionService.cancelPTSession(sessionId, reason);
        return ResponseEntity.ok(new ApiResponse(true, "Buổi tập đã được hủy thành công"));
    }
    
    @PutMapping("/sessions/{sessionId}/complete")
    public ResponseEntity<ApiResponse> completePTSession(
            @PathVariable Long sessionId,
            @RequestParam(required = false) String notes) {
        ptSessionService.completePTSession(sessionId, notes);
        return ResponseEntity.ok(new ApiResponse(true, "Buổi tập đã được đánh dấu hoàn thành"));
    }
    
    @PutMapping("/sessions/{sessionId}/reschedule")
    public ResponseEntity<ApiResponse> reschedulePTSession(
            @PathVariable Long sessionId,
            @Valid @RequestBody SessionRescheduleRequest request) {
        ptSessionService.reschedulePTSession(sessionId, request);
        return ResponseEntity.ok(new ApiResponse(true, "Buổi tập đã được lên lịch lại thành công"));
    }
    
    // Xuất báo cáo
    @GetMapping("/export/revenue")
    public ResponseEntity<Resource> exportRevenueReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(defaultValue = "excel") String format) {
        Resource resource = exportService.exportPTRevenueReport(startDate, endDate, format);
        
        String contentType;
        String filename;
        
        if ("pdf".equalsIgnoreCase(format)) {
            contentType = MediaType.APPLICATION_PDF_VALUE;
            filename = "pt_revenue_report.pdf";
        } else {
            contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            filename = "pt_revenue_report.xlsx";
        }
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .body(resource);
    }
    
    @GetMapping("/export/packages")
    public ResponseEntity<Resource> exportPackagesData(
            @RequestParam(defaultValue = "excel") String format) {
        Resource resource = exportService.exportPTPackages(format);
        
        String contentType;
        String filename;
        
        if ("pdf".equalsIgnoreCase(format)) {
            contentType = MediaType.APPLICATION_PDF_VALUE;
            filename = "pt_packages.pdf";
        } else {
            contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            filename = "pt_packages.xlsx";
        }
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .body(resource);
    }
    
    // Tìm kiếm nâng cao
    @PostMapping("/search")
    public ResponseEntity<Page<UserPTPackageResponse>> searchUserPTPackages(
            @RequestBody UserPTPackageFilterRequest request,
            Pageable pageable) {
        return ResponseEntity.ok(ptPackageService.searchUserPTPackages(request, pageable));
    }
    
    // Lịch sử thay đổi của gói PT
    @GetMapping("/types/{packageId}/history")
    public ResponseEntity<List<PTPackageHistoryResponse>> getPTPackageHistory(
            @PathVariable Long packageId) {
        return ResponseEntity.ok(ptPackageService.getPTPackageHistory(packageId));
    }
    
    // Kiểm tra tình trạng của gói PT theo tháng/quý/năm
    @GetMapping("/status-report")
    public ResponseEntity<Map<String, Object>> getPackageStatusReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(defaultValue = "month") String groupBy) {
        return ResponseEntity.ok(reportService.generatePackageStatusReport(startDate, endDate, groupBy));
    }
    
    // Quản lý đề xuất mở rộng gói PT
    @GetMapping("/extension-requests")
    public ResponseEntity<Page<PackageExtensionRequest>> getExtensionRequests(
            @RequestParam(required = false) String status,
            Pageable pageable) {
        return ResponseEntity.ok(ptPackageService.getExtensionRequests(status, pageable));
    }
    
    @PutMapping("/extension-requests/{requestId}/approve")
    public ResponseEntity<ApiResponse> approveExtensionRequest(
            @PathVariable Long requestId) {
        ptPackageService.approveExtensionRequest(requestId);
        return ResponseEntity.ok(new ApiResponse(true, "Đề xuất mở rộng đã được phê duyệt"));
    }
    
    @PutMapping("/extension-requests/{requestId}/reject")
    public ResponseEntity<ApiResponse> rejectExtensionRequest(
            @PathVariable Long requestId,
            @RequestParam String reason) {
        ptPackageService.rejectExtensionRequest(requestId, reason);
        return ResponseEntity.ok(new ApiResponse(true, "Đề xuất mở rộng đã bị từ chối"));
    }
    
    // Gửi thông báo đến người dùng về sắp hết hạn gói PT
    @PostMapping("/notify-expiring")
    public ResponseEntity<ApiResponse> notifyExpiringPackages(
            @RequestParam(defaultValue = "7") Integer daysThreshold) {
        int notified = ptPackageService.notifyExpiringPackages(daysThreshold);
        return ResponseEntity.ok(new ApiResponse(true, 
                String.format("Đã gửi %d thông báo đến người dùng có gói PT sắp hết hạn", notified)));
    }
    
    // Thống kê tỷ lệ gia hạn gói PT
    @GetMapping("/renewal-stats")
    public ResponseEntity<Map<String, Object>> getRenewalStatistics(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(reportService.getRenewalStatistics(startDate, endDate));
    }
}