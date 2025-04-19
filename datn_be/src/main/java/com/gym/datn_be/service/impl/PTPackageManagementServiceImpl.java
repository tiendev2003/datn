package com.gym.datn_be.service.impl;

import java.math.BigDecimal;
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
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.dto.request.PTPackageCreateRequest;
import com.gym.datn_be.dto.request.PTPackageUpdateRequest;
import com.gym.datn_be.dto.request.PackageExtensionRequest;
import com.gym.datn_be.dto.request.UserPTPackageFilterRequest;
import com.gym.datn_be.dto.response.PTPackageDetailResponse;
import com.gym.datn_be.dto.response.PTPackageHistoryResponse;
import com.gym.datn_be.dto.response.PTPackageResponse;
import com.gym.datn_be.dto.response.PTPackageStatsResponse;
import com.gym.datn_be.dto.response.UserPTPackageResponse;
import com.gym.datn_be.entity.PTPackage;
import com.gym.datn_be.entity.PTSession;
import com.gym.datn_be.entity.TrainerProfile;
import com.gym.datn_be.entity.User;
import com.gym.datn_be.entity.UserPTPackage;
import com.gym.datn_be.entity.UserPTPackage.PackageStatus;
import com.gym.datn_be.exception.BadRequestException;
import com.gym.datn_be.exception.ResourceNotFoundException;
import com.gym.datn_be.repository.PTPackageRepository;
import com.gym.datn_be.repository.PTSessionRepository;
import com.gym.datn_be.repository.TrainerProfileRepository;
import com.gym.datn_be.repository.UserPTPackageRepository;
import com.gym.datn_be.repository.UserRepository;
import com.gym.datn_be.service.EmailService;
import com.gym.datn_be.service.NotificationService;
import com.gym.datn_be.service.PTPackageManagementService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PTPackageManagementServiceImpl implements PTPackageManagementService {

    private final PTPackageRepository ptPackageRepository;
    private final UserPTPackageRepository userPTPackageRepository;
    private final TrainerProfileRepository trainerProfileRepository;
    private final UserRepository userRepository;
    private final PTSessionRepository ptSessionRepository;
    private final EmailService emailService;
    private final NotificationService notificationService;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<PTPackageResponse> getAllPTPackages() {
        List<PTPackage> packages = ptPackageRepository.findAll();
        return packages.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PTPackageDetailResponse getPTPackageDetails(Long packageId) {
        PTPackage ptPackage = ptPackageRepository.findById(packageId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy gói PT với ID: " + packageId));

        return convertToDetailResponse(ptPackage);
    }

    @Override
    @Transactional
    public PTPackageDetailResponse createPTPackage(PTPackageCreateRequest request) {
        // Validate dữ liệu
        validatePackageRequest(request.getPackageName());

        // Tạo gói mới
        PTPackage newPackage = new PTPackage();
        newPackage.setPackageName(request.getPackageName());
        newPackage.setDescription(request.getDescription());
        newPackage.setNumberOfSessions(request.getNumberOfSessions());
        newPackage.setValidityDays(request.getValidityDays());
        newPackage.setPrice(request.getPrice());
        newPackage.setActive(request.isActive());
        newPackage.setCreatedAt(LocalDateTime.now());
        newPackage.setUpdatedAt(LocalDateTime.now());

        // Lưu gói PT
        PTPackage savedPackage = ptPackageRepository.save(newPackage);

        return convertToDetailResponse(savedPackage);
    }

    @Override
    @Transactional
    public PTPackageDetailResponse updatePTPackage(Long packageId, PTPackageUpdateRequest request) {
        // Tìm gói PT cần update
        PTPackage existingPackage = ptPackageRepository.findById(packageId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy gói PT với ID: " + packageId));

        // Cập nhật thông tin
        if (request.getPackageName() != null) {
            existingPackage.setPackageName(request.getPackageName());
        }

        if (request.getDescription() != null) {
            existingPackage.setDescription(request.getDescription());
        }

        if (request.getNumberOfSessions() != null) {
            existingPackage.setNumberOfSessions(request.getNumberOfSessions());
        }

        if (request.getValidityDays() != null) {
            existingPackage.setValidityDays(request.getValidityDays());
        }

        if (request.getPrice() != null) {
            existingPackage.setPrice(request.getPrice());
        }

        if (request.getIsActive() != null) {
            existingPackage.setActive(request.getIsActive());
        }

        existingPackage.setUpdatedAt(LocalDateTime.now());

        // Lưu gói PT đã cập nhật
        PTPackage updatedPackage = ptPackageRepository.save(existingPackage);

        return convertToDetailResponse(updatedPackage);
    }

    @Override
    @Transactional
    public void deletePTPackage(Long packageId) {
        // Tìm gói PT cần xóa
        PTPackage packageToDelete = ptPackageRepository.findById(packageId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy gói PT với ID: " + packageId));

        // Kiểm tra xem có ai đang sử dụng gói này không
        List<UserPTPackage> activeUsers = userPTPackageRepository.findByPtPackageAndPackageStatus(
                packageToDelete, PackageStatus.ACTIVE);

        if (!activeUsers.isEmpty()) {
            throw new BadRequestException(
                    "Không thể xóa gói PT vì đang có " + activeUsers.size() + " người đang sử dụng gói này");
        }

        // Xóa gói PT
        ptPackageRepository.delete(packageToDelete);
    }

    @Override
    @Transactional
    public void activatePTPackage(Long packageId) {
        PTPackage packageToActivate = ptPackageRepository.findById(packageId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy gói PT với ID: " + packageId));

        packageToActivate.setActive(true);
        packageToActivate.setUpdatedAt(LocalDateTime.now());
        ptPackageRepository.save(packageToActivate);
    }

    @Override
    @Transactional
    public void deactivatePTPackage(Long packageId) {
        PTPackage packageToDeactivate = ptPackageRepository.findById(packageId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy gói PT với ID: " + packageId));

        packageToDeactivate.setActive(false);
        packageToDeactivate.setUpdatedAt(LocalDateTime.now());
        ptPackageRepository.save(packageToDeactivate);
    }

    @Override
    public Page<UserPTPackageResponse> getAllUserPTPackages(String keyword, String status, Long trainerId,
            Long packageTypeId, Pageable pageable) {

        // Tạo specification để lọc
        Specification<UserPTPackage> spec = createSpecification(keyword, status, trainerId, packageTypeId);

        // Lấy danh sách đăng ký gói PT theo các điều kiện lọc
        Page<UserPTPackage> userPTPackages = userPTPackageRepository.findAll(spec, pageable);

        // Chuyển đổi sang response
        List<UserPTPackageResponse> responseList = userPTPackages.getContent().stream()
                .map(this::convertToUserPackageResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, userPTPackages.getTotalElements());
    }

    @Override
    public UserPTPackageResponse getUserPTPackageDetails(Long userPackageId) {
        UserPTPackage userPackage = userPTPackageRepository.findById(userPackageId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Không tìm thấy đăng ký gói PT với ID: " + userPackageId));

        UserPTPackageResponse response = convertToUserPackageResponse(userPackage);

        // Bổ sung thông tin về buổi tập gần nhất và sắp tới (nếu có)
        addSessionInfo(userPackage, response);

        return response;
    }

    @Override
    @Transactional
    public void cancelUserPTPackage(Long userPackageId, String reason) {
        UserPTPackage userPackage = userPTPackageRepository.findById(userPackageId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Không tìm thấy đăng ký gói PT với ID: " + userPackageId));

        // Chỉ có thể hủy gói đang hoạt động
        if (userPackage.getPackageStatus() != PackageStatus.ACTIVE) {
            throw new BadRequestException("Chỉ có thể hủy các gói PT đang hoạt động.");
        }

        // Cập nhật trạng thái
        userPackage.setPackageStatus(PackageStatus.CANCELLED);
        userPackage.setNotes(reason != null ? userPackage.getNotes() + "\nHủy gói: " + reason : userPackage.getNotes());
        userPackage.setUpdatedAt(LocalDateTime.now());
        userPTPackageRepository.save(userPackage);

        // Hủy các buổi tập đã lên lịch
        List<PTSession> pendingSessions = ptSessionRepository.findByUserPackageAndStatusPending(userPackage);
        for (PTSession session : pendingSessions) {
            // Cập nhật trạng thái buổi tập
            session.getBooking().setStatus(com.gym.datn_be.entity.Booking.BookingStatus.CANCELLED);
            session.setSessionNotes(reason != null ? session.getSessionNotes() + "\nHủy buổi tập do hủy gói: " + reason
                    : session.getSessionNotes() + "\nHủy buổi tập do hủy gói.");
            ptSessionRepository.save(session);
        }

        // Thông báo cho người dùng
        User user = userPackage.getUser();
        String packageName = userPackage.getPtPackage().getPackageName();
        TrainerProfile trainer = userPackage.getTrainer();

        String message = "Gói PT " + packageName + " với huấn luyện viên " + trainer.getUser().getName() +
                " đã bị hủy. Lý do: " + (reason != null ? reason : "Không có lý do cụ thể.");

        // Gửi thông báo
        notificationService.sendNotification(user.getUserId(), "Gói PT đã bị hủy", message, "/profile/pt-packages");

        // Gửi email
        emailService.sendPTPackageCancelledEmail(user.getEmail(), user.getName(), packageName,
                trainer.getUser().getName(), userPackage.getSessionsRemaining(), reason);
    }

    @Override
    @Transactional
    public void addSessionsToUserPTPackage(Long userPackageId, Integer sessionsToAdd, String reason) {
        if (sessionsToAdd <= 0) {
            throw new BadRequestException("Số buổi tập thêm phải lớn hơn 0");
        }

        UserPTPackage userPackage = userPTPackageRepository.findById(userPackageId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Không tìm thấy đăng ký gói PT với ID: " + userPackageId));

        // Chỉ có thể thêm buổi tập cho gói đang hoạt động
        if (userPackage.getPackageStatus() != PackageStatus.ACTIVE) {
            throw new BadRequestException("Chỉ có thể thêm buổi tập cho các gói PT đang hoạt động");
        }

        // Cập nhật số buổi tập còn lại
        int currentSessions = userPackage.getSessionsRemaining();
        userPackage.setSessionsRemaining(currentSessions + sessionsToAdd);
        userPackage
                .setNotes(reason != null ? userPackage.getNotes() + "\nThêm " + sessionsToAdd + " buổi tập: " + reason
                        : userPackage.getNotes() + "\nThêm " + sessionsToAdd + " buổi tập.");
        userPackage.setUpdatedAt(LocalDateTime.now());
        userPTPackageRepository.save(userPackage);

        // Thông báo cho người dùng
        User user = userPackage.getUser();
        String packageName = userPackage.getPtPackage().getPackageName();

        String message = "Đã thêm " + sessionsToAdd + " buổi tập vào gói PT " + packageName +
                ". Tổng số buổi tập còn lại: " + userPackage.getSessionsRemaining();

        // Gửi thông báo
        notificationService.sendNotification(user.getUserId(), "Đã thêm buổi tập", message, "/profile/pt-packages");

        // Gửi email
        emailService.sendPTPackageUpdatedEmail(user.getEmail(), user.getName(), packageName,
                sessionsToAdd, "buổi tập", userPackage.getSessionsRemaining(),
                null, userPackage.getEndDate(), reason);
    }

    @Override
    @Transactional
    public void extendUserPTPackage(Long userPackageId, Integer daysToAdd, String reason) {
        if (daysToAdd <= 0) {
            throw new BadRequestException("Số ngày gia hạn phải lớn hơn 0");
        }

        UserPTPackage userPackage = userPTPackageRepository.findById(userPackageId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Không tìm thấy đăng ký gói PT với ID: " + userPackageId));

        // Chỉ có thể gia hạn gói đang hoạt động
        if (userPackage.getPackageStatus() != PackageStatus.ACTIVE) {
            throw new BadRequestException("Chỉ có thể gia hạn các gói PT đang hoạt động");
        }

        // Lưu ngày kết thúc hiện tại để thông báo
        LocalDate currentEndDate = userPackage.getEndDate();

        // Cập nhật ngày kết thúc
        LocalDate newEndDate = userPackage.getEndDate().plusDays(daysToAdd);
        userPackage.setEndDate(newEndDate);
        userPackage
                .setNotes(reason != null ? userPackage.getNotes() + "\nGia hạn thêm " + daysToAdd + " ngày: " + reason
                        : userPackage.getNotes() + "\nGia hạn thêm " + daysToAdd + " ngày.");
        userPackage.setUpdatedAt(LocalDateTime.now());
        userPTPackageRepository.save(userPackage);

        // Thông báo cho người dùng
        User user = userPackage.getUser();
        String packageName = userPackage.getPtPackage().getPackageName();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        String message = "Gói PT " + packageName + " đã được gia hạn thêm " + daysToAdd +
                " ngày. Ngày kết thúc mới: " + formatter.format(newEndDate);

        // Gửi thông báo
        notificationService.sendNotification(user.getUserId(), "Gia hạn gói PT", message, "/profile/pt-packages");

        // Gửi email
        emailService.sendPTPackageUpdatedEmail(user.getEmail(), user.getName(), packageName,
                daysToAdd, "ngày", userPackage.getSessionsRemaining(),
                currentEndDate, newEndDate, reason);
    }

    @Override
    public PTPackageStatsResponse getPTPackageStatistics(String startDateStr, String endDateStr) {
        // Xử lý tham số ngày
        LocalDate startDate = null;
        LocalDate endDate = null;

        if (startDateStr != null) {
            startDate = LocalDate.parse(startDateStr);
        } else {
            startDate = LocalDate.now().minusMonths(1);
        }

        if (endDateStr != null) {
            endDate = LocalDate.parse(endDateStr);
        } else {
            endDate = LocalDate.now();
        }

        // Lấy dữ liệu thống kê
        List<PTPackage> allPackages = ptPackageRepository.findAll();
        List<UserPTPackage> allUserPackages = userPTPackageRepository.findByCreatedAtBetween(
                startDate.atStartOfDay(), endDate.atTime(23, 59, 59));

        // Tạo phản hồi thống kê
        PTPackageStatsResponse response = new PTPackageStatsResponse();

        // Thống kê gói PT
        response.setTotalPackages(allPackages.size());
        response.setActivePackages((int) allPackages.stream().filter(PTPackage::isActive).count());
        response.setInactivePackages((int) allPackages.stream().filter(p -> !p.isActive()).count());

        // Thống kê đăng ký
        response.setTotalUserRegistrations(allUserPackages.size());
        response.setActiveUserRegistrations((int) allUserPackages.stream()
                .filter(p -> p.getPackageStatus() == PackageStatus.ACTIVE).count());
        response.setExpiredUserRegistrations((int) allUserPackages.stream()
                .filter(p -> p.getPackageStatus() == PackageStatus.EXPIRED).count());
        response.setCancelledUserRegistrations((int) allUserPackages.stream()
                .filter(p -> p.getPackageStatus() == PackageStatus.CANCELLED).count());

        // Thống kê doanh thu
        BigDecimal totalRevenue = allUserPackages.stream()
                .map(UserPTPackage::getActualPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        response.setTotalRevenue(totalRevenue);

        // Thống kê giá
        response.setAveragePackagePrice(allPackages.isEmpty() ? BigDecimal.ZERO
                : allPackages.stream()
                        .map(PTPackage::getPrice)
                        .reduce(BigDecimal.ZERO, BigDecimal::add)
                        .divide(BigDecimal.valueOf(allPackages.size()), 2, BigDecimal.ROUND_HALF_UP));

        response.setHighestPackagePrice(allPackages.isEmpty() ? BigDecimal.ZERO
                : allPackages.stream()
                        .map(PTPackage::getPrice)
                        .max(BigDecimal::compareTo)
                        .orElse(BigDecimal.ZERO));

        response.setLowestPackagePrice(allPackages.isEmpty() ? BigDecimal.ZERO
                : allPackages.stream()
                        .map(PTPackage::getPrice)
                        .min(BigDecimal::compareTo)
                        .orElse(BigDecimal.ZERO));

        // Thêm biểu đồ phân phối theo trạng thái
        Map<String, Integer> statusCounts = new HashMap<>();
        statusCounts.put("ACTIVE", response.getActiveUserRegistrations());
        statusCounts.put("EXPIRED", response.getExpiredUserRegistrations());
        statusCounts.put("CANCELLED", response.getCancelledUserRegistrations());
        statusCounts.put("COMPLETED", (int) allUserPackages.stream()
                .filter(p -> p.getPackageStatus() == PackageStatus.COMPLETED).count());
        response.setPackagesCountByStatus(statusCounts);

        // Thêm thống kê doanh thu và đăng ký theo tháng
        Map<String, BigDecimal> revenueByMonth = new HashMap<>();
        Map<String, Integer> registrationsByMonth = new HashMap<>();

        for (UserPTPackage userPackage : allUserPackages) {
            LocalDateTime createdAt = userPackage.getCreatedAt();
            String monthKey = createdAt.getYear() + "-" +
                    (createdAt.getMonthValue() < 10 ? "0" + createdAt.getMonthValue() : createdAt.getMonthValue());

            // Cập nhật doanh thu theo tháng
            if (revenueByMonth.containsKey(monthKey)) {
                revenueByMonth.put(monthKey, revenueByMonth.get(monthKey).add(userPackage.getActualPrice()));
            } else {
                revenueByMonth.put(monthKey, userPackage.getActualPrice());
            }

            // Cập nhật số lượng đăng ký theo tháng
            if (registrationsByMonth.containsKey(monthKey)) {
                registrationsByMonth.put(monthKey, registrationsByMonth.get(monthKey) + 1);
            } else {
                registrationsByMonth.put(monthKey, 1);
            }
        }

        response.setRevenueByMonth(revenueByMonth);
        response.setRegistrationsByMonth(registrationsByMonth);

        // Lấy top 5 gói PT theo doanh thu
        List<PTPackageResponse> topPackagesByRevenue = new ArrayList<>();

        // Logic tính toán top gói theo doanh thu ở đây
        // (thực tế cần query theo group by và sum trong repository)

        // Lấy top 5 gói PT theo số người dùng
        List<PTPackageResponse> topPackagesByUsers = new ArrayList<>();
        // Logic tính toán top gói theo số người dùng ở đây

        response.setTopPackagesByRevenue(topPackagesByRevenue);
        response.setTopPackagesByUsers(topPackagesByUsers);

        return response;
    }

    @Override
    public Page<UserPTPackageResponse> searchUserPTPackages(UserPTPackageFilterRequest request, Pageable pageable) {
        // Tạo specification để lọc nâng cao
        Specification<UserPTPackage> spec = createAdvancedSpecification(request);

        // Query theo specification
        Page<UserPTPackage> results = userPTPackageRepository.findAll(spec, pageable);

        // Chuyển đổi sang response
        List<UserPTPackageResponse> responseList = results.getContent().stream()
                .map(this::convertToUserPackageResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responseList, pageable, results.getTotalElements());
    }

    @Override
    public List<PTPackageHistoryResponse> getPTPackageHistory(Long packageId) {
        // Tìm gói PT
        PTPackage ptPackage = ptPackageRepository.findById(packageId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy gói PT với ID: " + packageId));

        // Tạo danh sách lịch sử thay đổi
        List<PTPackageHistoryResponse> history = new ArrayList<>();

        // Thêm sự kiện tạo gói
        history.add(PTPackageHistoryResponse.builder()
                .historyId(1L)
                .packageId(packageId)
                .packageName(ptPackage.getPackageName())
                .action("CREATE")
                .timestamp(ptPackage.getCreatedAt())
                .username("Admin")
                .fieldChanged("all")
                .oldValue(null)
                .newValue("Tạo gói PT mới")
                .description(ptPackage.getDescription())
                .numberOfSessions(ptPackage.getNumberOfSessions())
                .validityDays(ptPackage.getValidityDays())
                .price(ptPackage.getPrice())
                .wasActive(ptPackage.isActive())
                .build());

        // Thêm sự kiện cập nhật (nếu có)
        if (ptPackage.getUpdatedAt() != null &&
                !ptPackage.getUpdatedAt().equals(ptPackage.getCreatedAt())) {
            history.add(PTPackageHistoryResponse.builder()
                    .historyId(2L)
                    .packageId(packageId)
                    .packageName(ptPackage.getPackageName())
                    .action("UPDATE")
                    .timestamp(ptPackage.getUpdatedAt())
                    .username("Admin")
                    .fieldChanged("various")
                    .oldValue(null)
                    .newValue("Cập nhật thông tin gói PT")
                    .description(ptPackage.getDescription())
                    .numberOfSessions(ptPackage.getNumberOfSessions())
                    .validityDays(ptPackage.getValidityDays())
                    .price(ptPackage.getPrice())
                    .wasActive(ptPackage.isActive())
                    .build());
        }

        // Thêm sự kiện thay đổi trạng thái (nếu có)
        if (!ptPackage.isActive()) {
            history.add(PTPackageHistoryResponse.builder()
                    .historyId(3L)
                    .packageId(packageId)
                    .packageName(ptPackage.getPackageName())
                    .action("DEACTIVATE")
                    .timestamp(ptPackage.getUpdatedAt())
                    .username("Admin")
                    .fieldChanged("active")
                    .oldValue("true")
                    .newValue("false")
                    .description(ptPackage.getDescription())
                    .numberOfSessions(ptPackage.getNumberOfSessions())
                    .validityDays(ptPackage.getValidityDays())
                    .price(ptPackage.getPrice())
                    .wasActive(false)
                    .build());
        }

        // Lấy danh sách đăng ký gói này để hiển thị lịch sử sử dụng
        // Kiểm tra xem repository có phương thức này không
        List<UserPTPackage> userPackages = new ArrayList<>();
        try {
            userPackages = userPTPackageRepository.findByPtPackage(ptPackage);
            // Sắp xếp theo thời gian giảm dần (mới nhất trước)
            userPackages.sort((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()));
        } catch (Exception e) {
            log.error("Error retrieving user PT packages: {}", e.getMessage());
        }

        int counter = 4;
        for (UserPTPackage userPackage : userPackages) {
            history.add(PTPackageHistoryResponse.builder()
                    .historyId((long) counter++)
                    .packageId(packageId)
                    .packageName(ptPackage.getPackageName())
                    .action("REGISTRATION")
                    .timestamp(userPackage.getCreatedAt())
                    .username(userPackage.getUser().getName())
                    .fieldChanged("registration")
                    .oldValue(null)
                    .newValue("Đăng ký gói PT bởi: " + userPackage.getUser().getName() +
                            ", HLV: " + userPackage.getTrainer().getUser().getName())
                    .description(ptPackage.getDescription())
                    .numberOfSessions(ptPackage.getNumberOfSessions())
                    .validityDays(ptPackage.getValidityDays())
                    .price(ptPackage.getPrice())
                    .wasActive(ptPackage.isActive())
                    .build());
        }

        // Sắp xếp lịch sử theo thời gian giảm dần (mới nhất lên đầu)
        history.sort((h1, h2) -> h2.getTimestamp().compareTo(h1.getTimestamp()));

        return history;
    }

    @Override
    public Page<PackageExtensionRequest> getExtensionRequests(String status, Pageable pageable) {
        // Lấy danh sách đề xuất gia hạn gói PT
        // Giả sử có bảng quản lý đề xuất gia hạn

        // Mock data cho ví dụ
        List<PackageExtensionRequest> requests = new ArrayList<>();

        return new PageImpl<>(requests, pageable, 0);
    }

    @Override
    @Transactional
    public void approveExtensionRequest(Long requestId) {
        // Thực hiện phê duyệt đề xuất gia hạn

        // Thực tế cần lấy đề xuất từ cơ sở dữ liệu, cập nhật trạng thái và xử lý gia
        // hạn

        // Ví dụ xử lý gia hạn...
    }

    @Override
    @Transactional
    public void rejectExtensionRequest(Long requestId, String reason) {
        // Thực hiện từ chối đề xuất gia hạn

        // Thực tế cần lấy đề xuất từ cơ sở dữ liệu, cập nhật trạng thái thành từ chối
    }

    @Override
    @Transactional
    public int notifyExpiringPackages(Integer daysThreshold) {
        // Mặc định là 7 ngày nếu không có tham số
        if (daysThreshold == null) {
            daysThreshold = 7;
        }

        // Lấy ngày hiện tại và ngày để check (hôm nay + daysThreshold)
        LocalDate today = LocalDate.now();
        LocalDate expiryCheckDate = today.plusDays(daysThreshold);

        // Tìm các gói PT sẽ hết hạn trong khoảng thời gian xác định
        List<UserPTPackage> expiringPackages = userPTPackageRepository.findExpiringPackages(
                today, expiryCheckDate, PackageStatus.ACTIVE);

        // Gửi thông báo cho từng người dùng
        for (UserPTPackage userPackage : expiringPackages) {
            User user = userPackage.getUser();
            PTPackage ptPackage = userPackage.getPtPackage();

            // Tạo thông báo
            String title = "Gói PT sắp hết hạn";
            String message = "Gói PT " + ptPackage.getPackageName() + " của bạn sẽ hết hạn vào ngày "
                    + userPackage.getEndDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + ". "
                    + "Hãy liên hệ với chúng tôi để gia hạn.";

            // Gửi thông báo trong hệ thống
            notificationService.sendNotification(user.getUserId(), title, message, "/profile/pt-packages");

            // Gửi email
            emailService.sendPackageExpirationReminderEmail(
                    user.getEmail(),
                    user.getName(),
                    ptPackage.getPackageName(),
                    userPackage.getEndDate(),
                    userPackage.getSessionsRemaining(),
                    daysThreshold);
        }

        return expiringPackages.size();
    }

    // Các phương thức hỗ trợ

    private PTPackageResponse convertToResponse(PTPackage ptPackage) {
        // Đếm số người đang sử dụng gói này
        int activeUsers = userPTPackageRepository.countByPtPackageAndPackageStatus(
                ptPackage, PackageStatus.ACTIVE);

        return PTPackageResponse.builder()
                .packageId(ptPackage.getPackageId())
                .packageName(ptPackage.getPackageName())
                .description(ptPackage.getDescription())
                .numberOfSessions(ptPackage.getNumberOfSessions())
                .validityDays(ptPackage.getValidityDays())
                .price(ptPackage.getPrice())
                .isActive(ptPackage.isActive())
                .createdAt(ptPackage.getCreatedAt())
                .updatedAt(ptPackage.getUpdatedAt())
                .activeUsersCount(activeUsers)
                .build();
    }

    private PTPackageDetailResponse convertToDetailResponse(PTPackage ptPackage) {
        // Đếm số người dùng theo từng trạng thái
        int totalUsers = userPTPackageRepository.countByPtPackage(ptPackage);
        int activeUsers = userPTPackageRepository.countByPtPackageAndPackageStatus(
                ptPackage, PackageStatus.ACTIVE);
        int expiredUsers = userPTPackageRepository.countByPtPackageAndPackageStatus(
                ptPackage, PackageStatus.EXPIRED);
        int cancelledUsers = userPTPackageRepository.countByPtPackageAndPackageStatus(
                ptPackage, PackageStatus.CANCELLED);

        // Tính giá sau khi giảm
        BigDecimal finalPrice = ptPackage.getPrice();

        // Lấy danh sách đăng ký gần đây
        List<UserPTPackage> recentPackages = userPTPackageRepository.findTop5ByPtPackageOrderByCreatedAtDesc(ptPackage);
        List<UserPTPackageResponse> recentRegistrations = recentPackages.stream()
                .map(this::convertToUserPackageResponse)
                .collect(Collectors.toList());

        return PTPackageDetailResponse.builder()
                .packageId(ptPackage.getPackageId())
                .packageName(ptPackage.getPackageName())
                .description(ptPackage.getDescription())
                .numberOfSessions(ptPackage.getNumberOfSessions())
                .validityDays(ptPackage.getValidityDays())
                .price(ptPackage.getPrice())
                .finalPrice(finalPrice)
                .isActive(ptPackage.isActive())
                .createdAt(ptPackage.getCreatedAt())
                .updatedAt(ptPackage.getUpdatedAt())
                .totalUsers(totalUsers)
                .activeUsers(activeUsers)
                .expiredUsers(expiredUsers)
                .cancelledUsers(cancelledUsers)
                .recentRegistrations(recentRegistrations)
                .build();
    }

    private UserPTPackageResponse convertToUserPackageResponse(UserPTPackage userPackage) {
        User user = userPackage.getUser();
        PTPackage ptPackage = userPackage.getPtPackage();
        TrainerProfile trainer = userPackage.getTrainer();

        // Tính số buổi đã sử dụng
        int totalSessions = ptPackage.getNumberOfSessions();
        int remainingSessions = userPackage.getSessionsRemaining();
        int usedSessions = totalSessions - remainingSessions;

        // Đếm số buổi đã hủy
        int cancelledSessions = ptSessionRepository.countCancelledSessionsByUserPackage(userPackage);

        return UserPTPackageResponse.builder()
                .userPackageId(userPackage.getUserPackageId())
                .userId(user.getUserId())
                .userName(user.getName())
                .userEmail(user.getEmail())
                .userPhoneNumber(user.getPhoneNumber())
                .userProfileImage(user.getProfileImage())

                .packageId(ptPackage.getPackageId())
                .packageName(ptPackage.getPackageName())
                .numberOfSessions(ptPackage.getNumberOfSessions())
                .validityDays(ptPackage.getValidityDays())

                .trainerId(trainer.getTrainerId())
                .trainerName(trainer.getUser().getName())
                .trainerSpecialization(trainer.getSpecialization())
                .trainerProfileImage(trainer.getUser().getProfileImage())

                .startDate(userPackage.getStartDate())
                .endDate(userPackage.getEndDate())
                .sessionsRemaining(userPackage.getSessionsRemaining())
                .sessionsUsed(usedSessions)
                .sessionsCancelled(cancelledSessions)
                .packageStatus(userPackage.getPackageStatus())
                .paymentStatus(userPackage.getPaymentStatus())
                .actualPrice(userPackage.getActualPrice())
                .notes(userPackage.getNotes())

                .createdAt(userPackage.getCreatedAt())
                .updatedAt(userPackage.getUpdatedAt())
                .build();
    }

    private void addSessionInfo(UserPTPackage userPackage, UserPTPackageResponse response) {
        // Lấy thông tin buổi tập gần nhất đã hoàn thành
        PTSession lastSession = ptSessionRepository.findTopByUserPackageAndCompletedOrderByEndDateTimeDesc(
                userPackage, true);

        if (lastSession != null) {
            response.setLastSessionDate(lastSession.getBooking().getEndDateTime());
        }

        // Lấy thông tin buổi tập sắp tới
        PTSession nextSession = ptSessionRepository.findTopByUserPackageAndStatusOrderByStartDateTimeAsc(
                userPackage, com.gym.datn_be.entity.Booking.BookingStatus.CONFIRMED);

        if (nextSession != null) {
            response.setNextSessionDate(nextSession.getBooking().getStartDateTime());
        }
    }

    private void validatePackageRequest(String packageName) {
        // Kiểm tra xem tên gói PT đã tồn tại chưa
        boolean exists = ptPackageRepository.existsByPackageNameIgnoreCase(packageName);
        if (exists) {
            throw new BadRequestException("Tên gói PT đã tồn tại");
        }
    }

    private Specification<UserPTPackage> createSpecification(String keyword, String status,
            Long trainerId, Long packageTypeId) {

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Tìm kiếm theo keyword (tên người dùng, email, SĐT)
            if (keyword != null && !keyword.isEmpty()) {
                Join<UserPTPackage, User> userJoin = root.join("user");

                Predicate keywordPredicate = cb.or(
                        cb.like(cb.lower(userJoin.get("name")), "%" + keyword.toLowerCase() + "%"),
                        cb.like(cb.lower(userJoin.get("email")), "%" + keyword.toLowerCase() + "%"),
                        cb.like(userJoin.get("phoneNumber"), "%" + keyword + "%"));

                predicates.add(keywordPredicate);
            }

            // Lọc theo trạng thái
            if (status != null && !status.isEmpty()) {
                try {
                    PackageStatus packageStatus = PackageStatus.valueOf(status);
                    predicates.add(cb.equal(root.get("packageStatus"), packageStatus));
                } catch (IllegalArgumentException e) {
                    // Bỏ qua nếu status không hợp lệ
                    log.warn("Invalid status provided: {}", status);
                }
            }

            // Lọc theo huấn luyện viên
            if (trainerId != null) {
                Join<UserPTPackage, TrainerProfile> trainerJoin = root.join("trainer");
                predicates.add(cb.equal(trainerJoin.get("trainerId"), trainerId));
            }

            // Lọc theo loại gói PT
            if (packageTypeId != null) {
                Join<UserPTPackage, PTPackage> packageJoin = root.join("ptPackage");
                predicates.add(cb.equal(packageJoin.get("packageId"), packageTypeId));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private Specification<UserPTPackage> createAdvancedSpecification(UserPTPackageFilterRequest request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Tìm kiếm theo keyword
            if (request.getKeyword() != null && !request.getKeyword().isEmpty()) {
                Join<UserPTPackage, User> userJoin = root.join("user");

                Predicate keywordPredicate = cb.or(
                        cb.like(cb.lower(userJoin.get("name")), "%" + request.getKeyword().toLowerCase() + "%"),
                        cb.like(cb.lower(userJoin.get("email")), "%" + request.getKeyword().toLowerCase() + "%"),
                        cb.like(userJoin.get("phoneNumber"), "%" + request.getKeyword() + "%"));

                predicates.add(keywordPredicate);
            }

            // Lọc theo loại gói PT
            if (request.getPackageId() != null) {
                Join<UserPTPackage, PTPackage> packageJoin = root.join("ptPackage");
                predicates.add(cb.equal(packageJoin.get("packageId"), request.getPackageId()));
            }

            // Lọc theo huấn luyện viên
            if (request.getTrainerId() != null) {
                Join<UserPTPackage, TrainerProfile> trainerJoin = root.join("trainer");
                predicates.add(cb.equal(trainerJoin.get("trainerId"), request.getTrainerId()));
            }

            // Lọc theo trạng thái gói
            if (request.getPackageStatus() != null) {
                predicates.add(cb.equal(root.get("packageStatus"), request.getPackageStatus()));
            }

            // Lọc theo trạng thái thanh toán
            if (request.getPaymentStatus() != null) {
                predicates.add(cb.equal(root.get("paymentStatus"), request.getPaymentStatus()));
            }

            // Lọc theo ngày đăng ký
            if (request.getRegistrationDateFrom() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("createdAt"),
                        request.getRegistrationDateFrom().atStartOfDay()));
            }
            if (request.getRegistrationDateTo() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("createdAt"),
                        request.getRegistrationDateTo().atTime(23, 59, 59)));
            }

            // Lọc theo ngày bắt đầu
            if (request.getStartDateFrom() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("startDate"), request.getStartDateFrom()));
            }
            if (request.getStartDateTo() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("startDate"), request.getStartDateTo()));
            }

            // Lọc theo ngày kết thúc
            if (request.getEndDateFrom() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("endDate"), request.getEndDateFrom()));
            }
            if (request.getEndDateTo() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("endDate"), request.getEndDateTo()));
            }

            // Lọc theo số buổi tập còn lại
            if (request.getSessionsRemainingMin() != null) {
                predicates
                        .add(cb.greaterThanOrEqualTo(root.get("sessionsRemaining"), request.getSessionsRemainingMin()));
            }
            if (request.getSessionsRemainingMax() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("sessionsRemaining"), request.getSessionsRemainingMax()));
            }

            // Lọc theo giá
            if (request.getPriceMin() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("actualPrice"), request.getPriceMin()));
            }
            if (request.getPriceMax() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("actualPrice"), request.getPriceMax()));
            }

            // Lọc các gói sắp hết hạn (trong 7 ngày tới)
            if (request.getExpiringSoon() != null && request.getExpiringSoon()) {
                LocalDate today = LocalDate.now();
                LocalDate nextWeek = today.plusDays(7);
                predicates.add(cb.between(root.get("endDate"), today, nextWeek));
            }

            // Lọc các gói còn buổi tập
            if (request.getHasSessions() != null && request.getHasSessions()) {
                predicates.add(cb.greaterThan(root.get("sessionsRemaining"), 0));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}