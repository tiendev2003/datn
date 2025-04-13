package com.gym.datn_be.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gym.datn_be.dto.auth.ChangePasswordRequest;
import com.gym.datn_be.dto.auth.EmailVerificationRequest;
import com.gym.datn_be.dto.auth.ForgotPasswordRequest;
import com.gym.datn_be.dto.auth.JwtAuthResponse;
import com.gym.datn_be.dto.auth.LoginRequest;
import com.gym.datn_be.dto.auth.LogoutRequest;
import com.gym.datn_be.dto.auth.RefreshTokenRequest;
import com.gym.datn_be.dto.auth.RegisterRequest;
import com.gym.datn_be.dto.auth.ResetPasswordRequest;
import com.gym.datn_be.dto.response.ApiResponse;
import com.gym.datn_be.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<JwtAuthResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return new ResponseEntity<>(authService.register(registerRequest), HttpStatus.CREATED);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<JwtAuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(@Valid @RequestBody LogoutRequest logoutRequest) {
        authService.logout(logoutRequest);
        return ResponseEntity.ok(new ApiResponse(true, "Đăng xuất thành công"));
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.sendPasswordResetEmail(request.getEmail());
        return ResponseEntity.ok(new ApiResponse(true, "Email đặt lại mật khẩu đã được gửi"));
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok(new ApiResponse(true, "Mật khẩu đã được đặt lại thành công"));
    }
    
    @PostMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        authService.changePassword(request);
        return ResponseEntity.ok(new ApiResponse(true, "Mật khẩu đã được thay đổi thành công"));
    }
    
    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse> verifyEmail(@Valid @RequestBody EmailVerificationRequest request) {
        authService.verifyEmail(request.getToken());
        return ResponseEntity.ok(new ApiResponse(true, "Email đã được xác minh thành công"));
    }
    
    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse> verifyEmailWithToken(@RequestParam("token") String token) {
        authService.verifyEmail(token);
        return ResponseEntity.ok(new ApiResponse(true, "Email đã được xác minh thành công"));
    }
    
    @GetMapping("/check-username/{username}")
    public ResponseEntity<ApiResponse> checkUsernameAvailability(@PathVariable String username) {
        boolean isAvailable = authService.isUsernameAvailable(username);
        return ResponseEntity.ok(
            new ApiResponse(isAvailable, isAvailable ? "Tên người dùng khả dụng" : "Tên người dùng đã tồn tại")
        );
    }
    
    @GetMapping("/check-email/{email}")
    public ResponseEntity<ApiResponse> checkEmailAvailability(@PathVariable String email) {
        boolean isAvailable = authService.isEmailAvailable(email);
        return ResponseEntity.ok(
            new ApiResponse(isAvailable, isAvailable ? "Email khả dụng" : "Email đã tồn tại")
        );
    }
}