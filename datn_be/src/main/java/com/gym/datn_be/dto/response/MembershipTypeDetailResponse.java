package com.gym.datn_be.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MembershipTypeDetailResponse {
    private Long id;
    private String name;
    private String description;
    private Integer durationDays;
    private Double price;
    private Double discountPercentage;
    private Integer maxFreezeDays;
    private Integer guestPasses;
    private Boolean isActive;
    private List<String> benefits;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}