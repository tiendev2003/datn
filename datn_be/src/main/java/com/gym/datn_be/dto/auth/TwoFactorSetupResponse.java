package com.gym.datn_be.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TwoFactorSetupResponse {
    private String secretKey;
    private String qrCodeUrl;
    private String manualEntryKey;
    private boolean twoFactorEnabled;
}