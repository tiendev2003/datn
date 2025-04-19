package com.gym.datn_be.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.dto.request.TrainerCreateRequest;
import com.gym.datn_be.dto.request.TrainerUpdateRequest;
import com.gym.datn_be.dto.response.TrainerDetailResponse;
import com.gym.datn_be.dto.response.TrainerSummaryResponse;
import com.gym.datn_be.entity.Booking;
import com.gym.datn_be.entity.Role;
import com.gym.datn_be.entity.TrainerAvailability;
import com.gym.datn_be.entity.TrainerAvailability.DayOfWeek;
import com.gym.datn_be.entity.TrainerProfile;
import com.gym.datn_be.entity.TrainerRating;
import com.gym.datn_be.entity.TrainerUnavailability;
import com.gym.datn_be.entity.User;
import com.gym.datn_be.exception.ResourceNotFoundException;
import com.gym.datn_be.repository.BookingRepository;
import com.gym.datn_be.repository.RoleRepository;
import com.gym.datn_be.repository.TrainerAvailabilityRepository;
import com.gym.datn_be.repository.TrainerRatingRepository;
import com.gym.datn_be.repository.TrainerRepository;
import com.gym.datn_be.repository.TrainerUnavailabilityRepository;
import com.gym.datn_be.repository.UserRepository;
import com.gym.datn_be.service.TrainerManagementService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TrainerManagementServiceImpl implements TrainerManagementService {

    private final TrainerRepository trainerRepository;
    private final TrainerRatingRepository trainerRatingRepository;
    private final TrainerAvailabilityRepository trainerAvailabilityRepository;
    private final TrainerUnavailabilityRepository trainerUnavailabilityRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Page<TrainerSummaryResponse> getAllTrainers(String keyword, String specialization, Boolean isActive, Pageable pageable) {
        Page<TrainerProfile> trainersPage = trainerRepository.findTrainers(keyword, specialization, isActive, pageable);
        
        List<TrainerSummaryResponse> trainerResponses = trainersPage.getContent().stream()
                .map(this::convertToTrainerSummaryResponse)
                .collect(Collectors.toList());
        
        return new PageImpl<>(trainerResponses, pageable, trainersPage.getTotalElements());
    }

    @Override
    public TrainerDetailResponse getTrainerDetails(Long trainerId) {
        TrainerProfile trainer = trainerRepository.findById(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy huấn luyện viên với ID: " + trainerId));
        
        return convertToTrainerDetailResponse(trainer);
    }

    @Override
    @Transactional
    public TrainerDetailResponse createTrainer(TrainerCreateRequest request) {
        // Tạo tài khoản user
        User user = new User();
        user.setName(request.getFirstName() + " " + request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhone());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setGender(User.Gender.valueOf(request.getGender()));
        user.setProfileImage(request.getProfileImage());
        
        // Tạo mật khẩu ngẫu nhiên và gửi email
        String tempPassword = generateRandomPassword();
        user.setPasswordHash(passwordEncoder.encode(tempPassword));
        
        // Thêm role TRAINER cho user
        Role trainerRole = roleRepository.findByRoleName("ROLE_TRAINER")
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy role TRAINER"));
        user.getRoles().add(trainerRole);
        
        User savedUser = userRepository.save(user);
        
        // Tạo profile huấn luyện viên
        TrainerProfile trainerProfile = new TrainerProfile();
        trainerProfile.setUser(savedUser);
        trainerProfile.setSpecialization(request.getSpecialization());
        trainerProfile.setCertification(String.join(", ", request.getCertifications()));
        trainerProfile.setExperienceYears(request.getExperienceYears());
        trainerProfile.setBiography(request.getBio());
        trainerProfile.setHourlyRate(BigDecimal.valueOf(request.getHourlyRate()));
        trainerProfile.setProfileImage(request.getProfileImage());
        trainerProfile.setActive(true);
        trainerProfile.setCreatedAt(LocalDateTime.now());
        trainerProfile.setUpdatedAt(LocalDateTime.now());
        
        TrainerProfile savedTrainer = trainerRepository.save(trainerProfile);
        
        // Xử lý lịch trình sẵn sàng của huấn luyện viên
        if (request.getAvailabilities() != null && !request.getAvailabilities().isEmpty()) {
            for (TrainerCreateRequest.AvailabilityRequest availabilityRequest : request.getAvailabilities()) {
                TrainerAvailability availability = new TrainerAvailability();
                availability.setTrainer(savedTrainer);
                availability.setDayOfWeek(convertToDayOfWeek(availabilityRequest.getDayOfWeek()));
                availability.setStartTime(LocalTime.parse(availabilityRequest.getStartTime()));
                availability.setEndTime(LocalTime.parse(availabilityRequest.getEndTime()));
                availability.setAvailable(true);
                trainerAvailabilityRepository.save(availability);
            }
        }
        
        // TODO: Gửi email thông báo tài khoản được tạo với mật khẩu tạm thời
        // emailService.sendTrainerAccountCreatedEmail(savedUser.getEmail(), tempPassword);
        
        return convertToTrainerDetailResponse(savedTrainer);
    }

    @Override
    @Transactional
    public TrainerDetailResponse updateTrainer(Long trainerId, TrainerUpdateRequest request) {
        TrainerProfile trainer = trainerRepository.findById(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy huấn luyện viên với ID: " + trainerId));
        
        User user = trainer.getUser();
        
        // Cập nhật thông tin user
        if (request.getFirstName() != null && request.getLastName() != null) {
            user.setName(request.getFirstName() + " " + request.getLastName());
        }
        if (request.getEmail() != null) user.setEmail(request.getEmail());
        if (request.getPhone() != null) user.setPhoneNumber(request.getPhone());
        if (request.getDateOfBirth() != null) user.setDateOfBirth(request.getDateOfBirth());
        if (request.getGender() != null) user.setGender(User.Gender.valueOf(request.getGender()));
        if (request.getProfileImage() != null) user.setProfileImage(request.getProfileImage());
        
        userRepository.save(user);
        
        // Cập nhật thông tin huấn luyện viên
        if (request.getSpecialization() != null) trainer.setSpecialization(request.getSpecialization());
        if (request.getCertifications() != null) trainer.setCertification(String.join(", ", request.getCertifications()));
        if (request.getExperienceYears() != null) trainer.setExperienceYears(request.getExperienceYears());
        if (request.getBio() != null) trainer.setBiography(request.getBio());
        if (request.getHourlyRate() != null) trainer.setHourlyRate(BigDecimal.valueOf(request.getHourlyRate()));
        if (request.getProfileImage() != null) trainer.setProfileImage(request.getProfileImage());
        
        trainer.setUpdatedAt(LocalDateTime.now());
        
        TrainerProfile updatedTrainer = trainerRepository.save(trainer);
        
        // Cập nhật lịch trình sẵn sàng của huấn luyện viên
        if (request.getAvailabilities() != null) {
            // Xóa tất cả lịch trình hiện tại
            trainerAvailabilityRepository.deleteByTrainerId(trainer.getTrainerId());
            
            // Thêm lịch trình mới
            for (TrainerUpdateRequest.AvailabilityRequest availabilityRequest : request.getAvailabilities()) {
                TrainerAvailability availability = new TrainerAvailability();
                availability.setTrainer(updatedTrainer);
                availability.setDayOfWeek(convertToDayOfWeek(availabilityRequest.getDayOfWeek()));
                availability.setStartTime(LocalTime.parse(availabilityRequest.getStartTime()));
                availability.setEndTime(LocalTime.parse(availabilityRequest.getEndTime()));
                availability.setAvailable(true);
                trainerAvailabilityRepository.save(availability);
            }
        }
        
        return convertToTrainerDetailResponse(updatedTrainer);
    }

    @Override
    @Transactional
    public void deleteTrainer(Long trainerId) {
        TrainerProfile trainer = trainerRepository.findById(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy huấn luyện viên với ID: " + trainerId));
        
        User user = trainer.getUser();
        user.setDeleted(true);
        user.setDeletionDate(LocalDateTime.now());
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void activateTrainer(Long trainerId) {
        TrainerProfile trainer = trainerRepository.findById(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy huấn luyện viên với ID: " + trainerId));
        
        trainer.setActive(true);
        trainerRepository.save(trainer);
        
        User user = trainer.getUser();
        user.setActive(true);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deactivateTrainer(Long trainerId) {
        TrainerProfile trainer = trainerRepository.findById(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy huấn luyện viên với ID: " + trainerId));
        
        trainer.setActive(false);
        trainerRepository.save(trainer);
        
        User user = trainer.getUser();
        user.setActive(false);
        userRepository.save(user);
    }

    @Override
    public TrainerDetailResponse.ScheduleInfo getTrainerSchedule(Long trainerId, String startDateStr, String endDateStr) {
        TrainerProfile trainer = trainerRepository.findById(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy huấn luyện viên với ID: " + trainerId));
        
        LocalDate startDate;
        LocalDate endDate;
        
        // Xử lý ngày bắt đầu và kết thúc
        if (startDateStr == null || startDateStr.isEmpty()) {
            startDate = LocalDate.now();
        } else {
            startDate = LocalDate.parse(startDateStr);
        }
        
        if (endDateStr == null || endDateStr.isEmpty()) {
            endDate = startDate.plusDays(7); // Mặc định lấy 1 tuần
        } else {
            endDate = LocalDate.parse(endDateStr);
        }
        
        // Lấy các buổi tập và thời gian không có sẵn
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.plusDays(1).atStartOfDay();
        
        // Lấy danh sách booking theo trainer và khoảng thời gian
        List<Booking> bookings = bookingRepository.findByTrainerAndDateRange(trainer.getTrainerId(), startDateTime, endDateTime);
                
        // Lấy các khoảng thời gian không có sẵn của trainer
        List<TrainerUnavailability> unavailabilities = trainerUnavailabilityRepository.findByTrainerIdAndDateRange(
                trainer.getTrainerId(), startDateTime, endDateTime);
                
        // Lấy lịch sẵn sàng hàng tuần của huấn luyện viên
        List<TrainerAvailability> weeklyAvailabilities = trainerAvailabilityRepository.findByTrainerId(trainerId);
        
        // Chuyển đổi sang DTO
        List<TrainerDetailResponse.ScheduleInfo.ScheduleDay> scheduleDays = new ArrayList<>();
        
        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)) {
            TrainerDetailResponse.ScheduleInfo.ScheduleDay scheduleDay = 
                    buildScheduleDay(currentDate, weeklyAvailabilities, bookings, unavailabilities);
            scheduleDays.add(scheduleDay);
            currentDate = currentDate.plusDays(1);
        }
        
        return TrainerDetailResponse.ScheduleInfo.builder()
                .trainerId(trainerId)
                .scheduleDays(scheduleDays)
                .build();
    }

    @Override
    public Page<TrainerDetailResponse.TrainerRating> getTrainerRatings(Long trainerId, Pageable pageable) {
        trainerRepository.findById(trainerId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy huấn luyện viên với ID: " + trainerId));
                
        Page<TrainerRating> ratingsPage = trainerRatingRepository.findByTrainerTrainerId(trainerId, pageable);
        
        return ratingsPage.map(this::convertToTrainerRatingResponse);
    }
    
    // Phương thức tiện ích
    private TrainerSummaryResponse convertToTrainerSummaryResponse(TrainerProfile trainer) {
        User user = trainer.getUser();
        
        // Tính số khách hàng và số buổi tập đã hoàn thành
        Integer totalClients = calculateTotalClients(trainer.getTrainerId());
        Integer completedSessions = calculateCompletedSessions(trainer.getTrainerId());
        
        // Lấy đánh giá trung bình
        Double averageRating = trainerRatingRepository.findAverageRatingByTrainerId(trainer.getTrainerId());
        if (averageRating == null) averageRating = 0.0;
        
        String[] nameParts = user.getName().split(" ", 2);
        String firstName = nameParts.length > 0 ? nameParts[0] : "";
        String lastName = nameParts.length > 1 ? nameParts[1] : "";
        
        return TrainerSummaryResponse.builder()
                .id(trainer.getTrainerId())
                .firstName(firstName)
                .lastName(lastName)
                .fullName(user.getName())
                .email(user.getEmail())
                .phone(user.getPhoneNumber())
                .specialization(trainer.getSpecialization())
                .experienceYears(trainer.getExperienceYears())
                .profileImageUrl(trainer.getProfileImage())
                .averageRating(averageRating)
                .totalClients(totalClients)
                .completedSessions(completedSessions)
                .hourlyRate(trainer.getHourlyRate() != null ? trainer.getHourlyRate().doubleValue() : 0.0)
                .isActive(trainer.isActive())
                .createdAt(trainer.getCreatedAt())
                .updatedAt(trainer.getUpdatedAt())
                .build();
    }
    
    private TrainerDetailResponse convertToTrainerDetailResponse(TrainerProfile trainer) {
        User user = trainer.getUser();
        
        // Tính số khách hàng và số buổi tập đã hoàn thành
        Integer totalClients = calculateTotalClients(trainer.getTrainerId());
        Integer completedSessions = calculateCompletedSessions(trainer.getTrainerId());
        
        // Lấy đánh giá trung bình
        Double averageRating = trainerRatingRepository.findAverageRatingByTrainerId(trainer.getTrainerId());
        if (averageRating == null) averageRating = 0.0;
        
        // Tính tuổi dựa trên ngày sinh
        Integer age = null;
        if (user.getDateOfBirth() != null) {
            age = Period.between(user.getDateOfBirth(), LocalDate.now()).getYears();
        }
        
        String[] nameParts = user.getName().split(" ", 2);
        String firstName = nameParts.length > 0 ? nameParts[0] : "";
        String lastName = nameParts.length > 1 ? nameParts[1] : "";
        
        // Lấy danh sách chứng chỉ
        List<String> certifications = List.of();
        if (trainer.getCertification() != null && !trainer.getCertification().isEmpty()) {
            certifications = List.of(trainer.getCertification().split(",\\s*"));
        }
        
        // Lấy lịch sẵn sàng của huấn luyện viên
        List<TrainerAvailability> availabilities = trainerAvailabilityRepository.findByTrainerId(trainer.getTrainerId());
        List<TrainerDetailResponse.AvailabilityInfo> availabilityInfos = availabilities.stream()
                .map(availability -> TrainerDetailResponse.AvailabilityInfo.builder()
                        .id(availability.getAvailabilityId())
                        .dayOfWeek(availability.getDayOfWeek().name())
                        .startTime(availability.getStartTime().format(DateTimeFormatter.ofPattern("HH:mm")))
                        .endTime(availability.getEndTime().format(DateTimeFormatter.ofPattern("HH:mm")))
                        .build())
                .collect(Collectors.toList());
        
        // Lấy đánh giá của huấn luyện viên (giới hạn 5 đánh giá)
        List<TrainerRating> ratings = trainerRatingRepository.findByTrainerTrainerId(
                trainer.getTrainerId(), Pageable.ofSize(5)).getContent();
        List<TrainerDetailResponse.TrainerRating> ratingResponses = ratings.stream()
                .map(this::convertToTrainerRatingResponse)
                .collect(Collectors.toList());
        
        return TrainerDetailResponse.builder()
                .id(trainer.getTrainerId())
                .firstName(firstName)
                .lastName(lastName)
                .fullName(user.getName())
                .email(user.getEmail())
                .phone(user.getPhoneNumber())
                .dateOfBirth(user.getDateOfBirth())
                .age(age)
                .gender(user.getGender().name())
                .bio(trainer.getBiography())
                .specialization(trainer.getSpecialization())
                .certifications(certifications)
                .experienceYears(trainer.getExperienceYears())
                .profileImageUrl(trainer.getProfileImage())
                .averageRating(averageRating)
                .totalClients(totalClients)
                .completedSessions(completedSessions)
                .hourlyRate(trainer.getHourlyRate() != null ? trainer.getHourlyRate().doubleValue() : 0.0)
                .isActive(trainer.isActive())
                .createdAt(trainer.getCreatedAt())
                .updatedAt(trainer.getUpdatedAt())
                .availabilities(availabilityInfos)
                .ratings(ratingResponses)
                .build();
    }
    
    private TrainerDetailResponse.TrainerRating convertToTrainerRatingResponse(TrainerRating rating) {
        return TrainerDetailResponse.TrainerRating.builder()
                .id(rating.getRatingId())
                .clientName(rating.getUser().getName())
                .clientProfileImage(rating.getUser().getProfileImage())
                .rating(rating.getRating())
                .comment(rating.getReviewText())
                .createdAt(rating.getCreatedAt())
                .build();
    }
    
    private TrainerDetailResponse.ScheduleInfo.ScheduleDay buildScheduleDay(
            LocalDate date, 
            List<TrainerAvailability> weeklyAvailabilities,
            List<Booking> bookings,
            List<TrainerUnavailability> unavailabilities) {
        
        String dayOfWeek = date.getDayOfWeek().name();
        
        // Lọc các booking trong ngày
        List<Booking> dailyBookings = bookings.stream()
                .filter(booking -> booking.getStartDateTime().toLocalDate().isEqual(date))
                .collect(Collectors.toList());
                
        // Lọc các thời gian không có sẵn trong ngày
        List<TrainerUnavailability> dailyUnavailabilities = unavailabilities.stream()
                .filter(unavailability -> 
                        (unavailability.getStartDatetime().toLocalDate().isBefore(date) || unavailability.getStartDatetime().toLocalDate().isEqual(date)) &&
                        (unavailability.getEndDatetime().toLocalDate().isAfter(date) || unavailability.getEndDatetime().toLocalDate().isEqual(date)))
                .collect(Collectors.toList());
        
        // Tạo danh sách các buổi tập trong ngày
        List<TrainerDetailResponse.ScheduleInfo.ScheduleSession> scheduleSessions = dailyBookings.stream()
                .map(booking -> TrainerDetailResponse.ScheduleInfo.ScheduleSession.builder()
                        .sessionId(booking.getBookingId())
                        .clientName(booking.getUser().getName())
                        .clientProfileImage(booking.getUser().getProfileImage())
                        .startTime(booking.getStartDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")))
                        .endTime(booking.getEndDateTime().toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")))
                        .sessionType(booking.getBookingType().name())
                        .status(booking.getStatus().name())
                        .build())
                .collect(Collectors.toList());
                
        // Tạo danh sách các thời gian không có sẵn trong ngày
        List<TrainerDetailResponse.ScheduleInfo.UnavailabilityPeriod> unavailabilityPeriods = dailyUnavailabilities.stream()
                .map(unavailability -> {
                    LocalTime startTime = unavailability.getStartDatetime().toLocalDate().equals(date) ? 
                            unavailability.getStartDatetime().toLocalTime() : LocalTime.MIN;
                    LocalTime endTime = unavailability.getEndDatetime().toLocalDate().equals(date) ? 
                            unavailability.getEndDatetime().toLocalTime() : LocalTime.MAX;
                            
                    return TrainerDetailResponse.ScheduleInfo.UnavailabilityPeriod.builder()
                            .id(unavailability.getUnavailabilityId())
                            .reason(unavailability.getReason())
                            .startTime(startTime.format(DateTimeFormatter.ofPattern("HH:mm")))
                            .endTime(endTime.format(DateTimeFormatter.ofPattern("HH:mm")))
                            .build();
                })
                .collect(Collectors.toList());
        
        return TrainerDetailResponse.ScheduleInfo.ScheduleDay.builder()
                .date(date)
                .dayOfWeek(dayOfWeek)
                .sessions(scheduleSessions)
                .unavailabilityPeriods(unavailabilityPeriods)
                .build();
    }
    
    private Integer calculateTotalClients(Long trainerId) {
        // Triển khai thực tế dựa vào database model
        Integer result = bookingRepository.countDistinctClientsByTrainer(trainerId);
        return result != null ? result : 0;
    }
    
    private Integer calculateCompletedSessions(Long trainerId) {
        // Triển khai thực tế dựa vào database model
        Integer result = bookingRepository.countCompletedSessionsByTrainer(trainerId);
        return result != null ? result : 0;
    }
    
    private String generateRandomPassword() {
        // Tạo mật khẩu ngẫu nhiên 8 ký tự
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            int index = (int) (Math.random() * chars.length());
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }
    
    private DayOfWeek convertToDayOfWeek(String dayOfWeekStr) {
        try {
            return DayOfWeek.valueOf(dayOfWeekStr);
        } catch (IllegalArgumentException e) {
            // Thử với format khác
            for (DayOfWeek day : DayOfWeek.values()) {
                if (day.name().equalsIgnoreCase(dayOfWeekStr)) {
                    return day;
                }
            }
            throw new IllegalArgumentException("Ngày không hợp lệ: " + dayOfWeekStr);
        }
    }
}