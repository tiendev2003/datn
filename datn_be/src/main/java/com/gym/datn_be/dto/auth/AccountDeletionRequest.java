package com.gym.datn_be.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountDeletionRequest {
    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;
    
    private String reason;
    
    private boolean exportData;
}