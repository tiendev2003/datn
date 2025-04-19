package com.gym.datn_be.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.dto.request.BookingCreateRequest;
import com.gym.datn_be.dto.request.BookingUpdateRequest;
import com.gym.datn_be.dto.response.BookingDetailResponse;
import com.gym.datn_be.dto.response.BookingResponse;
import com.gym.datn_be.dto.response.BookingStatsResponse;
import com.gym.datn_be.dto.response.BookingStatsResponse.ClassBookingStats;
import com.gym.datn_be.dto.response.BookingStatsResponse.TimeSlotStats;
import com.gym.datn_be.dto.response.BookingStatsResponse.TrainerBookingStats;
import com.gym.datn_be.entity.Booking;
import com.gym.datn_be.entity.Booking.BookingStatus;
import com.gym.datn_be.entity.Booking.BookingType;
import com.gym.datn_be.entity.CheckInOut;
import com.gym.datn_be.entity.ClassSchedule;
import com.gym.datn_be.entity.TrainerProfile;
import com.gym.datn_be.entity.User;
import com.gym.datn_be.entity.UserPTPackage;
import com.gym.datn_be.exception.BadRequestException;
import com.gym.datn_be.exception.ResourceNotFoundException;
import com.gym.datn_be.repository.BookingRepository;
import com.gym.datn_be.repository.CheckInOutRepository;
import com.gym.datn_be.repository.ClassScheduleRepository;
import com.gym.datn_be.repository.TrainerProfileRepository;
import com.gym.datn_be.repository.UserPTPackageRepository;
import com.gym.datn_be.repository.UserRepository;
import com.gym.datn_be.service.BookingManagementService;
import com.gym.datn_be.service.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingManagementServiceImpl implements BookingManagementService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TrainerProfileRepository trainerRepository;
    private final ClassScheduleRepository classScheduleRepository;
    private final CheckInOutRepository checkInOutRepository;
    private final UserPTPackageRepository ptPackageRepository;
    private final EmailService emailService;

    @Override
    public Page<BookingResponse> getAllBookings(String keyword, String bookingType, Long userId, 
                                               Long trainerId, String status, String startDate, 
                                               String endDate, Pageable pageable) {
        // Chuẩn bị các tham số tìm kiếm
        LocalDateTime startDateTime = null;
        LocalDateTime endDateTime = null;
        
        if (startDate != null && !startDate.isBlank()) {
            startDateTime = LocalDate.parse(startDate).atStartOfDay();
        }
        
        if (endDate != null && !endDate.isBlank()) {
            endDateTime = LocalDate.parse(endDate).plusDays(1).atStartOfDay();
        }
        
        BookingType type = null;
        if (bookingType != null && !bookingType.isBlank()) {
            try {
                type = BookingType.valueOf(bookingType);
            } catch (IllegalArgumentException e) {
                log.warn("Invalid booking type: {}", bookingType);
            }
        }
        
        BookingStatus statusEnum = null;
        if (status != null && !status.isBlank()) {
            try {
                statusEnum = BookingStatus.valueOf(status);
            } catch (IllegalArgumentException e) {
                log.warn("Invalid booking status: {}", status);
            }
        }
        
        final BookingType finalType = type;
        final BookingStatus finalStatus = statusEnum;
        final LocalDateTime finalStartDateTime = startDateTime;
        final LocalDateTime finalEndDateTime = endDateTime;
        final String finalKeyword = keyword != null ? keyword.toLowerCase() : null;
        
        // Thực hiện truy vấn động với các điều kiện tìm kiếm
        List<Booking> bookings = bookingRepository.findAll();
        
        // Lọc kết quả theo các điều kiện với cách xử lý null an toàn hơn
        List<Booking> filteredBookings = bookings.stream()
            .filter(b -> finalType == null || b.getBookingType().equals(finalType))
            .filter(b -> userId == null || (b.getUser() != null && b.getUser().getUserId().equals(userId)))
            .filter(b -> trainerId == null || (b.getTrainer() != null && b.getTrainer().getTrainerId().equals(trainerId)))
            .filter(b -> finalStatus == null || b.getStatus().equals(finalStatus))
            .filter(b -> finalStartDateTime == null || 
                  (b.getStartDateTime() != null && 
                   (b.getStartDateTime().isAfter(finalStartDateTime) || b.getStartDateTime().isEqual(finalStartDateTime))))
            .filter(b -> finalEndDateTime == null || 
                  (b.getStartDateTime() != null && b.getStartDateTime().isBefore(finalEndDateTime)))
            .filter(b -> {
                if (finalKeyword == null || finalKeyword.isBlank()) {
                    return true;
                }
                
                // Tìm kiếm từ khóa trong tên người dùng
                boolean matchesUserName = b.getUser() != null && 
                                          b.getUser().getName() != null &&
                                          b.getUser().getName().toLowerCase().contains(finalKeyword);
                
                // Tìm kiếm từ khóa trong địa điểm
                boolean matchesLocation = b.getLocation() != null &&
                                         b.getLocation().toLowerCase().contains(finalKeyword);
                
                // Tìm kiếm từ khóa trong ghi chú
                boolean matchesNotes = b.getNotes() != null &&
                                       b.getNotes().toLowerCase().contains(finalKeyword);
                
                return matchesUserName || matchesLocation || matchesNotes;
            })
            .collect(Collectors.toList());
        
        // Tạo phân trang từ danh sách đã lọc
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filteredBookings.size());
        
        // Xử lý trường hợp trang không hợp lệ
        if (start >= filteredBookings.size() && !filteredBookings.isEmpty()) {
            start = 0;
            end = Math.min(pageable.getPageSize(), filteredBookings.size());
        }
        
        // Xử lý trường hợp danh sách trống
        List<BookingResponse> bookingResponses = new ArrayList<>();
        if (!filteredBookings.isEmpty() && end > start) {
            bookingResponses = filteredBookings
                .subList(start, end)
                .stream()
                .map(this::mapToBookingResponse)
                .collect(Collectors.toList());
        }
        
        return new PageImpl<>(bookingResponses, pageable, filteredBookings.size());
    }

    @Override
    public BookingDetailResponse getBookingDetails(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch đặt với ID: " + bookingId));
        
        return mapToBookingDetailResponse(booking);
    }

    @Override
    @Transactional
    public BookingDetailResponse createBooking(BookingCreateRequest request) {
        // Xác thực dữ liệu đầu vào
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + request.getUserId()));
        
        BookingType bookingType = BookingType.valueOf(request.getBookingType());
        
        // Kiểm tra xung đột lịch
        checkTimeConflicts(user.getUserId(), request.getStartDateTime(), request.getEndDateTime(), null);
        
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBookingType(bookingType);
        booking.setStartDateTime(request.getStartDateTime());
        booking.setEndDateTime(request.getEndDateTime());
        booking.setStatus(BookingStatus.CONFIRMED); // Admin tạo trực tiếp đã xác nhận
        booking.setNotes(request.getNotes());
        booking.setLocation(request.getLocation());
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());
        
        // Xử lý dựa trên loại đặt lịch
        switch (bookingType) {
            case PT_SESSION:
                if (request.getTrainerId() == null) {
                    throw new BadRequestException("Phải có trainerId cho đặt lịch PT_SESSION");
                }
                
                TrainerProfile trainer = trainerRepository.findById(request.getTrainerId())
                        .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy HLV với ID: " + request.getTrainerId()));
                
                // Kiểm tra xung đột lịch của huấn luyện viên
                checkTrainerAvailability(trainer.getTrainerId(), request.getStartDateTime(), request.getEndDateTime());
                
                // Kiểm tra và cập nhật gói PT
                if (request.getPackageId() != null) {
                    UserPTPackage ptPackage = ptPackageRepository.findById(request.getPackageId())
                            .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy gói PT với ID: " + request.getPackageId()));
                    
                    if (ptPackage.getSessionsRemaining() <= 0) {
                        throw new BadRequestException("Gói PT đã hết buổi tập");
                    }
                    
                    // Cập nhật số buổi còn lại
                    ptPackage.setSessionsRemaining(ptPackage.getSessionsRemaining() - 1);
                    ptPackageRepository.save(ptPackage);
                }
                
                booking.setTrainer(trainer);
                break;
                
            case CLASS:
                if (request.getClassScheduleId() == null) {
                    throw new BadRequestException("Phải có classScheduleId cho đặt lịch CLASS");
                }
                
                ClassSchedule classSchedule = classScheduleRepository.findById(request.getClassScheduleId())
                        .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch lớp học với ID: " + request.getClassScheduleId()));
                
                // Đếm số lượng booking đã xác nhận cho lớp học này
                long currentBookings = bookingRepository.findAll().stream()
                        .filter(b -> b.getClassSchedule() != null && 
                                b.getClassSchedule().getScheduleId().equals(classSchedule.getScheduleId()) &&
                                b.getStatus() == BookingStatus.CONFIRMED)
                        .count();
                
                if (currentBookings >= classSchedule.getMaxAttendees()) {
                    throw new BadRequestException("Lớp học đã đầy");
                }
                
                booking.setClassSchedule(classSchedule);
                break;
                
            case GYM_SESSION:
                // Không cần xử lý thêm cho GYM_SESSION
                break;
                
            default:
                throw new BadRequestException("Loại đặt lịch không hợp lệ");
        }
        
        Booking savedBooking = bookingRepository.save(booking);
        
        // Gửi email thông báo cho người dùng về lịch đặt mới
        try {
            emailService.sendGenericEmail(
                user.getEmail(),
                user.getName(),
                "Thông báo đặt lịch mới",
                "Lịch đặt của bạn đã được tạo thành công. Chi tiết lịch đặt:\n" +
                "Loại: " + booking.getBookingType() + "\n" +
                "Thời gian bắt đầu: " + booking.getStartDateTime() + "\n" +
                "Thời gian kết thúc: " + booking.getEndDateTime() + "\n" +
                "Địa điểm: " + booking.getLocation()
            );
        } catch (Exception e) {
            log.error("Error sending booking confirmation email", e);
        }
        
        return mapToBookingDetailResponse(savedBooking);
    }

    @Override
    @Transactional
    public BookingDetailResponse updateBooking(Long bookingId, BookingUpdateRequest request) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch đặt với ID: " + bookingId));
        
        boolean sendNotification = false;
        
        // Kiểm tra thay đổi thời gian và xung đột
        if (request.getStartDateTime() != null && request.getEndDateTime() != null) {
            checkTimeConflicts(booking.getUser().getUserId(), 
                              request.getStartDateTime(), 
                              request.getEndDateTime(), 
                              bookingId);
            
            // Nếu có HLV, kiểm tra lịch HLV
            if (booking.getTrainer() != null) {
                checkTrainerAvailability(booking.getTrainer().getTrainerId(), 
                                        request.getStartDateTime(), 
                                        request.getEndDateTime());
            }
            
            booking.setStartDateTime(request.getStartDateTime());
            booking.setEndDateTime(request.getEndDateTime());
            sendNotification = true;
        }
        
        // Cập nhật trạng thái
        if (request.getStatus() != null && !request.getStatus().isEmpty()) {
            BookingStatus newStatus = BookingStatus.valueOf(request.getStatus());
            
            // Nếu chuyển từ CONFIRMED sang CANCELLED, xử lý hoàn buổi PT
            if (booking.getStatus() == BookingStatus.CONFIRMED && newStatus == BookingStatus.CANCELLED) {
                if (booking.getBookingType() == BookingType.PT_SESSION) {
                    // Tìm gói PT của người dùng và cộng lại buổi
                    UserPTPackage ptPackage = ptPackageRepository.findFirstByUserAndTrainerOrderByEndDateDesc(
                            booking.getUser(), booking.getTrainer())
                            .orElse(null);
                    
                    if (ptPackage != null) {
                        ptPackage.setSessionsRemaining(ptPackage.getSessionsRemaining() + 1);
                        ptPackageRepository.save(ptPackage);
                    }
                }
                
                if (request.getCancellationReason() != null && !request.getCancellationReason().isBlank()) {
                    booking.setNotes(request.getCancellationReason());
                }
                
                sendNotification = true;
            }
            
            booking.setStatus(newStatus);
        }
        
        // Cập nhật thông tin khác
        if (request.getLocation() != null) {
            booking.setLocation(request.getLocation());
            sendNotification = true;
        }
        
        if (request.getNotes() != null) {
            booking.setNotes(request.getNotes());
        }
        
        // Thay đổi HLV
        if (request.getTrainerId() != null && 
            (booking.getTrainer() == null || !booking.getTrainer().getTrainerId().equals(request.getTrainerId()))) {
            
            TrainerProfile trainer = trainerRepository.findById(request.getTrainerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy HLV với ID: " + request.getTrainerId()));
            
            booking.setTrainer(trainer);
            sendNotification = true;
        }
        
        // Thay đổi lịch lớp học
        if (request.getClassScheduleId() != null &&
            (booking.getClassSchedule() == null || !booking.getClassSchedule().getScheduleId().equals(request.getClassScheduleId()))) {
            
            ClassSchedule classSchedule = classScheduleRepository.findById(request.getClassScheduleId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch lớp học với ID: " + request.getClassScheduleId()));
            
            booking.setClassSchedule(classSchedule);
            sendNotification = true;
        }
        
        booking.setUpdatedAt(LocalDateTime.now());
        Booking updatedBooking = bookingRepository.save(booking);
        
        // Gửi email thông báo thay đổi
        if (sendNotification) {
            try {
                emailService.sendGenericEmail(
                    booking.getUser().getEmail(),
                    booking.getUser().getName(),
                    "Thông báo thay đổi lịch đặt",
                    "Lịch đặt của bạn đã được cập nhật. Chi tiết lịch đặt mới:\n" +
                    "Loại: " + booking.getBookingType() + "\n" +
                    "Thời gian bắt đầu: " + booking.getStartDateTime() + "\n" +
                    "Thời gian kết thúc: " + booking.getEndDateTime() + "\n" +
                    "Địa điểm: " + booking.getLocation() + "\n" +
                    "Trạng thái: " + booking.getStatus()
                );
            } catch (Exception e) {
                log.error("Error sending booking update email", e);
            }
        }
        
        return mapToBookingDetailResponse(updatedBooking);
    }

    @Override
    @Transactional
    public void deleteBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch đặt với ID: " + bookingId));
        
        // Nếu là buổi PT, hoàn lại buổi tập vào gói
        if (booking.getBookingType() == BookingType.PT_SESSION) {
            UserPTPackage ptPackage = ptPackageRepository.findFirstByUserAndTrainerOrderByEndDateDesc(
                    booking.getUser(), booking.getTrainer())
                    .orElse(null);
            
            if (ptPackage != null && booking.getStatus() != BookingStatus.COMPLETED) {
                ptPackage.setSessionsRemaining(ptPackage.getSessionsRemaining() + 1);
                ptPackageRepository.save(ptPackage);
            }
        }
        
        // Gửi email thông báo
        try {
            emailService.sendGenericEmail(
                booking.getUser().getEmail(),
                booking.getUser().getName(),
                "Thông báo hủy lịch đặt",
                "Lịch đặt của bạn đã bị hủy. Chi tiết lịch đặt:\n" +
                "Loại: " + booking.getBookingType() + "\n" +
                "Thời gian bắt đầu: " + booking.getStartDateTime() + "\n" +
                "Thời gian kết thúc: " + booking.getEndDateTime() + "\n" +
                "Địa điểm: " + booking.getLocation()
            );
        } catch (Exception e) {
            log.error("Error sending booking cancellation email", e);
        }
        
        bookingRepository.delete(booking);
    }

    @Override
    @Transactional
    public void cancelBooking(Long bookingId, String reason) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch đặt với ID: " + bookingId));
        
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("Lịch đặt đã bị hủy trước đó");
        }
        
        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new BadRequestException("Không thể hủy lịch đặt đã hoàn thành");
        }
        
        // Nếu là buổi PT, hoàn lại buổi tập vào gói
        if (booking.getBookingType() == BookingType.PT_SESSION) {
            UserPTPackage ptPackage = ptPackageRepository.findFirstByUserAndTrainerOrderByEndDateDesc(
                    booking.getUser(), booking.getTrainer())
                    .orElse(null);
            
            if (ptPackage != null) {
                ptPackage.setSessionsRemaining(ptPackage.getSessionsRemaining() + 1);
                ptPackageRepository.save(ptPackage);
            }
        }
        
        booking.setStatus(BookingStatus.CANCELLED);
        booking.setUpdatedAt(LocalDateTime.now());
        
        if (reason != null && !reason.isBlank()) {
            booking.setNotes(reason);
        }
        
        bookingRepository.save(booking);
        
        // Gửi email thông báo
        try {
            String reasonText = reason != null && !reason.isBlank() ? 
                                "Lý do hủy: " + reason : "Không có lý do được cung cấp.";
            
            emailService.sendGenericEmail(
                booking.getUser().getEmail(),
                booking.getUser().getName(),
                "Thông báo hủy lịch đặt",
                "Lịch đặt của bạn đã bị hủy. Chi tiết:\n" +
                "Loại: " + booking.getBookingType() + "\n" +
                "Thời gian bắt đầu: " + booking.getStartDateTime() + "\n" +
                "Thời gian kết thúc: " + booking.getEndDateTime() + "\n" +
                "Địa điểm: " + booking.getLocation() + "\n" +
                reasonText
            );
        } catch (Exception e) {
            log.error("Error sending booking cancellation email", e);
        }
    }

    @Override
    @Transactional
    public void checkInBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch đặt với ID: " + bookingId));
        
        if (booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new BadRequestException("Chỉ có thể check-in cho lịch đặt đã xác nhận");
        }
        
        // Kiểm tra thời gian check-in
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime bookingStartTime = booking.getStartDateTime();
        
        // Cho phép check-in sớm 15 phút hoặc muộn không quá 30 phút
        if (now.isBefore(bookingStartTime.minusMinutes(15)) || 
            now.isAfter(bookingStartTime.plusMinutes(30))) {
            throw new BadRequestException("Không thể check-in vào lúc này. Chỉ có thể check-in trong khoảng 15 phút trước đến 30 phút sau thời gian bắt đầu.");
        }
        
        // Ghi lại thông tin check-in
        CheckInOut checkIn = new CheckInOut();
        checkIn.setUser(booking.getUser());
        checkIn.setBooking(booking);
        checkIn.setCheckInTime(now);
        checkIn.setLocation(booking.getLocation());
        checkIn.setCheckInMethod("Admin");
        
        checkInOutRepository.save(checkIn);
        
        // Cập nhật trạng thái booking
        booking.setStatus(BookingStatus.CONFIRMED); // Vẫn giữ CONFIRMED vì chưa hoàn thành
        booking.setUpdatedAt(now);
        bookingRepository.save(booking);
    }

    @Override
    @Transactional
    public void completeBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch đặt với ID: " + bookingId));
        
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("Không thể hoàn thành lịch đặt đã bị hủy");
        }
        
        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new BadRequestException("Lịch đặt đã được đánh dấu hoàn thành trước đó");
        }
        
        // Kiểm tra đã check-in chưa
        CheckInOut checkIn = checkInOutRepository.findFirstByBookingOrderByCheckInTimeDesc(booking)
                .orElse(null);
        
        // Nếu chưa check-in, tạo check-in tự động
        if (checkIn == null) {
            checkIn = new CheckInOut();
            checkIn.setUser(booking.getUser());
            checkIn.setBooking(booking);
            checkIn.setCheckInTime(LocalDateTime.now());
            checkIn.setLocation(booking.getLocation());
            checkIn.setCheckInMethod("Auto by Admin");
            checkInOutRepository.save(checkIn);
        }
        
        // Cập nhật check-out time nếu chưa có
        if (checkIn.getCheckOutTime() == null) {
            checkIn.setCheckOutTime(LocalDateTime.now());
            checkInOutRepository.save(checkIn);
        }
        
        booking.setStatus(BookingStatus.COMPLETED);
        booking.setUpdatedAt(LocalDateTime.now());
        bookingRepository.save(booking);
    }

    @Override
    @Transactional
    public void markNoShow(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch đặt với ID: " + bookingId));
        
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("Không thể đánh dấu không đến cho lịch đặt đã bị hủy");
        }
        
        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new BadRequestException("Không thể đánh dấu không đến cho lịch đặt đã hoàn thành");
        }
        
        if (booking.getStatus() == BookingStatus.NO_SHOW) {
            throw new BadRequestException("Lịch đặt đã được đánh dấu không đến trước đó");
        }
        
        booking.setStatus(BookingStatus.NO_SHOW);
        booking.setUpdatedAt(LocalDateTime.now());
        bookingRepository.save(booking);
        
        // Gửi email thông báo
        try {
            emailService.sendGenericEmail(
                booking.getUser().getEmail(),
                booking.getUser().getName(),
                "Thông báo vắng mặt",
                "Bạn đã được đánh dấu không đến cho lịch đặt sau:\n" +
                "Loại: " + booking.getBookingType() + "\n" +
                "Thời gian bắt đầu: " + booking.getStartDateTime() + "\n" +
                "Thời gian kết thúc: " + booking.getEndDateTime() + "\n" +
                "Địa điểm: " + booking.getLocation() + "\n\n" +
                "Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ nhân viên để được hỗ trợ."
            );
        } catch (Exception e) {
            log.error("Error sending no-show notification email", e);
        }
    }

    @Override
    public BookingStatsResponse getBookingStatistics(String startDate, String endDate) {
        // Xử lý tham số ngày tháng
        LocalDate start = startDate != null ? LocalDate.parse(startDate) : LocalDate.now().minusMonths(1);
        LocalDate end = endDate != null ? LocalDate.parse(endDate) : LocalDate.now();
        
        LocalDateTime startDateTime = start.atStartOfDay();
        LocalDateTime endDateTime = end.plusDays(1).atStartOfDay();
        
        // Lấy tất cả các booking trong khoảng thời gian
        List<Booking> bookings = bookingRepository.findByStartDateTimeBetween(startDateTime, endDateTime);
        
        // Tính toán các số liệu thống kê
        long totalBookings = bookings.size();
        long gymSessionsCount = bookings.stream().filter(b -> b.getBookingType() == BookingType.GYM_SESSION).count();
        long ptSessionsCount = bookings.stream().filter(b -> b.getBookingType() == BookingType.PT_SESSION).count();
        long classBookingsCount = bookings.stream().filter(b -> b.getBookingType() == BookingType.CLASS).count();
        
        long pendingCount = bookings.stream().filter(b -> b.getStatus() == BookingStatus.PENDING).count();
        long confirmedCount = bookings.stream().filter(b -> b.getStatus() == BookingStatus.CONFIRMED).count();
        long cancelledCount = bookings.stream().filter(b -> b.getStatus() == BookingStatus.CANCELLED).count();
        long completedCount = bookings.stream().filter(b -> b.getStatus() == BookingStatus.COMPLETED).count();
        long noShowCount = bookings.stream().filter(b -> b.getStatus() == BookingStatus.NO_SHOW).count();
        
        // Thống kê theo ngày
        Map<String, Long> dailyBookingCounts = new HashMap<>();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        
        bookings.stream()
            .collect(Collectors.groupingBy(
                booking -> booking.getStartDateTime().format(dateFormatter),
                Collectors.counting()
            ))
            .forEach(dailyBookingCounts::put);
        
        // Thống kê các khung giờ phổ biến
        Map<String, Long> timeSlotCounts = new HashMap<>();
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        
        bookings.forEach(booking -> {
            String timeSlot = booking.getStartDateTime().format(timeFormatter);
            timeSlotCounts.put(timeSlot, timeSlotCounts.getOrDefault(timeSlot, 0L) + 1);
        });
        
        List<TimeSlotStats> popularTimeSlots = timeSlotCounts.entrySet().stream()
            .map(entry -> new TimeSlotStats(entry.getKey(), entry.getValue()))
            .sorted((a, b) -> b.getBookingsCount().compareTo(a.getBookingsCount()))
            .limit(5)
            .collect(Collectors.toList());
        
        // Thống kê HLV
        Map<TrainerProfile, Long> trainerBookingMap = bookings.stream()
            .filter(b -> b.getTrainer() != null)
            .collect(Collectors.groupingBy(
                Booking::getTrainer,
                Collectors.counting()
            ));
        
        List<TrainerBookingStats> topTrainers = trainerBookingMap.entrySet().stream()
            .map(entry -> new TrainerBookingStats(
                entry.getKey().getTrainerId(),
                entry.getKey().getUser().getName(),
                entry.getValue()
            ))
            .sorted((a, b) -> b.getBookingsCount().compareTo(a.getBookingsCount()))
            .limit(5)
            .collect(Collectors.toList());
        
        // Thống kê lớp học
        Map<ClassSchedule, List<Booking>> classBookingMap = bookings.stream()
            .filter(b -> b.getClassSchedule() != null)
            .collect(Collectors.groupingBy(Booking::getClassSchedule));
        
        List<ClassBookingStats> topClasses = new ArrayList<>();
        
        classBookingMap.forEach((classSchedule, classBookings) -> {
            double fillRate = (double) classBookings.size() / classSchedule.getMaxAttendees() * 100.0;
            
            topClasses.add(new ClassBookingStats(
                classSchedule.getScheduleId(),
                classSchedule.getClassType().getTypeName(),
                (long) classBookings.size(),
                fillRate
            ));
        });
        
        // Sắp xếp theo số lượng đặt lịch và giới hạn top 5
        List<ClassBookingStats> sortedTopClasses = topClasses.stream()
            .sorted((a, b) -> b.getBookingsCount().compareTo(a.getBookingsCount()))
            .limit(5)
            .collect(Collectors.toList());
        
        // Tạo đối tượng thống kê
        return BookingStatsResponse.builder()
            .totalBookings(totalBookings)
            .gymSessionsCount(gymSessionsCount)
            .ptSessionsCount(ptSessionsCount)
            .classBookingsCount(classBookingsCount)
            .pendingCount(pendingCount)
            .confirmedCount(confirmedCount)
            .cancelledCount(cancelledCount)
            .completedCount(completedCount)
            .noShowCount(noShowCount)
            .dailyBookingCounts(dailyBookingCounts)
            .popularTimeSlots(popularTimeSlots)
            .topTrainers(topTrainers)
            .topClasses(sortedTopClasses)
            .build();
    }

    @Override
    public Page<BookingResponse> getCurrentBookings(Pageable pageable) {
        LocalDateTime now = LocalDateTime.now();
        
        // Lấy tất cả các booking đang diễn ra (thời gian bắt đầu đã qua, thời gian kết thúc chưa tới)
        List<Booking> currentBookings = bookingRepository.findAll().stream()
            .filter(b -> b.getStatus() == BookingStatus.CONFIRMED || b.getStatus() == BookingStatus.PENDING)
            .filter(b -> !b.getStartDateTime().isAfter(now) && !b.getEndDateTime().isBefore(now))
            .collect(Collectors.toList());
        
        // Tạo phân trang từ danh sách đã lọc
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), currentBookings.size());
        
        if (start >= currentBookings.size() && !currentBookings.isEmpty()) {
            start = 0;
            end = Math.min(pageable.getPageSize(), currentBookings.size());
        }
        
        List<BookingResponse> bookingResponses = new ArrayList<>();
        if (!currentBookings.isEmpty() && end > start) {
            bookingResponses = currentBookings
                .subList(start, end)
                .stream()
                .map(this::mapToBookingResponse)
                .collect(Collectors.toList());
        }
        
        return new PageImpl<>(bookingResponses, pageable, currentBookings.size());
    }

    @Override
    public Page<BookingResponse> getUpcomingBookings(Integer days, Pageable pageable) {
        int daysToLookAhead = days != null ? days : 7; // Mặc định là 7 ngày
        
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime futureLimit = now.plusDays(daysToLookAhead);
        
        // Lấy các booking sắp tới (thời gian bắt đầu trong tương lai và trong khoảng ngày chỉ định)
        List<Booking> upcomingBookings = bookingRepository.findAll().stream()
            .filter(b -> b.getStatus() == BookingStatus.CONFIRMED || b.getStatus() == BookingStatus.PENDING)
            .filter(b -> b.getStartDateTime().isAfter(now) && b.getStartDateTime().isBefore(futureLimit))
            .sorted((a, b) -> a.getStartDateTime().compareTo(b.getStartDateTime()))
            .collect(Collectors.toList());
        
        // Tạo phân trang từ danh sách đã lọc
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), upcomingBookings.size());
        
        if (start >= upcomingBookings.size() && !upcomingBookings.isEmpty()) {
            start = 0;
            end = Math.min(pageable.getPageSize(), upcomingBookings.size());
        }
        
        List<BookingResponse> bookingResponses = new ArrayList<>();
        if (!upcomingBookings.isEmpty() && end > start) {
            bookingResponses = upcomingBookings
                .subList(start, end)
                .stream()
                .map(this::mapToBookingResponse)
                .collect(Collectors.toList());
        }
        
        return new PageImpl<>(bookingResponses, pageable, upcomingBookings.size());
    }
    
    // Phương thức hỗ trợ
    private BookingResponse mapToBookingResponse(Booking booking) {
        BookingResponse response = new BookingResponse();
        
        response.setBookingId(booking.getBookingId());
        response.setUserId(booking.getUser().getUserId());
        response.setUserName(booking.getUser().getName());
        response.setUserEmail(booking.getUser().getEmail());
        response.setBookingType(booking.getBookingType().toString());
        response.setStartDateTime(booking.getStartDateTime());
        response.setEndDateTime(booking.getEndDateTime());
        response.setLocation(booking.getLocation());
        response.setStatus(booking.getStatus().toString());
        response.setNotes(booking.getNotes());
        response.setCreatedAt(booking.getCreatedAt());
        response.setUpdatedAt(booking.getUpdatedAt());
        
        if (booking.getTrainer() != null) {
            response.setTrainerId(booking.getTrainer().getTrainerId());
            response.setTrainerName(booking.getTrainer().getUser().getName());
        }
        
        if (booking.getClassSchedule() != null) {
            response.setClassScheduleId(booking.getClassSchedule().getScheduleId());
            response.setClassName(booking.getClassSchedule().getClassType().getTypeName());
        }
        
        return response;
    }
    
    private BookingDetailResponse mapToBookingDetailResponse(Booking booking) {
        BookingDetailResponse response = new BookingDetailResponse();
        
        response.setBookingId(booking.getBookingId());
        
        // User info
        User user = booking.getUser();
        response.setUserId(user.getUserId());
        response.setUserName(user.getName());
        response.setUserEmail(user.getEmail());
        response.setUserPhone(user.getPhoneNumber());
        // Đảm bảo convert Gender enum sang String một cách an toàn
        response.setUserGender(user.getGender() != null ? user.getGender().toString() : null);
        
        // Booking details
        response.setBookingType(booking.getBookingType().toString());
        response.setStartDateTime(booking.getStartDateTime());
        response.setEndDateTime(booking.getEndDateTime());
        response.setLocation(booking.getLocation());
        response.setStatus(booking.getStatus().toString());
        response.setNotes(booking.getNotes());
        response.setCreatedAt(booking.getCreatedAt());
        response.setUpdatedAt(booking.getUpdatedAt());
        
        // Trainer info
        if (booking.getTrainer() != null) {
            TrainerProfile trainer = booking.getTrainer();
            response.setTrainerId(trainer.getTrainerId());
            response.setTrainerName(trainer.getUser().getName());
            // Sửa từ getSpecialties() sang getSpecialization()
            response.setTrainerSpecialty(trainer.getSpecialization());
            
            // PT Package info cho PT_SESSION
            if (booking.getBookingType() == BookingType.PT_SESSION) {
                UserPTPackage ptPackage = ptPackageRepository.findFirstByUserAndTrainerOrderByEndDateDesc(
                        user, trainer).orElse(null);
                
                if (ptPackage != null) {
                    response.setPackageId(ptPackage.getUserPackageId());
                    response.setPackageName(ptPackage.getPtPackage().getPackageName());
                    response.setSessionsRemaining(ptPackage.getSessionsRemaining());
                }
            }
        }
        
        // Class info
        if (booking.getClassSchedule() != null) {
            ClassSchedule classSchedule = booking.getClassSchedule();
            response.setClassScheduleId(classSchedule.getScheduleId());
            response.setClassName(classSchedule.getClassType().getTypeName());
            response.setClassDescription(classSchedule.getClassType().getDescription());
            response.setMaxParticipants(classSchedule.getMaxAttendees());
            
            // Tính số người tham gia hiện tại bằng cách đếm thủ công
            long currentParticipants = bookingRepository.findAll().stream()
                    .filter(b -> b.getClassSchedule() != null && 
                            b.getClassSchedule().getScheduleId().equals(classSchedule.getScheduleId()) &&
                            b.getStatus() == BookingStatus.CONFIRMED)
                    .count();
            
            response.setCurrentParticipants((int) currentParticipants);
        }
        
        // Kiểm tra thông tin check-in
        checkInOutRepository.findFirstByBookingOrderByCheckInTimeDesc(booking)
            .ifPresent(checkInOut -> {
                response.setCheckInTime(checkInOut.getCheckInTime());
                response.setCompletionTime(checkInOut.getCheckOutTime());
            });
        
        return response;
    }
    
    private void checkTimeConflicts(Long userId, LocalDateTime startTime, LocalDateTime endTime, Long excludeBookingId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));
        
        List<Booking> userBookings = bookingRepository.findByUser(user);
        
        boolean hasConflict = userBookings.stream()
            .filter(b -> !b.getStatus().equals(BookingStatus.CANCELLED))
            .filter(b -> excludeBookingId == null || !b.getBookingId().equals(excludeBookingId))
            .anyMatch(booking -> {
                return (startTime.isBefore(booking.getEndDateTime()) && 
                        endTime.isAfter(booking.getStartDateTime()));
            });
        
        if (hasConflict) {
            throw new BadRequestException("Thời gian đặt lịch xung đột với lịch đặt khác của người dùng");
        }
    }
    
    private void checkTrainerAvailability(Long trainerId, LocalDateTime startTime, LocalDateTime endTime) {
        List<Booking> trainerBookings = bookingRepository.findByTrainerAndDateRange(
                trainerId, startTime.minusHours(1), endTime.plusHours(1));
        
        boolean hasConflict = trainerBookings.stream()
            .filter(b -> !b.getStatus().equals(BookingStatus.CANCELLED))
            .anyMatch(booking -> {
                return (startTime.isBefore(booking.getEndDateTime()) && 
                        endTime.isAfter(booking.getStartDateTime()));
            });
        
        if (hasConflict) {
            throw new BadRequestException("Huấn luyện viên không còn trống lịch trong khoảng thời gian này");
        }
    }
}