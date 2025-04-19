package com.gym.datn_be.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gym.datn_be.dto.request.TrainerCreateRequest;
import com.gym.datn_be.dto.request.TrainerUpdateRequest;
import com.gym.datn_be.dto.response.TrainerDetailResponse;
import com.gym.datn_be.dto.response.TrainerSummaryResponse;

public interface TrainerManagementService {
    
    Page<TrainerSummaryResponse> getAllTrainers(String keyword, String specialization, Boolean isActive, Pageable pageable);
    
    TrainerDetailResponse getTrainerDetails(Long trainerId);
    
    TrainerDetailResponse createTrainer(TrainerCreateRequest request);
    
    TrainerDetailResponse updateTrainer(Long trainerId, TrainerUpdateRequest request);
    
    void deleteTrainer(Long trainerId);
    
    void activateTrainer(Long trainerId);
    
    void deactivateTrainer(Long trainerId);
    
    TrainerDetailResponse.ScheduleInfo getTrainerSchedule(Long trainerId, String startDate, String endDate);
    
    Page<TrainerDetailResponse.TrainerRating> getTrainerRatings(Long trainerId, Pageable pageable);
}