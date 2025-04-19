package com.gym.datn_be.controller.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.gym.datn_be.dto.request.TrainerCreateRequest;
import com.gym.datn_be.dto.request.TrainerUpdateRequest;
import com.gym.datn_be.dto.response.ApiResponse;
import com.gym.datn_be.dto.response.TrainerDetailResponse;
import com.gym.datn_be.dto.response.TrainerSummaryResponse;
import com.gym.datn_be.service.TrainerManagementService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/trainers")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class TrainerManagementController {

    private final TrainerManagementService trainerManagementService;

    @GetMapping
    public ResponseEntity<Page<TrainerSummaryResponse>> getAllTrainers(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false) Boolean isActive,
            Pageable pageable) {
        return ResponseEntity.ok(trainerManagementService.getAllTrainers(keyword, specialization, isActive, pageable));
    }
    
    @GetMapping("/{trainerId}")
    public ResponseEntity<TrainerDetailResponse> getTrainerDetails(@PathVariable Long trainerId) {
        return ResponseEntity.ok(trainerManagementService.getTrainerDetails(trainerId));
    }
    
    @PostMapping
    public ResponseEntity<TrainerDetailResponse> createTrainer(@Valid @RequestBody TrainerCreateRequest request) {
        return new ResponseEntity<>(trainerManagementService.createTrainer(request), HttpStatus.CREATED);
    }
    
    @PutMapping("/{trainerId}")
    public ResponseEntity<TrainerDetailResponse> updateTrainer(
            @PathVariable Long trainerId,
            @Valid @RequestBody TrainerUpdateRequest request) {
        return ResponseEntity.ok(trainerManagementService.updateTrainer(trainerId, request));
    }
    
    @DeleteMapping("/{trainerId}")
    public ResponseEntity<ApiResponse> deleteTrainer(@PathVariable Long trainerId) {
        trainerManagementService.deleteTrainer(trainerId);
        return ResponseEntity.ok(new ApiResponse(true, "Huấn luyện viên đã được xóa thành công"));
    }
    
    @PutMapping("/{trainerId}/activate")
    public ResponseEntity<ApiResponse> activateTrainer(@PathVariable Long trainerId) {
        trainerManagementService.activateTrainer(trainerId);
        return ResponseEntity.ok(new ApiResponse(true, "Huấn luyện viên đã được kích hoạt thành công"));
    }
    
    @PutMapping("/{trainerId}/deactivate")
    public ResponseEntity<ApiResponse> deactivateTrainer(@PathVariable Long trainerId) {
        trainerManagementService.deactivateTrainer(trainerId);
        return ResponseEntity.ok(new ApiResponse(true, "Huấn luyện viên đã bị vô hiệu hóa thành công"));
    }
    
    @GetMapping("/{trainerId}/schedule")
    public ResponseEntity<TrainerDetailResponse.ScheduleInfo> getTrainerSchedule(
            @PathVariable Long trainerId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        return ResponseEntity.ok(trainerManagementService.getTrainerSchedule(trainerId, startDate, endDate));
    }
    
    @GetMapping("/{trainerId}/ratings")
    public ResponseEntity<Page<TrainerDetailResponse.TrainerRating>> getTrainerRatings(
            @PathVariable Long trainerId,
            Pageable pageable) {
        return ResponseEntity.ok(trainerManagementService.getTrainerRatings(trainerId, pageable));
    }
}