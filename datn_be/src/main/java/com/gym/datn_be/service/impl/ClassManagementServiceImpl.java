package com.gym.datn_be.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import com.gym.datn_be.entity.ClassBooking;
import com.gym.datn_be.entity.ClassSchedule;
import com.gym.datn_be.entity.ClassType;
import com.gym.datn_be.entity.TrainerProfile;
import com.gym.datn_be.exception.ResourceNotFoundException;
import com.gym.datn_be.repository.ClassBookingRepository;
import com.gym.datn_be.repository.ClassScheduleRepository;
import com.gym.datn_be.repository.ClassTypeRepository;
import com.gym.datn_be.repository.TrainerRepository;
import com.gym.datn_be.service.ClassManagementService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClassManagementServiceImpl implements ClassManagementService {

    private final ClassTypeRepository classTypeRepository;
    private final ClassScheduleRepository classScheduleRepository;
    private final ClassBookingRepository classBookingRepository;
    private final TrainerRepository trainerRepository;
    private final ModelMapper modelMapper;

    // Quản lý loại lớp tập (ClassType)
    @Override
    public List<ClassTypeResponse> getAllClassTypes() {
        return classTypeRepository.findAll().stream()
                .map(classType -> modelMapper.map(classType, ClassTypeResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public ClassTypeDetailResponse getClassTypeDetails(Long typeId) {
        ClassType classType = classTypeRepository.findById(typeId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy loại lớp tập với ID: " + typeId));
        return modelMapper.map(classType, ClassTypeDetailResponse.class);
    }

    @Override
    @Transactional
    public ClassTypeDetailResponse createClassType(ClassTypeCreateRequest request) {
        ClassType classType = new ClassType();
        classType.setTypeName(request.getTypeName());
        classType.setDescription(request.getDescription());
        classType.setDurationMinutes(request.getDurationMinutes());
        classType.setMaxCapacity(request.getMaxCapacity());
        classType.setIntensity(request.getIntensity());
        classType.setImageUrl(request.getImageUrl());
        // Fix: Using setIsActive instead of setActive to match Lombok's generated method
        classType.setIsActive(true);
        classType.setCreatedAt(LocalDateTime.now());
        
        ClassType savedClassType = classTypeRepository.save(classType);
        return modelMapper.map(savedClassType, ClassTypeDetailResponse.class);
    }

    @Override
    @Transactional
    public ClassTypeDetailResponse updateClassType(Long typeId, ClassTypeUpdateRequest request) {
        ClassType existingClassType = classTypeRepository.findById(typeId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy loại lớp tập với ID: " + typeId));

        existingClassType.setTypeName(request.getTypeName());
        existingClassType.setDescription(request.getDescription());
        existingClassType.setDurationMinutes(request.getDurationMinutes());
        existingClassType.setMaxCapacity(request.getMaxCapacity());
        existingClassType.setIntensity(request.getIntensity());
        existingClassType.setImageUrl(request.getImageUrl());
        
        if (request.getIsActive() != null) {
            // Fix: Using setIsActive instead of setActive to match Lombok's generated method
            existingClassType.setIsActive(request.getIsActive());
        }
        
        existingClassType.setUpdatedAt(LocalDateTime.now());

        ClassType updatedClassType = classTypeRepository.save(existingClassType);
        return modelMapper.map(updatedClassType, ClassTypeDetailResponse.class);
    }

    @Override
    @Transactional
    public void deleteClassType(Long typeId) {
        ClassType classType = classTypeRepository.findById(typeId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy loại lớp tập với ID: " + typeId));
        // Consider soft delete: classType.setIsActive(false);
        // classTypeRepository.save(classType);
        // Or check dependencies before hard delete
        classTypeRepository.delete(classType);
    }

    // Quản lý lịch lớp tập (ClassSchedule)
    @Override
    public Page<ClassScheduleResponse> getAllClassSchedules(String keyword, Long classTypeId,
            Long trainerId, String status, String startDate, String endDate, Pageable pageable) {
        // Implement filtering logic using Specifications or custom query in repository
        // For simplicity, returning all for now, needs refinement
        Page<ClassSchedule> classSchedules = classScheduleRepository.findAll(pageable); // Placeholder
        return classSchedules.map(schedule -> modelMapper.map(schedule, ClassScheduleResponse.class));
        // TODO: Implement proper filtering based on parameters
    }

    @Override
    public ClassScheduleDetailResponse getClassScheduleDetails(Long scheduleId) {
        ClassSchedule classSchedule = classScheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch lớp tập với ID: " + scheduleId));
        return modelMapper.map(classSchedule, ClassScheduleDetailResponse.class);
    }

    @Override
    @Transactional
    public ClassScheduleDetailResponse createClassSchedule(ClassScheduleCreateRequest request) {
        ClassType classType = classTypeRepository.findById(request.getClassTypeId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy loại lớp tập với ID: " + request.getClassTypeId()));
        TrainerProfile trainer = trainerRepository.findById(request.getTrainerId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy huấn luyện viên với ID: " + request.getTrainerId()));

        ClassSchedule classSchedule = modelMapper.map(request, ClassSchedule.class);
        classSchedule.setClassType(classType);
        classSchedule.setTrainerProfile(trainer);
        classSchedule.setStatus("SCHEDULED"); // Default status
        classSchedule.setCreatedAt(LocalDateTime.now());
        // Combine date and time
        LocalDate date = LocalDate.parse(request.getDate(), DateTimeFormatter.ISO_DATE);
        LocalTime startTime = LocalTime.parse(request.getStartTime(), DateTimeFormatter.ISO_TIME);
        LocalTime endTime = LocalTime.parse(request.getEndTime(), DateTimeFormatter.ISO_TIME);
        classSchedule.setStartTime(LocalDateTime.of(date, startTime));
        classSchedule.setEndTime(LocalDateTime.of(date, endTime));

        ClassSchedule savedSchedule = classScheduleRepository.save(classSchedule);
        return modelMapper.map(savedSchedule, ClassScheduleDetailResponse.class);
    }

    @Override
    @Transactional
    public ClassScheduleDetailResponse updateClassSchedule(Long scheduleId, ClassScheduleUpdateRequest request) {
        ClassSchedule existingSchedule = classScheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch lớp tập với ID: " + scheduleId));

        // Update fields from request
        modelMapper.map(request, existingSchedule);
        existingSchedule.setClassScheduleId(scheduleId); // Ensure ID is not overwritten

        // Update related entities if changed
        if (request.getClassTypeId() != null
                && !request.getClassTypeId().equals(existingSchedule.getClassType().getClassTypeId())) {
            ClassType classType = classTypeRepository.findById(request.getClassTypeId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Không tìm thấy loại lớp tập với ID: " + request.getClassTypeId()));
            existingSchedule.setClassType(classType);
        }
        if (request.getTrainerId() != null
                && !request.getTrainerId().equals(existingSchedule.getTrainerProfile().getTrainerProfileId())) {
            TrainerProfile trainer = trainerRepository.findById(request.getTrainerId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Không tìm thấy huấn luyện viên với ID: " + request.getTrainerId()));
            existingSchedule.setTrainerProfile(trainer);
        }

        // Combine date and time if changed
        if (request.getDate() != null || request.getStartTime() != null) {
            LocalDate date = (request.getDate() != null)
                    ? LocalDate.parse(request.getDate(), DateTimeFormatter.ISO_DATE)
                    : existingSchedule.getStartTime().toLocalDate();
            LocalTime startTime = (request.getStartTime() != null)
                    ? LocalTime.parse(request.getStartTime(), DateTimeFormatter.ISO_TIME)
                    : existingSchedule.getStartTime().toLocalTime();
            existingSchedule.setStartTime(LocalDateTime.of(date, startTime));
        }
        if (request.getDate() != null || request.getEndTime() != null) {
            LocalDate date = (request.getDate() != null)
                    ? LocalDate.parse(request.getDate(), DateTimeFormatter.ISO_DATE)
                    : existingSchedule.getEndTime().toLocalDate();
            LocalTime endTime = (request.getEndTime() != null)
                    ? LocalTime.parse(request.getEndTime(), DateTimeFormatter.ISO_TIME)
                    : existingSchedule.getEndTime().toLocalTime();
            existingSchedule.setEndTime(LocalDateTime.of(date, endTime));
        }

        ClassSchedule updatedSchedule = classScheduleRepository.save(existingSchedule);
        return modelMapper.map(updatedSchedule, ClassScheduleDetailResponse.class);
    }

    @Override
    @Transactional
    public void deleteClassSchedule(Long scheduleId) {
        ClassSchedule classSchedule = classScheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch lớp tập với ID: " + scheduleId));
        // Consider soft delete or checking bookings before hard delete
        classScheduleRepository.delete(classSchedule);
    }

    @Override
    @Transactional
    public void cancelClassSchedule(Long scheduleId, String reason) {
        ClassSchedule classSchedule = classScheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch lớp tập với ID: " + scheduleId));

        if (!"SCHEDULED".equals(classSchedule.getStatus()) && !"ONGOING".equals(classSchedule.getStatus())) {
            throw new IllegalStateException("Chỉ có thể hủy lớp học có trạng thái 'SCHEDULED' hoặc 'ONGOING'.");
        }

        classSchedule.setStatus("CANCELLED");
        classSchedule.setCancellationReason(reason);
        classScheduleRepository.save(classSchedule);
        // TODO: Add logic to notify booked users
    }

    // Quản lý đặt chỗ (ClassBooking)
    @Override
    public Page<ClassBookingResponse> getClassBookings(Long scheduleId, Pageable pageable) {
        ClassSchedule classSchedule = classScheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch lớp tập với ID: " + scheduleId));
        Page<ClassBooking> bookings = classBookingRepository.findByClassSchedule(classSchedule, pageable);
        return bookings.map(booking -> modelMapper.map(booking, ClassBookingResponse.class));
    }

    // Thống kê lớp tập
    @Override
    public ClassStatsResponse getClassStatistics(String startDate, String endDate) {
        // TODO: Implement logic to query and aggregate statistics based on dates
        // Example: Count total classes, completed classes, cancelled classes, total
        // bookings etc.
        // within the date range using custom repository queries.
        return new ClassStatsResponse(); // Placeholder
    }
}
