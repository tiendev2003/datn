package com.gym.datn_be.dto.response;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MembershipExpiryResponse {
    
    private Long membershipId;
    
    private Long userId;
    
    private String userName;
    
    private String userEmail;
    
    private String userPhone;
    
    private String membershipTypeName;
    
    private LocalDate startDate;
    
    private LocalDate endDate;
    
    private Integer daysRemaining;
    
    private Boolean autoRenew;
    
    private String status;
}