package com.gym.datn_be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassTypeResponse {
    private Long id;
    private String typeName;
    private String description;
    private Integer durationMinutes;
    private Integer maxCapacity;
    private String intensity;
    private String imageUrl;
    private Boolean isActive;
}