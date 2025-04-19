package com.gym.datn_be.controller.admin;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gym.datn_be.dto.request.UserCreateRequest;
import com.gym.datn_be.dto.request.UserRoleUpdateRequest;
import com.gym.datn_be.dto.request.UserUpdateRequest;
import com.gym.datn_be.dto.response.ApiResponse;
import com.gym.datn_be.dto.response.UserDetailResponse;
import com.gym.datn_be.dto.response.UserSummaryResponse;
import com.gym.datn_be.service.UserManagementService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/users")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class UserManagementController {

    private final UserManagementService userManagementService;

    @GetMapping
    public ResponseEntity<Page<UserSummaryResponse>> getAllUsers(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) List<String> roles,
            @RequestParam(required = false) Boolean isActive,
            Pageable pageable) {
        return ResponseEntity.ok(userManagementService.getAllUsers(keyword, roles, isActive, pageable));
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailResponse> getUserDetails(@PathVariable Long userId) {
        return ResponseEntity.ok(userManagementService.getUserDetails(userId));
    }
    
    @PostMapping
    public ResponseEntity<UserDetailResponse> createUser(@Valid @RequestBody UserCreateRequest request) {
        return new ResponseEntity<>(userManagementService.createUser(request), HttpStatus.CREATED);
    }
    
    @PutMapping("/{userId}")
    public ResponseEntity<UserDetailResponse> updateUser(
            @PathVariable Long userId,
            @Valid @RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(userManagementService.updateUser(userId, request));
    }
    
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long userId) {
        userManagementService.deleteUser(userId);
        return ResponseEntity.ok(new ApiResponse(true, "Người dùng đã được xóa thành công"));
    }
    
    @PutMapping("/{userId}/activate")
    public ResponseEntity<ApiResponse> activateUser(@PathVariable Long userId) {
        userManagementService.activateUser(userId);
        return ResponseEntity.ok(new ApiResponse(true, "Người dùng đã được kích hoạt thành công"));
    }
    
    @PutMapping("/{userId}/deactivate")
    public ResponseEntity<ApiResponse> deactivateUser(@PathVariable Long userId) {
        userManagementService.deactivateUser(userId);
        return ResponseEntity.ok(new ApiResponse(true, "Người dùng đã bị vô hiệu hóa thành công"));
    }
    
    @GetMapping("/roles")
    public ResponseEntity<List<String>> getAllRoles() {
        return ResponseEntity.ok(userManagementService.getAllRoles());
    }
    
    @PutMapping("/{userId}/roles")
    public ResponseEntity<ApiResponse> updateUserRoles(
            @PathVariable Long userId,
            @Valid @RequestBody UserRoleUpdateRequest request) {
        userManagementService.updateUserRoles(userId, request);
        return ResponseEntity.ok(new ApiResponse(true, "Quyền của người dùng đã được cập nhật"));
    }
}