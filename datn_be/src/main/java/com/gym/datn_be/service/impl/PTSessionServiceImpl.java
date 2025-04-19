package com.gym.datn_be.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.dto.request.SessionRescheduleRequest;
import com.gym.datn_be.dto.response.PTSessionResponse;
import com.gym.datn_be.entity.Booking;
import com.gym.datn_be.entity.Booking.BookingStatus;
import com.gym.datn_be.entity.PTSession;
import com.gym.datn_be.entity.TrainerProfile;
import com.gym.datn_be.entity.User;
import com.gym.datn_be.entity.UserPTPackage;
import com.gym.datn_be.exception.BadRequestException;
import com.gym.datn_be.exception.ResourceNotFoundException;
import com.gym.datn_be.repository.BookingRepository;
import com.gym.datn_be.repository.PTSessionRepository;
import com.gym.datn_be.repository.UserPTPackageRepository;
import com.gym.datn_be.service.EmailService;
import com.gym.datn_be.service.NotificationService;
import com.gym.datn_be.service.PTSessionService;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PTSessionServiceImpl implements PTSessionService {

    private final PTSessionRepository ptSessionRepository;
    private final BookingRepository bookingRepository;
    private final UserPTPackageRepository userPTPackageRepository;
    private final NotificationService notificationService;
    private final EmailService emailService;
    
    @Override
    public Page<PTSessionResponse> getPTSessions(LocalDate date, Long trainerId, Long userId, 
            String status, Pageable pageable) {
        
        // Tạo specification để lọc
        Specification<PTSession> spec = createSpecification(date, trainerId, userId, status);
        
        // Lấy danh sách buổi tập PT theo các điều kiện lọc
        Page<PTSession> ptSessions = ptSessionRepository.findAll(spec, pageable);
        
        // Chuyển đổi sang response
        List<PTSessionResponse> responseList = ptSessions.getContent().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        
        return new PageImpl<>(responseList, pageable, ptSessions.getTotalElements());
    }
    
    @Override
    public PTSessionResponse getPTSessionDetail(Long sessionId) {
        PTSession session = ptSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy buổi tập PT với ID: " + sessionId));
        
        return convertToResponse(session);
    }
    
    @Override
    @Transactional
    public void cancelPTSession(Long sessionId, String reason) {
        PTSession session = ptSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy buổi tập PT với ID: " + sessionId));
        
        Booking booking = session.getBooking();
        
        // Kiểm tra xem buổi tập có thể hủy không
        if (booking.getStatus() == BookingStatus.COMPLETED || 
                booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("Không thể hủy buổi tập đã hoàn thành hoặc đã hủy");
        }
        
        // Kiểm tra thời gian (không thể hủy buổi tập đã diễn ra)
        if (booking.getStartDateTime().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Không thể hủy buổi tập đã bắt đầu");
        }
        
        // Cập nhật trạng thái booking
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
        
        // Cập nhật ghi chú cho buổi tập
        session.setSessionNotes(reason != null ? 
                (session.getSessionNotes() != null ? session.getSessionNotes() + "\n" : "") + "Hủy: " + reason : 
                (session.getSessionNotes() != null ? session.getSessionNotes() + "\n" : "") + "Đã hủy buổi tập");
        ptSessionRepository.save(session);
        
        // Nếu hủy trước giờ tập, thì hoàn lại buổi tập vào gói PT
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sessionStartTime = booking.getStartDateTime();
        
        UserPTPackage userPackage = session.getUserPackage();
        
        // Kiểm tra nếu buổi tập bị hủy trước khi diễn ra ít nhất 24h
        if (sessionStartTime.isAfter(now.plusHours(24))) {
            // Hoàn lại buổi tập
            userPackage.setSessionsRemaining(userPackage.getSessionsRemaining() + 1);
            userPTPackageRepository.save(userPackage);
            
            // Cập nhật ghi chú
            String packageNote = "Hoàn lại buổi tập do hủy trước 24h. Buổi tập ID: " + sessionId;
            userPackage.setNotes(userPackage.getNotes() != null ? 
                    userPackage.getNotes() + "\n" + packageNote : packageNote);
            userPackage.setUpdatedAt(LocalDateTime.now());
            userPTPackageRepository.save(userPackage);
        }
        
        // Thông báo cho người dùng và huấn luyện viên
        User user = userPackage.getUser();
        TrainerProfile trainer = userPackage.getTrainer();
        
        // Thông báo cho người dùng
        String userMessage = "Buổi tập PT ngày " + formatDateTime(sessionStartTime) + 
                " đã bị hủy" + (reason != null ? ". Lý do: " + reason : "");
        notificationService.sendNotification(
                user.getUserId(), "Buổi tập PT đã bị hủy", userMessage, "/profile/pt-sessions");
        
        // Thông báo cho huấn luyện viên
        String trainerMessage = "Buổi tập với " + user.getName() + " ngày " + 
                formatDateTime(sessionStartTime) + " đã bị hủy" + 
                (reason != null ? ". Lý do: " + reason : "");
        notificationService.sendNotification(
                trainer.getUser().getUserId(), "Buổi tập PT đã bị hủy", trainerMessage, "/trainer/schedule");
        
        // Gửi email
        emailService.sendPTSessionCancelledEmail(
                user.getEmail(), 
                user.getName(), 
                trainer.getUser().getName(), 
                sessionStartTime, 
                booking.getEndDateTime(),
                userPackage.getPtPackage().getPackageName(),
                reason);
    }
    
    @Override
    @Transactional
    public void completePTSession(Long sessionId, String notes) {
        PTSession session = ptSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy buổi tập PT với ID: " + sessionId));
        
        Booking booking = session.getBooking();
        
        // Kiểm tra xem buổi tập có thể đánh dấu hoàn thành không
        if (booking.getStatus() == BookingStatus.COMPLETED || 
                booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("Không thể cập nhật trạng thái cho buổi tập đã hoàn thành hoặc đã hủy");
        }
        
        // Cập nhật trạng thái booking
        booking.setStatus(BookingStatus.COMPLETED);
        bookingRepository.save(booking);
        
        // Cập nhật ghi chú cho buổi tập
        if (notes != null && !notes.isEmpty()) {
            session.setSessionNotes(session.getSessionNotes() != null ? 
                    session.getSessionNotes() + "\n" + notes : notes);
        }
        ptSessionRepository.save(session);
        
        // Thông báo cho người dùng
        UserPTPackage userPackage = session.getUserPackage();
        User user = userPackage.getUser();
        
        String message = "Buổi tập PT ngày " + formatDateTime(booking.getStartDateTime()) + 
                " đã hoàn thành. Bạn còn " + userPackage.getSessionsRemaining() + " buổi tập trong gói.";
        
        notificationService.sendNotification(
                user.getUserId(), "Buổi tập PT đã hoàn thành", message, "/profile/pt-sessions");
        
        // Kiểm tra và cập nhật trạng thái gói nếu đã hết buổi tập
        if (userPackage.getSessionsRemaining() == 0) {
            userPackage.setPackageStatus(UserPTPackage.PackageStatus.COMPLETED);
            userPackage.setNotes(userPackage.getNotes() != null ? 
                    userPackage.getNotes() + "\nĐã hoàn thành tất cả buổi tập." : 
                    "Đã hoàn thành tất cả buổi tập.");
            userPackage.setUpdatedAt(LocalDateTime.now());
            userPTPackageRepository.save(userPackage);
            
            // Thông báo đã hoàn thành gói
            String completeMessage = "Bạn đã hoàn thành tất cả buổi tập trong gói " + 
                    userPackage.getPtPackage().getPackageName() + ". Liên hệ với chúng tôi để đăng ký gói mới.";
            
            notificationService.sendNotification(
                    user.getUserId(), "Đã hoàn thành gói PT", completeMessage, "/profile/pt-packages");
            
            // Gửi email thông báo hoàn thành gói
            emailService.sendPTPackageCompletedEmail(
                    user.getEmail(),
                    user.getName(),
                    userPackage.getPtPackage().getPackageName(),
                    userPackage.getTrainer().getUser().getName());
        }
    }
    
    @Override
    @Transactional
    public void reschedulePTSession(Long sessionId, SessionRescheduleRequest request) {
        PTSession session = ptSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy buổi tập PT với ID: " + sessionId));
        
        Booking booking = session.getBooking();
        
        // Kiểm tra xem buổi tập có thể lên lịch lại không
        if (booking.getStatus() == BookingStatus.COMPLETED || 
                booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("Không thể lên lịch lại cho buổi tập đã hoàn thành hoặc đã hủy");
        }
        
        // Kiểm tra thời gian (không thể đổi lịch buổi tập đã diễn ra)
        if (booking.getStartDateTime().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Không thể đổi lịch cho buổi tập đã bắt đầu");
        }
        
        // Lưu thông tin lịch cũ để gửi thông báo
        LocalDateTime oldStartTime = booking.getStartDateTime();
        LocalDateTime oldEndTime = booking.getEndDateTime();
        
        // Cập nhật thời gian mới
        booking.setStartDateTime(request.getNewStartTime());
        booking.setEndDateTime(request.getNewEndTime());
        bookingRepository.save(booking);
        
        // Cập nhật ghi chú nếu có
        if (request.getReason() != null || request.getNotes() != null) {
            String noteUpdate = "";
            
            if (request.getReason() != null) {
                noteUpdate += "Lịch đã thay đổi: " + request.getReason();
            }
            
            if (request.getNotes() != null) {
                noteUpdate += (noteUpdate.isEmpty() ? "" : "\n") + request.getNotes();
            }
            
            session.setSessionNotes(session.getSessionNotes() != null ?
                    session.getSessionNotes() + "\n" + noteUpdate : noteUpdate);
            
            ptSessionRepository.save(session);
        }
        
        // Thông báo cho người dùng nếu yêu cầu
        if (request.isNotifyUser()) {
            UserPTPackage userPackage = session.getUserPackage();
            User user = userPackage.getUser();
            TrainerProfile trainer = userPackage.getTrainer();
            
            // Tạo thông báo
            String message = "Buổi tập PT từ " + formatDateTime(oldStartTime) + " đến " + 
                    formatDateTime(oldEndTime) + " đã được đổi lịch sang " + 
                    formatDateTime(request.getNewStartTime()) + " đến " + 
                    formatDateTime(request.getNewEndTime());
            
            if (request.getReason() != null) {
                message += ". Lý do: " + request.getReason();
            }
            
            // Gửi thông báo cho người dùng
            notificationService.sendNotification(
                    user.getUserId(), "Lịch tập PT đã thay đổi", message, "/profile/pt-sessions");
            
            // Gửi email thông báo
            emailService.sendPTSessionRescheduledEmail(
                    user.getEmail(),
                    user.getName(),
                    trainer.getUser().getName(),
                    oldStartTime,
                    oldEndTime,
                    request.getNewStartTime(),
                    request.getNewEndTime(),
                    request.getReason());
        }
    }
    
    // Các phương thức hỗ trợ
    
    private PTSessionResponse convertToResponse(PTSession session) {
        Booking booking = session.getBooking();
        UserPTPackage userPackage = session.getUserPackage();
        User user = userPackage.getUser();
        TrainerProfile trainer = userPackage.getTrainer();
        
        return PTSessionResponse.builder()
                .sessionId(session.getSessionId())
                .bookingId(booking.getBookingId())
                .userPackageId(userPackage.getUserPackageId())
                
                .userId(user.getUserId())
                .userName(user.getName())
                .userEmail(user.getEmail())
                .userProfileImage(user.getProfileImage())
                
                .trainerId(trainer.getTrainerId())
                .trainerName(trainer.getUser().getName())
                .trainerProfileImage(trainer.getUser().getProfileImage())
                
                .startDateTime(booking.getStartDateTime())
                .endDateTime(booking.getEndDateTime())
                
                .sessionNumber(session.getSessionNumber())
                .sessionFocus(session.getSessionFocus())
                .sessionNotes(session.getSessionNotes())
                
                .status(booking.getStatus())
                .rating(session.getRating())
                .feedback(session.getFeedback())
                .userComments(session.getUserComments())
                
                .createdAt(session.getCreatedAt())
                .updatedAt(booking.getUpdatedAt() != null ? booking.getUpdatedAt() : session.getCreatedAt())
                .build();
    }
    
    private String formatDateTime(LocalDateTime dateTime) {
        if (dateTime == null) return "";
        return dateTime.toLocalDate() + " " + dateTime.toLocalTime().toString().substring(0, 5);
    }
    
    private Specification<PTSession> createSpecification(LocalDate date, Long trainerId, 
            Long userId, String status) {
        
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // Join với booking
            Join<PTSession, Booking> bookingJoin = root.join("booking");
            
            // Join với userPackage
            Join<PTSession, UserPTPackage> packageJoin = root.join("userPackage");
            
            // Lọc theo ngày
            if (date != null) {
                predicates.add(cb.between(
                    bookingJoin.get("startDateTime"),
                    date.atStartOfDay(),
                    date.plusDays(1).atStartOfDay()
                ));
            }
            
            // Lọc theo huấn luyện viên
            if (trainerId != null) {
                Join<UserPTPackage, TrainerProfile> trainerJoin = packageJoin.join("trainer");
                predicates.add(cb.equal(trainerJoin.get("trainerId"), trainerId));
            }
            
            // Lọc theo người dùng
            if (userId != null) {
                Join<UserPTPackage, User> userJoin = packageJoin.join("user");
                predicates.add(cb.equal(userJoin.get("userId"), userId));
            }
            
            // Lọc theo trạng thái
            if (status != null && !status.isEmpty()) {
                try {
                    BookingStatus bookingStatus = BookingStatus.valueOf(status);
                    predicates.add(cb.equal(bookingJoin.get("status"), bookingStatus));
                } catch (IllegalArgumentException e) {
                    // Bỏ qua nếu status không hợp lệ
                    log.warn("Invalid status provided: {}", status);
                }
            }
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}