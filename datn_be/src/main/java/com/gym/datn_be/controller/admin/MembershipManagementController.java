package com.gym.datn_be.controller.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.gym.datn_be.dto.request.MembershipTypeCreateRequest;
import com.gym.datn_be.dto.request.MembershipTypeUpdateRequest;
import com.gym.datn_be.dto.response.ApiResponse;
import com.gym.datn_be.dto.response.MembershipStatsResponse;
import com.gym.datn_be.dto.response.MembershipTypeDetailResponse;
import com.gym.datn_be.dto.response.MembershipTypeResponse;
import com.gym.datn_be.dto.response.UserMembershipResponse;
import com.gym.datn_be.service.MembershipManagementService;
import com.gym.datn_be.dto.request.MembershipExtendRequest;
import com.gym.datn_be.dto.request.MembershipAssignRequest;
import com.gym.datn_be.dto.request.MembershipRenewalRequest;
import com.gym.datn_be.dto.request.MembershipSearchRequest;
import com.gym.datn_be.dto.response.MembershipRenewalHistoryResponse;
import com.gym.datn_be.dto.response.MembershipExpiryResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/admin/memberships")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class MembershipManagementController {

    private final MembershipManagementService membershipService;

    // Quản lý loại gói tập
    @GetMapping("/types")
    public ResponseEntity<List<MembershipTypeResponse>> getAllMembershipTypes() {
        return ResponseEntity.ok(membershipService.getAllMembershipTypes());
    }

    @GetMapping("/types/{typeId}")
    public ResponseEntity<MembershipTypeDetailResponse> getMembershipTypeDetails(@PathVariable Long typeId) {
        return ResponseEntity.ok(membershipService.getMembershipTypeDetails(typeId));
    }

    @PostMapping("/types")
    public ResponseEntity<MembershipTypeDetailResponse> createMembershipType(
            @Valid @RequestBody MembershipTypeCreateRequest request) {
        return new ResponseEntity<>(membershipService.createMembershipType(request), HttpStatus.CREATED);
    }

    @PutMapping("/types/{typeId}")
    public ResponseEntity<MembershipTypeDetailResponse> updateMembershipType(
            @PathVariable Long typeId,
            @Valid @RequestBody MembershipTypeUpdateRequest request) {
        return ResponseEntity.ok(membershipService.updateMembershipType(typeId, request));
    }

    @DeleteMapping("/types/{typeId}")
    public ResponseEntity<ApiResponse> deleteMembershipType(@PathVariable Long typeId) {
        membershipService.deleteMembershipType(typeId);
        return ResponseEntity.ok(new ApiResponse(true, "Loại gói tập đã được xóa thành công"));
    }

    @PutMapping("/types/{typeId}/activate")
    public ResponseEntity<ApiResponse> activateMembershipType(@PathVariable Long typeId) {
        membershipService.activateMembershipType(typeId);
        return ResponseEntity.ok(new ApiResponse(true, "Loại gói tập đã được kích hoạt"));
    }

    @PutMapping("/types/{typeId}/deactivate")
    public ResponseEntity<ApiResponse> deactivateMembershipType(@PathVariable Long typeId) {
        membershipService.deactivateMembershipType(typeId);
        return ResponseEntity.ok(new ApiResponse(true, "Loại gói tập đã bị vô hiệu hóa"));
    }

    // Quản lý đăng ký gói tập của người dùng
    @GetMapping
    public ResponseEntity<Page<UserMembershipResponse>> getAllUserMemberships(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long membershipTypeId,
            Pageable pageable) {
        return ResponseEntity.ok(membershipService.getAllUserMemberships(keyword, status, membershipTypeId, pageable));
    }

    @GetMapping("/{membershipId}")
    public ResponseEntity<UserMembershipResponse> getUserMembershipDetails(@PathVariable Long membershipId) {
        return ResponseEntity.ok(membershipService.getUserMembershipDetails(membershipId));
    }

    @PutMapping("/{membershipId}/cancel")
    public ResponseEntity<ApiResponse> cancelUserMembership(
            @PathVariable Long membershipId,
            @RequestParam(required = false) String reason) {
        membershipService.cancelUserMembership(membershipId, reason);
        return ResponseEntity.ok(new ApiResponse(true, "Gói tập đã được hủy thành công"));
    }

    @PutMapping("/{membershipId}/freeze")
    public ResponseEntity<ApiResponse> freezeUserMembership(
            @PathVariable Long membershipId,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam(required = false) String reason) {
        membershipService.freezeUserMembership(membershipId, startDate, endDate, reason);
        return ResponseEntity.ok(new ApiResponse(true, "Gói tập đã được tạm dừng thành công"));
    }

    @PutMapping("/{membershipId}/unfreeze")
    public ResponseEntity<ApiResponse> unfreezeUserMembership(@PathVariable Long membershipId) {
        membershipService.unfreezeUserMembership(membershipId);
        return ResponseEntity.ok(new ApiResponse(true, "Gói tập đã được kích hoạt lại thành công"));
    }

    // Thống kê gói tập
    @GetMapping("/statistics")
    public ResponseEntity<MembershipStatsResponse> getMembershipStatistics(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        return ResponseEntity.ok(membershipService.getMembershipStatistics(startDate, endDate));
    }

    // Thêm chức năng mới

    // Gán gói tập cho người dùng
    @PostMapping("/assign")
    public ResponseEntity<UserMembershipResponse> assignMembershipToUser(
            @Valid @RequestBody MembershipAssignRequest request) {
        return new ResponseEntity<>(membershipService.assignMembershipToUser(request), HttpStatus.CREATED);
    }

    // Gia hạn gói tập
    @PutMapping("/{membershipId}/renew")
    public ResponseEntity<UserMembershipResponse> renewUserMembership(
            @PathVariable Long membershipId,
            @Valid @RequestBody MembershipRenewalRequest request) {
        return ResponseEntity.ok(membershipService.renewUserMembership(membershipId, request));
    }

    // Mở rộng gói tập
    @PutMapping("/{membershipId}/extend")
    public ResponseEntity<UserMembershipResponse> extendUserMembership(
            @PathVariable Long membershipId,
            @Valid @RequestBody MembershipExtendRequest request) {
        return ResponseEntity.ok(membershipService.extendUserMembership(membershipId, request));
    }

    // Lấy lịch sử gia hạn gói tập
    @GetMapping("/{membershipId}/renewal-history")
    public ResponseEntity<List<MembershipRenewalHistoryResponse>> getMembershipRenewalHistory(
            @PathVariable Long membershipId) {
        return ResponseEntity.ok(membershipService.getMembershipRenewalHistory(membershipId));
    }

    // Tìm kiếm nâng cao
    @PostMapping("/search")
    public ResponseEntity<Page<UserMembershipResponse>> searchMemberships(
            @RequestBody MembershipSearchRequest request,
            Pageable pageable) {
        return ResponseEntity.ok(membershipService.searchMemberships(request, pageable));
    }

    // Danh sách gói tập sắp hết hạn
    @GetMapping("/expiring")
    public ResponseEntity<List<MembershipExpiryResponse>> getExpiringMemberships(
            @RequestParam(defaultValue = "30") Integer daysThreshold) {
        return ResponseEntity.ok(membershipService.getExpiringMemberships(daysThreshold));
    }

    // Cập nhật thanh toán của gói tập
    @PutMapping("/{membershipId}/payment-status")
    public ResponseEntity<ApiResponse> updatePaymentStatus(
            @PathVariable Long membershipId,
            @RequestParam String status) {
        membershipService.updateMembershipPaymentStatus(membershipId, status);
        return ResponseEntity.ok(new ApiResponse(true, "Trạng thái thanh toán đã được cập nhật thành công"));
    }

    // Quản lý quyền lợi của gói tập
    @GetMapping("/benefits")
    public ResponseEntity<List<?>> getAllMembershipBenefits() {
        return ResponseEntity.ok(membershipService.getAllMembershipBenefits());
    }

    @PostMapping("/types/{typeId}/benefits/{benefitId}")
    public ResponseEntity<ApiResponse> addBenefitToMembershipType(
            @PathVariable Long typeId,
            @PathVariable Long benefitId) {
        membershipService.addBenefitToMembershipType(typeId, benefitId);
        return ResponseEntity.ok(new ApiResponse(true, "Thêm quyền lợi vào gói tập thành công"));
    }

    @DeleteMapping("/types/{typeId}/benefits/{benefitId}")
    public ResponseEntity<ApiResponse> removeBenefitFromMembershipType(
            @PathVariable Long typeId,
            @PathVariable Long benefitId) {
        membershipService.removeBenefitFromMembershipType(typeId, benefitId);
        return ResponseEntity.ok(new ApiResponse(true, "Xóa quyền lợi khỏi gói tập thành công"));
    }

    // Bảng giá gói tập theo loại gói
    @GetMapping("/pricing")
    public ResponseEntity<List<?>> getMembershipPricing() {
        return ResponseEntity.ok(membershipService.getMembershipPricing());
    }

}