package com.gym.datn_be.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserMembershipResponse {
    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private Long membershipTypeId;
    private String membershipTypeName;
    private String startDate;
    private String endDate;
    private String status;
    private String paymentStatus;
    private Double actualPrice;
    private String freezeStartDate;
    private String freezeEndDate;
    private Integer freezeDaysUsed;
    private Integer freezeDaysRemaining;
    private Integer remainingGuestPasses;
    private String notes;
    private LocalDateTime createdAt;
}