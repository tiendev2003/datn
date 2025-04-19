package com.gym.datn_be.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailResponse {
    // Thông tin cơ bản
    private Long userId;
    private String name;
    private String email;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private String profilePicture;
    private Boolean isActive;
    private LocalDateTime registrationDate;
    private LocalDateTime lastLogin;
    private String preferredLanguage;
    private Boolean twoFactorEnabled;
    
    // Thông tin hồ sơ
    private BigDecimal height;
    private BigDecimal weight;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String healthConditions;
    private String fitnessGoals;
    private String notes;
    
    // Quyền
    private List<String> roles;
}