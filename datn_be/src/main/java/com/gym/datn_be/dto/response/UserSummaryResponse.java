package com.gym.datn_be.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSummaryResponse {
    private Long userId;
    private String name;
    private String email;
    private String phoneNumber;
    private String profilePicture;
    private Boolean isActive;
    private LocalDateTime registrationDate;
    private LocalDateTime lastLogin;
    private List<String> roles;
}