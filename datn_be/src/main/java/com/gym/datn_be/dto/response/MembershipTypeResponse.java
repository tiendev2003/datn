package com.gym.datn_be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MembershipTypeResponse {
    private Long id;
    private String name;
    private String description;
    private Integer durationDays;
    private Double price;
    private Double discountPercentage;
    private Boolean isActive;
}