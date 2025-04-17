package com.gym.datn_be.dto.auth;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private Long expiresIn;
    private Long userId;
    private String email;
    private String fullName;
    private List<String> roles;
    
    // Thêm các trường hỗ trợ xác thực hai yếu tố
    private boolean require2FA = false;
    private String temporaryToken;
}