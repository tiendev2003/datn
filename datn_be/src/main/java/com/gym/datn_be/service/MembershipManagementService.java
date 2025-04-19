package com.gym.datn_be.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.dto.request.MembershipAssignRequest;
import com.gym.datn_be.dto.request.MembershipExtendRequest;
import com.gym.datn_be.dto.request.MembershipRenewalRequest;
import com.gym.datn_be.dto.request.MembershipSearchRequest;
import com.gym.datn_be.dto.request.MembershipTypeCreateRequest;
import com.gym.datn_be.dto.request.MembershipTypeUpdateRequest;
import com.gym.datn_be.dto.response.ApiResponse;
import com.gym.datn_be.dto.response.MembershipExpiryResponse;
import com.gym.datn_be.dto.response.MembershipRenewalHistoryResponse;
import com.gym.datn_be.dto.response.MembershipStatsResponse;
import com.gym.datn_be.dto.response.MembershipTypeDetailResponse;
import com.gym.datn_be.dto.response.MembershipTypeResponse;
import com.gym.datn_be.dto.response.UserMembershipResponse;
import com.gym.datn_be.entity.Membership;
import com.gym.datn_be.entity.Membership.MembershipStatus;
import com.gym.datn_be.entity.Membership.PaymentStatus;
import com.gym.datn_be.entity.MembershipBenefit;
import com.gym.datn_be.entity.MembershipRenewal;
import com.gym.datn_be.entity.MembershipType;
import com.gym.datn_be.entity.User;
import com.gym.datn_be.exception.BadRequestException;
import com.gym.datn_be.exception.ResourceNotFoundException;
import com.gym.datn_be.repository.MembershipBenefitRepository;
import com.gym.datn_be.repository.MembershipRenewalRepository;
import com.gym.datn_be.repository.MembershipRepository;
import com.gym.datn_be.repository.MembershipTypeRepository;
import com.gym.datn_be.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MembershipManagementService {

    private final MembershipRepository membershipRepository;
    private final MembershipTypeRepository membershipTypeRepository;
    private final MembershipBenefitRepository membershipBenefitRepository;
    private final MembershipRenewalRepository membershipRenewalRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    // Phương thức quản lý loại gói tập
    public List<MembershipTypeResponse> getAllMembershipTypes() {
        List<MembershipType> types = membershipTypeRepository.findAll();
        return types.stream()
                .map(this::mapToMembershipTypeResponse)
                .collect(Collectors.toList());
    }

    public MembershipTypeDetailResponse getMembershipTypeDetails(Long typeId) {
        MembershipType membershipType = findMembershipTypeById(typeId);
        return mapToMembershipTypeDetailResponse(membershipType);
    }

    @Transactional
    public MembershipTypeDetailResponse createMembershipType(MembershipTypeCreateRequest request) {
        MembershipType membershipType = new MembershipType();
        membershipType.setTypeName(request.getTypeName());
        membershipType.setDescription(request.getDescription());
        membershipType.setDurationDays(request.getDurationDays());
        membershipType.setPrice(BigDecimal.valueOf(request.getPrice()));
        membershipType.setMaxFreezeDays(request.getMaxFreezeDays());
        membershipType.setGuestPasses(request.getGuestPasses());
        membershipType.setActive(true);
        membershipType.setCreatedAt(LocalDateTime.now());
        membershipType.setUpdatedAt(LocalDateTime.now());
        
        MembershipType savedType = membershipTypeRepository.save(membershipType);
        
        return mapToMembershipTypeDetailResponse(savedType);
    }

    @Transactional
    public MembershipTypeDetailResponse updateMembershipType(Long typeId, MembershipTypeUpdateRequest request) {
        MembershipType membershipType = findMembershipTypeById(typeId);
        
        membershipType.setTypeName(request.getTypeName());
        membershipType.setDescription(request.getDescription());
        membershipType.setDurationDays(request.getDurationDays());
        membershipType.setPrice(BigDecimal.valueOf(request.getPrice()));
        membershipType.setMaxFreezeDays(request.getMaxFreezeDays());
        membershipType.setGuestPasses(request.getGuestPasses());
        membershipType.setUpdatedAt(LocalDateTime.now());
        
        MembershipType savedType = membershipTypeRepository.save(membershipType);
        
        return mapToMembershipTypeDetailResponse(savedType);
    }

    @Transactional
    public void deleteMembershipType(Long typeId) {
        MembershipType membershipType = findMembershipTypeById(typeId);
        
        // Kiểm tra xem có gói tập nào đang sử dụng loại gói này không
        List<Membership> activeMemberships = membershipRepository.findByMembershipType(membershipType)
                .stream()
                .filter(m -> m.getMembershipStatus() == MembershipStatus.Active)
                .collect(Collectors.toList());
        
        if (!activeMemberships.isEmpty()) {
            throw new BadRequestException("Không thể xóa loại gói tập vì đang có " + 
                    activeMemberships.size() + " thành viên đang sử dụng");
        }
        
        membershipTypeRepository.delete(membershipType);
    }

    @Transactional
    public void activateMembershipType(Long typeId) {
        MembershipType membershipType = findMembershipTypeById(typeId);
        membershipType.setActive(true);
        membershipType.setUpdatedAt(LocalDateTime.now());
        membershipTypeRepository.save(membershipType);
    }

    @Transactional
    public void deactivateMembershipType(Long typeId) {
        MembershipType membershipType = findMembershipTypeById(typeId);
        membershipType.setActive(false);
        membershipType.setUpdatedAt(LocalDateTime.now());
        membershipTypeRepository.save(membershipType);
    }

    // Phương thức quản lý đăng ký gói tập của người dùng
    public Page<UserMembershipResponse> getAllUserMemberships(String keyword, String status, 
            Long membershipTypeId, Pageable pageable) {
        // Lấy tất cả gói tập và lọc trong bộ nhớ
        // Trong thực tế, nên cài đặt truy vấn phức tạp trong repository để tối ưu
        List<Membership> allMemberships = membershipRepository.findAll();
        
        // Áp dụng các bộ lọc
        List<Membership> filteredMemberships = allMemberships.stream()
                .filter(m -> keyword == null || 
                        m.getUser().getName().toLowerCase().contains(keyword.toLowerCase()) ||
                        m.getUser().getEmail().toLowerCase().contains(keyword.toLowerCase()))
                .filter(m -> status == null || 
                        m.getMembershipStatus().name().equalsIgnoreCase(status))
                .filter(m -> membershipTypeId == null || 
                        m.getMembershipType().getMembershipTypeId().equals(membershipTypeId))
                .collect(Collectors.toList());
        
        // Phân trang thủ công
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filteredMemberships.size());
        
        List<UserMembershipResponse> pagedResponses = filteredMemberships
                .subList(start, end)
                .stream()
                .map(this::mapToUserMembershipResponse)
                .collect(Collectors.toList());
        
        return new PageImpl<>(pagedResponses, pageable, filteredMemberships.size());
    }

    public UserMembershipResponse getUserMembershipDetails(Long membershipId) {
        Membership membership = findMembershipById(membershipId);
        return mapToUserMembershipResponse(membership);
    }

    @Transactional
    public void cancelUserMembership(Long membershipId, String reason) {
        Membership membership = findMembershipById(membershipId);
        
        if (membership.getMembershipStatus() == MembershipStatus.Cancelled) {
            throw new BadRequestException("Gói tập này đã được hủy trước đó");
        }
        
        // Cập nhật trạng thái gói tập
        membership.setMembershipStatus(MembershipStatus.Cancelled);
        membership.setNotes(reason != null ? reason : membership.getNotes());
        membership.setUpdatedAt(LocalDateTime.now());
        
        membershipRepository.save(membership);
        
        // Gửi email thông báo cho người dùng
        sendMembershipCancellationEmail(membership, reason);
    }

    @Transactional
    public void freezeUserMembership(Long membershipId, String startDateStr, String endDateStr, String reason) {
        Membership membership = findMembershipById(membershipId);
        
        if (membership.getMembershipStatus() != MembershipStatus.Active) {
            throw new BadRequestException("Chỉ có thể tạm dừng gói tập đang hoạt động");
        }
        
        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);
        
        // Kiểm tra ngày tạm dừng và kết thúc hợp lệ
        if (startDate.isBefore(LocalDate.now())) {
            throw new BadRequestException("Ngày bắt đầu tạm dừng không thể trước ngày hiện tại");
        }
        
        if (endDate.isBefore(startDate)) {
            throw new BadRequestException("Ngày kết thúc tạm dừng phải sau ngày bắt đầu");
        }
        
        int freezeDays = Period.between(startDate, endDate).getDays() + 1;
        int maxFreezeDays = membership.getMembershipType().getMaxFreezeDays();
        int usedFreezeDays = membership.getFreezeDaysUsed() != null ? membership.getFreezeDaysUsed() : 0;
        
        if (freezeDays + usedFreezeDays > maxFreezeDays) {
            throw new BadRequestException("Vượt quá số ngày tạm dừng tối đa cho phép: " + maxFreezeDays);
        }
        
        // Cập nhật gói tập
        membership.setFreezeStartDate(startDate);
        membership.setFreezeEndDate(endDate);
        membership.setFreezeDaysUsed(usedFreezeDays + freezeDays);
        membership.setMembershipStatus(MembershipStatus.Frozen);
        membership.setNotes(reason != null ? reason : membership.getNotes());
        
        // Khi tạm dừng, cần gia hạn gói tập thêm số ngày tạm dừng
        LocalDate newEndDate = membership.getEndDate().plusDays(freezeDays);
        membership.setEndDate(newEndDate);
        membership.setUpdatedAt(LocalDateTime.now());
        
        membershipRepository.save(membership);
        
        // Gửi email thông báo
        sendMembershipFreezeEmail(membership, startDate, endDate, reason);
    }

    @Transactional
    public void unfreezeUserMembership(Long membershipId) {
        Membership membership = findMembershipById(membershipId);
        
        if (membership.getMembershipStatus() != MembershipStatus.Frozen) {
            throw new BadRequestException("Gói tập không ở trạng thái tạm dừng");
        }
        
        // Nếu ngày kết thúc tạm dừng chưa đến, cập nhật lại số ngày đã tạm dừng
        if (membership.getFreezeEndDate().isAfter(LocalDate.now())) {
            int actualFreezeDays = Period.between(membership.getFreezeStartDate(), LocalDate.now()).getDays() + 1;
            membership.setFreezeDaysUsed(
                    (membership.getFreezeDaysUsed() != null ? membership.getFreezeDaysUsed() : 0) - 
                    (membership.getFreezeDaysUsed() - actualFreezeDays));
            
            // Điều chỉnh ngày kết thúc gói tập
            int unusedDays = Period.between(LocalDate.now(), membership.getFreezeEndDate()).getDays();
            membership.setEndDate(membership.getEndDate().minusDays(unusedDays));
        }
        
        membership.setMembershipStatus(MembershipStatus.Active);
        membership.setUpdatedAt(LocalDateTime.now());
        membershipRepository.save(membership);
        
        // Gửi email thông báo
        sendMembershipUnfreezeEmail(membership);
    }

    // Thống kê gói tập
    public MembershipStatsResponse getMembershipStatistics(String startDateStr, String endDateStr) {
        LocalDate startDate = startDateStr != null ? 
                LocalDate.parse(startDateStr) : LocalDate.now().minusMonths(1);
        LocalDate endDate = endDateStr != null ? 
                LocalDate.parse(endDateStr) : LocalDate.now();
                
        // Tổng số gói tập hiện tại
        long totalActiveMemberships = membershipRepository.findActiveMemberships(LocalDate.now()).size();
        
        // Số gói tập mới trong khoảng thời gian
        long newMemberships = membershipRepository.findAll().stream()
                .filter(m -> {
                    LocalDate created = m.getCreatedAt().toLocalDate();
                    return !created.isBefore(startDate) && !created.isAfter(endDate);
                })
                .count();
                
        // Số gói tập hết hạn trong khoảng thời gian
        long expiredMemberships = membershipRepository.findAll().stream()
                .filter(m -> {
                    return !m.getEndDate().isBefore(startDate) && !m.getEndDate().isAfter(endDate) &&
                           m.getMembershipStatus() == MembershipStatus.Expired;
                })
                .count();
                
        // Số gói tập bị hủy trong khoảng thời gian
        long cancelledMemberships = membershipRepository.findAll().stream()
                .filter(m -> {
                    LocalDateTime updated = m.getUpdatedAt();
                    LocalDate updatedDate = updated.toLocalDate();
                    return !updatedDate.isBefore(startDate) && !updatedDate.isAfter(endDate) &&
                           m.getMembershipStatus() == MembershipStatus.Cancelled;
                })
                .count();
                
        // Doanh thu từ gói tập trong khoảng thời gian
        BigDecimal totalRevenue = membershipRepository.findAll().stream()
                .filter(m -> {
                    LocalDate created = m.getCreatedAt().toLocalDate();
                    return !created.isBefore(startDate) && !created.isAfter(endDate) &&
                           m.getPaymentStatus() == PaymentStatus.Paid;
                })
                .map(Membership::getActualPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
                
        return MembershipStatsResponse.builder()
                .totalActiveMemberships(totalActiveMemberships)
                .newMemberships(newMemberships)
                .expiredMemberships(expiredMemberships)
                .cancelledMemberships(cancelledMemberships)
                .totalRevenue(totalRevenue.doubleValue())
                .startDate(startDate)
                .endDate(endDate)
                .build();
    }
    
    // Các chức năng mới
    
    @Transactional
    public UserMembershipResponse assignMembershipToUser(MembershipAssignRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + request.getUserId()));
        
        MembershipType membershipType = findMembershipTypeById(request.getMembershipTypeId());
        
        if (!membershipType.isActive()) {
            throw new BadRequestException("Loại gói tập này hiện không khả dụng");
        }
        
        // Kiểm tra xem người dùng đã có gói tập đang hoạt động chưa
        List<Membership> activeMemberships = membershipRepository.findActiveUserMemberships(user, LocalDate.now());
        if (!activeMemberships.isEmpty()) {
            throw new BadRequestException("Người dùng đã có gói tập đang hoạt động. " + 
                    "Vui lòng hủy gói hiện tại trước khi đăng ký gói mới.");
        }
        
        LocalDate startDate = request.getStartDate() != null ? request.getStartDate() : LocalDate.now();
        LocalDate endDate = startDate.plusDays(membershipType.getDurationDays());
        
        Membership membership = new Membership();
        membership.setUser(user);
        membership.setMembershipType(membershipType);
        membership.setStartDate(startDate);
        membership.setEndDate(endDate);
        membership.setMembershipStatus(MembershipStatus.Active);
        membership.setPaymentStatus(PaymentStatus.Paid);
        membership.setActualPrice(BigDecimal.valueOf(request.getActualPrice()));
        membership.setRemainingGuestPasses(membershipType.getGuestPasses());
        membership.setIssuedBy(getCurrentUser());
        membership.setNotes(request.getNotes());
        membership.setCreatedAt(LocalDateTime.now());
        membership.setUpdatedAt(LocalDateTime.now());
        
        Membership savedMembership = membershipRepository.save(membership);
        
        // Gửi email thông báo cho người dùng
        sendMembershipAssignedEmail(savedMembership);
        
        return mapToUserMembershipResponse(savedMembership);
    }

    @Transactional
    public UserMembershipResponse renewUserMembership(Long membershipId, MembershipRenewalRequest request) {
        Membership membership = findMembershipById(membershipId);
        
        if (membership.getMembershipStatus() != MembershipStatus.Active && 
            membership.getMembershipStatus() != MembershipStatus.Expired) {
            throw new BadRequestException("Chỉ có thể gia hạn gói tập đang hoạt động hoặc đã hết hạn");
        }
        
        // Lưu ngày kết thúc cũ để ghi vào lịch sử gia hạn
        LocalDate previousEndDate = membership.getEndDate();
        
        // Tính ngày kết thúc mới
        int daysToAdd = request.getMonthsToRenew() * 30; // Ước tính 30 ngày/tháng
        LocalDate newEndDate = membership.getMembershipStatus() == MembershipStatus.Active ?
                membership.getEndDate().plusDays(daysToAdd) : // Nếu đang active, cộng thêm vào ngày hết hạn hiện tại
                LocalDate.now().plusDays(daysToAdd);          // Nếu đã hết hạn, tính từ ngày hiện tại
        
        // Cập nhật gói tập
        membership.setEndDate(newEndDate);
        membership.setMembershipStatus(MembershipStatus.Active);
        membership.setUpdatedAt(LocalDateTime.now());
        membership.setNotes(request.getNotes() != null ? 
                request.getNotes() : membership.getNotes());
        
        // Cập nhật giá thực tế nếu có
        if (request.getRenewalPrice() > 0) {
            membership.setActualPrice(BigDecimal.valueOf(request.getRenewalPrice()));
        }
        
        Membership savedMembership = membershipRepository.save(membership);
        
        // Tạo lịch sử gia hạn
        MembershipRenewal renewal = new MembershipRenewal();
        renewal.setMembership(savedMembership);
        renewal.setPreviousEndDate(previousEndDate);
        renewal.setNewEndDate(newEndDate);
        renewal.setRenewalDate(LocalDateTime.now());
        renewal.setRenewalPrice(BigDecimal.valueOf(request.getRenewalPrice()));
        renewal.setPaymentStatus(MembershipRenewal.PaymentStatus.Paid);
        renewal.setProcessedBy(getCurrentUser());
        renewal.setNotes(request.getNotes());
        
        membershipRenewalRepository.save(renewal);
        
        // Gửi email thông báo gia hạn
        sendMembershipRenewalEmail(savedMembership, previousEndDate, newEndDate, request.getMonthsToRenew());
        
        return mapToUserMembershipResponse(savedMembership);
    }

    @Transactional
    public UserMembershipResponse extendUserMembership(Long membershipId, MembershipExtendRequest request) {
        Membership membership = findMembershipById(membershipId);
        
        if (membership.getMembershipStatus() != MembershipStatus.Active) {
            throw new BadRequestException("Chỉ có thể mở rộng gói tập đang hoạt động");
        }
        
        // Lưu ngày kết thúc cũ
        LocalDate previousEndDate = membership.getEndDate();
        
        // Tính toán ngày kết thúc mới
        LocalDate newEndDate;
        if (request.getNewEndDate() != null) {
            newEndDate = request.getNewEndDate();
            if (newEndDate.isBefore(previousEndDate)) {
                throw new BadRequestException("Ngày kết thúc mới phải sau ngày kết thúc hiện tại");
            }
        } else {
            newEndDate = previousEndDate.plusDays(request.getDaysToExtend());
        }
        
        // Cập nhật gói tập
        membership.setEndDate(newEndDate);
        membership.setUpdatedAt(LocalDateTime.now());
        membership.setNotes(membership.getNotes() + "\nMở rộng: " + request.getReason());
        
        Membership savedMembership = membershipRepository.save(membership);
        
        // Lưu lịch sử mở rộng nếu có phí bổ sung
        if (request.getAdditionalCost() != null && request.getAdditionalCost() > 0) {
            MembershipRenewal extension = new MembershipRenewal();
            extension.setMembership(savedMembership);
            extension.setPreviousEndDate(previousEndDate);
            extension.setNewEndDate(newEndDate);
            extension.setRenewalDate(LocalDateTime.now());
            extension.setRenewalPrice(BigDecimal.valueOf(request.getAdditionalCost()));
            extension.setPaymentStatus(MembershipRenewal.PaymentStatus.Paid);
            extension.setProcessedBy(getCurrentUser());
            extension.setNotes("Mở rộng gói tập: " + request.getReason());
            
            membershipRenewalRepository.save(extension);
        }
        
        // Gửi email thông báo
        sendMembershipExtensionEmail(savedMembership, previousEndDate, newEndDate, request.getReason());
        
        return mapToUserMembershipResponse(savedMembership);
    }

    public List<MembershipRenewalHistoryResponse> getMembershipRenewalHistory(Long membershipId) {
        Membership membership = findMembershipById(membershipId);
        
        List<MembershipRenewal> renewals = membershipRenewalRepository.findByMembership(membership);
        
        return renewals.stream()
                .map(this::mapToMembershipRenewalHistoryResponse)
                .collect(Collectors.toList());
    }

    public Page<UserMembershipResponse> searchMemberships(MembershipSearchRequest request, Pageable pageable) {
        // Lấy tất cả gói tập và lọc trong bộ nhớ
        // Trong thực tế, nên cài đặt truy vấn phức tạp trong repository để tối ưu
        List<Membership> allMemberships = membershipRepository.findAll();
        
        // Áp dụng các bộ lọc theo yêu cầu
        List<Membership> filteredMemberships = allMemberships.stream()
                .filter(m -> request.getKeyword() == null || 
                        m.getUser().getName().toLowerCase().contains(request.getKeyword().toLowerCase()) ||
                        m.getUser().getEmail().toLowerCase().contains(request.getKeyword().toLowerCase()))
                .filter(m -> request.getMembershipTypeIds() == null || request.getMembershipTypeIds().isEmpty() || 
                        request.getMembershipTypeIds().contains(m.getMembershipType().getMembershipTypeId()))
                .filter(m -> request.getStatuses() == null || request.getStatuses().isEmpty() || 
                        request.getStatuses().contains(m.getMembershipStatus().name()))
                .filter(m -> request.getStartDateFrom() == null || 
                        !m.getStartDate().isBefore(request.getStartDateFrom()))
                .filter(m -> request.getStartDateTo() == null || 
                        !m.getStartDate().isAfter(request.getStartDateTo()))
                .filter(m -> request.getEndDateFrom() == null || 
                        !m.getEndDate().isBefore(request.getEndDateFrom()))
                .filter(m -> request.getEndDateTo() == null || 
                        !m.getEndDate().isAfter(request.getEndDateTo()))
                .filter(m -> request.getMinPrice() == null || 
                        m.getActualPrice().doubleValue() >= request.getMinPrice())
                .filter(m -> request.getMaxPrice() == null || 
                        m.getActualPrice().doubleValue() <= request.getMaxPrice())
                .filter(m -> request.getIsActive() == null || 
                        (request.getIsActive() && m.getMembershipStatus() == MembershipStatus.Active) ||
                        (!request.getIsActive() && m.getMembershipStatus() != MembershipStatus.Active))
                .filter(m -> request.getIsFrozen() == null || 
                        (request.getIsFrozen() && m.getMembershipStatus() == MembershipStatus.Frozen) ||
                        (!request.getIsFrozen() && m.getMembershipStatus() != MembershipStatus.Frozen))
                .collect(Collectors.toList());
        
        // Phân trang thủ công
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filteredMemberships.size());
        
        List<UserMembershipResponse> pagedResponses = filteredMemberships
                .subList(start, end)
                .stream()
                .map(this::mapToUserMembershipResponse)
                .collect(Collectors.toList());
        
        return new PageImpl<>(pagedResponses, pageable, filteredMemberships.size());
    }

    public List<MembershipExpiryResponse> getExpiringMemberships(Integer daysThreshold) {
        LocalDate today = LocalDate.now();
        LocalDate thresholdDate = today.plusDays(daysThreshold);
        
        // Lấy danh sách các gói tập sắp hết hạn
        List<Membership> expiringMemberships = membershipRepository.findAll().stream()
                .filter(m -> m.getMembershipStatus() == MembershipStatus.Active)
                .filter(m -> !m.getEndDate().isBefore(today) && !m.getEndDate().isAfter(thresholdDate))
                .collect(Collectors.toList());
        
        return expiringMemberships.stream()
                .map(m -> {
                    int daysRemaining = Period.between(today, m.getEndDate()).getDays();
                    
                    return MembershipExpiryResponse.builder()
                            .membershipId(m.getMembershipId())
                            .userId(m.getUser().getUserId())
                            .userName(m.getUser().getName())
                            .userEmail(m.getUser().getEmail())
                            .userPhone(m.getUser().getPhoneNumber())
                            .membershipTypeName(m.getMembershipType().getTypeName())
                            .startDate(m.getStartDate())
                            .endDate(m.getEndDate())
                            .daysRemaining(daysRemaining)
                            .status(m.getMembershipStatus().name())
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateMembershipPaymentStatus(Long membershipId, String status) {
        Membership membership = findMembershipById(membershipId);
        
        PaymentStatus paymentStatus;
        try {
            paymentStatus = PaymentStatus.valueOf(status);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Trạng thái thanh toán không hợp lệ: " + status);
        }
        
        membership.setPaymentStatus(paymentStatus);
        membership.setUpdatedAt(LocalDateTime.now());
        
        membershipRepository.save(membership);
    }

    public List<Map<String, Object>> getAllMembershipBenefits() {
        return membershipBenefitRepository.findAll().stream()
                .map(benefit -> {
                    Map<String, Object> benefitMap = new HashMap<>();
                    benefitMap.put("benefitId", benefit.getBenefitId());
                    benefitMap.put("benefitName", benefit.getBenefitName());
                    benefitMap.put("description", benefit.getDescription() != null ? benefit.getDescription() : "");
                    benefitMap.put("icon", benefit.getIcon() != null ? benefit.getIcon() : "");
                    return benefitMap;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void addBenefitToMembershipType(Long typeId, Long benefitId) {
        MembershipType membershipType = findMembershipTypeById(typeId);
        MembershipBenefit benefit = findMembershipBenefitById(benefitId);
        
        if (membershipType.getBenefits().contains(benefit)) {
            throw new BadRequestException("Quyền lợi này đã thuộc về loại gói tập");
        }
        
        membershipType.getBenefits().add(benefit);
        membershipTypeRepository.save(membershipType);
    }

    @Transactional
    public void removeBenefitFromMembershipType(Long typeId, Long benefitId) {
        MembershipType membershipType = findMembershipTypeById(typeId);
        MembershipBenefit benefit = findMembershipBenefitById(benefitId);
        
        if (!membershipType.getBenefits().contains(benefit)) {
            throw new BadRequestException("Quyền lợi này không thuộc về loại gói tập");
        }
        
        membershipType.getBenefits().remove(benefit);
        membershipTypeRepository.save(membershipType);
    }

    public List<Map<String, Object>> getMembershipPricing() {
        return membershipTypeRepository.findByIsActiveTrue().stream()
                .map(type -> {
                    BigDecimal originalPrice = type.getPrice();
                    
                    Map<String, Object> pricingMap = new HashMap<>();
                    pricingMap.put("typeId", type.getMembershipTypeId());
                    pricingMap.put("typeName", type.getTypeName());
                    pricingMap.put("durationDays", type.getDurationDays());
                    pricingMap.put("originalPrice", originalPrice);
                    return pricingMap;
                })
                .collect(Collectors.toList());
    }

    // Các phương thức hỗ trợ

    private MembershipType findMembershipTypeById(Long typeId) {
        return membershipTypeRepository.findById(typeId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy loại gói tập với ID: " + typeId));
    }

    private Membership findMembershipById(Long membershipId) {
        return membershipRepository.findById(membershipId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy gói tập với ID: " + membershipId));
    }

    private MembershipBenefit findMembershipBenefitById(Long benefitId) {
        return membershipBenefitRepository.findById(benefitId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy quyền lợi với ID: " + benefitId));
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin người dùng đăng nhập"));
        }
        return null;
    }

    private MembershipTypeResponse mapToMembershipTypeResponse(MembershipType membershipType) {
        return MembershipTypeResponse.builder()
                .id(membershipType.getMembershipTypeId())
                .name(membershipType.getTypeName())
                .description(membershipType.getDescription())
                .durationDays(membershipType.getDurationDays())
                .price(membershipType.getPrice().doubleValue())
                .isActive(membershipType.isActive())
                .build();
    }

    private MembershipTypeDetailResponse mapToMembershipTypeDetailResponse(MembershipType membershipType) {
        List<String> benefits = membershipType.getBenefits().stream()
                .map(MembershipBenefit::getBenefitName)
                .collect(Collectors.toList());
        
        return MembershipTypeDetailResponse.builder()
                .id(membershipType.getMembershipTypeId())
                .name(membershipType.getTypeName())
                .description(membershipType.getDescription())
                .durationDays(membershipType.getDurationDays())
                .price(membershipType.getPrice().doubleValue())
                .maxFreezeDays(membershipType.getMaxFreezeDays())
                .guestPasses(membershipType.getGuestPasses())
                .isActive(membershipType.isActive())
                .benefits(benefits)
                .createdAt(membershipType.getCreatedAt())
                .updatedAt(membershipType.getUpdatedAt())
                .build();
    }

    private UserMembershipResponse mapToUserMembershipResponse(Membership membership) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        
        return UserMembershipResponse.builder()
                .id(membership.getMembershipId())
                .userId(membership.getUser().getUserId())
                .userName(membership.getUser().getName())
                .userEmail(membership.getUser().getEmail())
                .membershipTypeId(membership.getMembershipType().getMembershipTypeId())
                .membershipTypeName(membership.getMembershipType().getTypeName())
                .startDate(membership.getStartDate().format(formatter))
                .endDate(membership.getEndDate().format(formatter))
                .status(membership.getMembershipStatus().name())
                .paymentStatus(membership.getPaymentStatus().name())
                .actualPrice(membership.getActualPrice().doubleValue())
                .freezeStartDate(membership.getFreezeStartDate() != null ? 
                        membership.getFreezeStartDate().format(formatter) : null)
                .freezeEndDate(membership.getFreezeEndDate() != null ? 
                        membership.getFreezeEndDate().format(formatter) : null)
                .freezeDaysUsed(membership.getFreezeDaysUsed())
                .freezeDaysRemaining(membership.getMembershipType().getMaxFreezeDays() - 
                        (membership.getFreezeDaysUsed() != null ? membership.getFreezeDaysUsed() : 0))
                .remainingGuestPasses(membership.getRemainingGuestPasses())
                .notes(membership.getNotes())
                .createdAt(membership.getCreatedAt())
                .build();
    }

    private MembershipRenewalHistoryResponse mapToMembershipRenewalHistoryResponse(MembershipRenewal renewal) {
        return MembershipRenewalHistoryResponse.builder()
                .renewalId(renewal.getRenewalId())
                .membershipId(renewal.getMembership().getMembershipId())
                .previousEndDate(renewal.getPreviousEndDate())
                .newEndDate(renewal.getNewEndDate())
                .renewalDate(renewal.getRenewalDate())
                .renewalPrice(renewal.getRenewalPrice().doubleValue())
                .paymentStatus(renewal.getPaymentStatus().name())
                .processedBy(renewal.getProcessedBy() != null ? 
                        renewal.getProcessedBy().getName() : "System")
                .notes(renewal.getNotes())
                .build();
    }
    
    // Các phương thức gửi email

    private void sendMembershipAssignedEmail(Membership membership) {
        // Implementation would depend on EmailService capabilities
        // For example:
        emailService.sendGenericEmail(
            membership.getUser().getEmail(),
            membership.getUser().getName(),
            "Thông báo đăng ký gói tập thành công",
            "Bạn đã được đăng ký gói tập " + membership.getMembershipType().getTypeName() + 
            " từ ngày " + membership.getStartDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + 
            " đến ngày " + membership.getEndDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
        );
    }

    private void sendMembershipFreezeEmail(Membership membership, LocalDate startDate, LocalDate endDate, String reason) {
        // Implementation for sending freeze notification
    }

    private void sendMembershipUnfreezeEmail(Membership membership) {
        // Implementation for sending unfreeze notification
    }

    private void sendMembershipCancellationEmail(Membership membership, String reason) {
        // Implementation for sending cancellation notification
    }

    private void sendMembershipRenewalEmail(Membership membership, LocalDate previousEndDate, LocalDate newEndDate, Integer months) {
        // Implementation for sending renewal notification
    }

    private void sendMembershipExtensionEmail(Membership membership, LocalDate previousEndDate, LocalDate newEndDate, String reason) {
        // Implementation for sending extension notification
    }
}