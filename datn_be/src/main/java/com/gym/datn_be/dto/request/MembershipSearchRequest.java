package com.gym.datn_be.dto.request;

import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MembershipSearchRequest {
    
    private String keyword;
    
    private List<Long> membershipTypeIds;
    
    private List<String> statuses;
    
    private LocalDate startDateFrom;
    
    private LocalDate startDateTo;
    
    private LocalDate endDateFrom;
    
    private LocalDate endDateTo;
    
    private Boolean isAutoRenew;
    
    private Double minPrice;
    
    private Double maxPrice;
    
    private Boolean isActive;
    
    private Boolean isFrozen;
}