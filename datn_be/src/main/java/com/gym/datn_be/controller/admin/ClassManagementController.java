package com.gym.datn_be.controller.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.gym.datn_be.dto.request.ClassScheduleCreateRequest;
import com.gym.datn_be.dto.request.ClassScheduleUpdateRequest;
import com.gym.datn_be.dto.request.ClassTypeCreateRequest;
import com.gym.datn_be.dto.request.ClassTypeUpdateRequest;
import com.gym.datn_be.dto.response.ApiResponse;
import com.gym.datn_be.dto.response.ClassBookingResponse;
import com.gym.datn_be.dto.response.ClassScheduleDetailResponse;
import com.gym.datn_be.dto.response.ClassScheduleResponse;
import com.gym.datn_be.dto.response.ClassStatsResponse;
import com.gym.datn_be.dto.response.ClassTypeDetailResponse;
import com.gym.datn_be.dto.response.ClassTypeResponse;
import com.gym.datn_be.service.ClassManagementService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/admin/classes")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class ClassManagementController {

    private final ClassManagementService classManagementService;

    // Quản lý loại lớp tập
    @GetMapping("/types")
    public ResponseEntity<List<ClassTypeResponse>> getAllClassTypes() {
        return ResponseEntity.ok(classManagementService.getAllClassTypes());
    }
    
    @GetMapping("/types/{typeId}")
    public ResponseEntity<ClassTypeDetailResponse> getClassTypeDetails(@PathVariable Long typeId) {
        return ResponseEntity.ok(classManagementService.getClassTypeDetails(typeId));
    }
    
    @PostMapping("/types")
    public ResponseEntity<ClassTypeDetailResponse> createClassType(
            @Valid @RequestBody ClassTypeCreateRequest request) {
        return new ResponseEntity<>(classManagementService.createClassType(request), HttpStatus.CREATED);
    }
    
    @PutMapping("/types/{typeId}")
    public ResponseEntity<ClassTypeDetailResponse> updateClassType(
            @PathVariable Long typeId,
            @Valid @RequestBody ClassTypeUpdateRequest request) {
        return ResponseEntity.ok(classManagementService.updateClassType(typeId, request));
    }
    
    @DeleteMapping("/types/{typeId}")
    public ResponseEntity<ApiResponse> deleteClassType(@PathVariable Long typeId) {
        classManagementService.deleteClassType(typeId);
        return ResponseEntity.ok(new ApiResponse(true, "Loại lớp tập đã được xóa thành công"));
    }
    
    // Quản lý lịch lớp tập
    @GetMapping("/schedules")
    public ResponseEntity<Page<ClassScheduleResponse>> getAllClassSchedules(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long classTypeId,
            @RequestParam(required = false) Long trainerId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            Pageable pageable) {
        return ResponseEntity.ok(classManagementService.getAllClassSchedules(keyword, classTypeId, trainerId, status, startDate, endDate, pageable));
    }
    
    @GetMapping("/schedules/{scheduleId}")
    public ResponseEntity<ClassScheduleDetailResponse> getClassScheduleDetails(@PathVariable Long scheduleId) {
        return ResponseEntity.ok(classManagementService.getClassScheduleDetails(scheduleId));
    }
    
    @PostMapping("/schedules")
    public ResponseEntity<ClassScheduleDetailResponse> createClassSchedule(
            @Valid @RequestBody ClassScheduleCreateRequest request) {
        return new ResponseEntity<>(classManagementService.createClassSchedule(request), HttpStatus.CREATED);
    }
    
    @PutMapping("/schedules/{scheduleId}")
    public ResponseEntity<ClassScheduleDetailResponse> updateClassSchedule(
            @PathVariable Long scheduleId,
            @Valid @RequestBody ClassScheduleUpdateRequest request) {
        return ResponseEntity.ok(classManagementService.updateClassSchedule(scheduleId, request));
    }
    
    @DeleteMapping("/schedules/{scheduleId}")
    public ResponseEntity<ApiResponse> deleteClassSchedule(@PathVariable Long scheduleId) {
        classManagementService.deleteClassSchedule(scheduleId);
        return ResponseEntity.ok(new ApiResponse(true, "Lịch lớp tập đã được xóa thành công"));
    }
    
    @PutMapping("/schedules/{scheduleId}/cancel")
    public ResponseEntity<ApiResponse> cancelClassSchedule(
            @PathVariable Long scheduleId,
            @RequestParam(required = false) String reason) {
        classManagementService.cancelClassSchedule(scheduleId, reason);
        return ResponseEntity.ok(new ApiResponse(true, "Lịch lớp tập đã được hủy thành công"));
    }
    
    @GetMapping("/schedules/{scheduleId}/bookings")
    public ResponseEntity<Page<ClassBookingResponse>> getClassBookings(
            @PathVariable Long scheduleId,
            Pageable pageable) {
        return ResponseEntity.ok(classManagementService.getClassBookings(scheduleId, pageable));
    }
    
    // Thống kê lớp tập
    @GetMapping("/statistics")
    public ResponseEntity<ClassStatsResponse> getClassStatistics(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        return ResponseEntity.ok(classManagementService.getClassStatistics(startDate, endDate));
    }
}