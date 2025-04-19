package com.gym.datn_be.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MembershipRenewalHistoryResponse {
    
    private Long renewalId;
    
    private Long membershipId;
    
    private LocalDate previousEndDate;
    
    private LocalDate newEndDate;
    
    private LocalDateTime renewalDate;
    
    private Double renewalPrice;
    
    private String paymentStatus;
    
    private String processedBy;
    
    private String notes;
}