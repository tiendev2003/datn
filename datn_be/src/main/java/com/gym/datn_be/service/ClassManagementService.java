package com.gym.datn_be.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gym.datn_be.dto.request.ClassScheduleCreateRequest;
import com.gym.datn_be.dto.request.ClassScheduleUpdateRequest;
import com.gym.datn_be.dto.request.ClassTypeCreateRequest;
import com.gym.datn_be.dto.request.ClassTypeUpdateRequest;
import com.gym.datn_be.dto.response.ClassBookingResponse;
import com.gym.datn_be.dto.response.ClassScheduleDetailResponse;
import com.gym.datn_be.dto.response.ClassScheduleResponse;
import com.gym.datn_be.dto.response.ClassStatsResponse;
import com.gym.datn_be.dto.response.ClassTypeDetailResponse;
import com.gym.datn_be.dto.response.ClassTypeResponse;

public interface ClassManagementService {
    
    // Quản lý loại lớp tập (ClassType)
    List<ClassTypeResponse> getAllClassTypes();
    
    ClassTypeDetailResponse getClassTypeDetails(Long typeId);
    
    ClassTypeDetailResponse createClassType(ClassTypeCreateRequest request);
    
    ClassTypeDetailResponse updateClassType(Long typeId, ClassTypeUpdateRequest request);
    
    void deleteClassType(Long typeId);
    
    // Quản lý lịch lớp tập (ClassSchedule)
    Page<ClassScheduleResponse> getAllClassSchedules(String keyword, Long classTypeId, 
            Long trainerId, String status, String startDate, String endDate, Pageable pageable);
    
    ClassScheduleDetailResponse getClassScheduleDetails(Long scheduleId);
    
    ClassScheduleDetailResponse createClassSchedule(ClassScheduleCreateRequest request);
    
    ClassScheduleDetailResponse updateClassSchedule(Long scheduleId, ClassScheduleUpdateRequest request);
    
    void deleteClassSchedule(Long scheduleId);
    
    void cancelClassSchedule(Long scheduleId, String reason);
    
    // Quản lý đặt chỗ (ClassBooking)
    Page<ClassBookingResponse> getClassBookings(Long scheduleId, Pageable pageable);
    
    // Thống kê lớp tập
    ClassStatsResponse getClassStatistics(String startDate, String endDate);
}