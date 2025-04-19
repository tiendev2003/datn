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
public class MembershipStatsResponse {
    private Long totalActiveMemberships;
    private Long newMemberships;
    private Long expiredMemberships;
    private Long cancelledMemberships;
    private Double totalRevenue;
    private LocalDate startDate;
    private LocalDate endDate;
}