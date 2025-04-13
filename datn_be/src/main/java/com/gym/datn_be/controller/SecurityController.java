package com.gym.datn_be.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gym.datn_be.dto.auth.AccountDeletionRequest;
import com.gym.datn_be.dto.auth.JwtAuthResponse;
import com.gym.datn_be.dto.auth.TwoFactorLoginRequest;
import com.gym.datn_be.dto.auth.TwoFactorSetupResponse;
import com.gym.datn_be.dto.auth.TwoFactorVerifyRequest;
import com.gym.datn_be.dto.response.ApiResponse;
import com.gym.datn_be.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth/security")
@RequiredArgsConstructor
public class SecurityController {
    
    private final AuthService authService;
    
    /**
     * API để xác minh mã OTP khi đăng nhập với xác thực hai yếu tố
     */
    @PostMapping("/verify-2fa")
    public ResponseEntity<JwtAuthResponse> verifyTwoFactorAuth(
            @Valid @RequestBody TwoFactorLoginRequest request,
            HttpServletRequest httpRequest) {
        
        // Lấy thông tin từ request
        String ipAddress = getClientIp(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");
        String deviceInfo = getUserDevice(userAgent);
        String location = "Không xác định"; // Có thể tích hợp với service xác định vị trí IP
        
        // Cập nhật request với thông tin thiết bị
        request.setIpAddress(ipAddress);
        request.setDevice(deviceInfo);
        request.setLocation(location);
        
        // Gọi service để xác thực OTP
        return ResponseEntity.ok(authService.verifyTwoFactorAuthentication(request));
    }
    
    /**
     * API để thiết lập xác thực hai yếu tố
     */
    @GetMapping("/setup-2fa")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<TwoFactorSetupResponse> setupTwoFactorAuth() {
        return ResponseEntity.ok(authService.setupTwoFactorAuth());
    }
    
    /**
     * API để bật xác thực hai yếu tố sau khi xác minh thành công
     */
    @PostMapping("/enable-2fa")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> enableTwoFactorAuth(@Valid @RequestBody TwoFactorVerifyRequest request) {
        boolean result = authService.enableTwoFactorAuth(request);
        return ResponseEntity.ok(new ApiResponse(result, 
                result ? "Xác thực hai yếu tố đã được bật thành công" : "Không thể bật xác thực hai yếu tố"));
    }
    
    /**
     * API để tắt xác thực hai yếu tố
     */
    @PostMapping("/disable-2fa")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> disableTwoFactorAuth(@Valid @RequestBody TwoFactorVerifyRequest request) {
        boolean result = authService.disableTwoFactorAuth(request);
        return ResponseEntity.ok(new ApiResponse(result, 
                result ? "Xác thực hai yếu tố đã được tắt thành công" : "Không thể tắt xác thực hai yếu tố"));
    }
    
    /**
     * API để xóa tài khoản
     */
    @DeleteMapping("/delete-account")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> deleteAccount(@Valid @RequestBody AccountDeletionRequest request) {
        authService.deleteAccount(request);
        return ResponseEntity.ok(new ApiResponse(true, "Tài khoản đã được xóa thành công"));
    }
    
    /**
     * Lấy địa chỉ IP của client
     */
    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
    
    /**
     * Phân tích User-Agent để lấy thông tin thiết bị
     */
    private String getUserDevice(String userAgent) {
        if (userAgent == null) {
            return "Thiết bị không xác định";
        }

        userAgent = userAgent.toLowerCase();
        String device;
        
        if (userAgent.contains("mobile")) {
            device = "Điện thoại";
        } else if (userAgent.contains("tablet")) {
            device = "Tablet";
        } else {
            device = "Máy tính";
        }
        
        String browser;
        if (userAgent.contains("chrome")) {
            browser = "Chrome";
        } else if (userAgent.contains("firefox")) {
            browser = "Firefox";
        } else if (userAgent.contains("safari") && !userAgent.contains("chrome")) {
            browser = "Safari";
        } else if (userAgent.contains("edge")) {
            browser = "Edge";
        } else if (userAgent.contains("opera") || userAgent.contains("opr")) {
            browser = "Opera";
        } else {
            browser = "Trình duyệt khác";
        }
        
        String os;
        if (userAgent.contains("windows")) {
            os = "Windows";
        } else if (userAgent.contains("mac")) {
            os = "MacOS";
        } else if (userAgent.contains("linux")) {
            os = "Linux";
        } else if (userAgent.contains("android")) {
            os = "Android";
        } else if (userAgent.contains("iphone") || userAgent.contains("ipad")) {
            os = "iOS";
        } else {
            os = "Hệ điều hành khác";
        }
        
        return browser + " trên " + os + " (" + device + ")";
    }
}