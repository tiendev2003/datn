package com.gym.datn_be.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TwoFactorLoginRequest {
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;
    
    @NotBlank(message = "Mã OTP không được để trống") 
    private String otpCode;
    
    @NotBlank(message = "Token không được để trống")
    private String temporaryToken;
    
    // Trường bổ sung để lưu thông tin thiết bị
    private String ipAddress;
    private String device;
    private String location;
}