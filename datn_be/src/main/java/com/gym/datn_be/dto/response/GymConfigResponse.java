package com.gym.datn_be.dto.response;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GymConfigResponse {
    
    private Long configId;
    private String gymName;
    private String address;
    private String phoneNumber;
    private String email;
    private String description;
    
    // Opening hours
    private LocalTime mondayOpen;
    private LocalTime mondayClose;
    
    private LocalTime tuesdayOpen;
    private LocalTime tuesdayClose;
    
    private LocalTime wednesdayOpen;
    private LocalTime wednesdayClose;
    
    private LocalTime thursdayOpen;
    private LocalTime thursdayClose;
    
    private LocalTime fridayOpen;
    private LocalTime fridayClose;
    
    private LocalTime saturdayOpen;
    private LocalTime saturdayClose;
    
    private LocalTime sundayOpen;
    private LocalTime sundayClose;
    
    // Services, facilities and social media links
    private Map<String, String> services;
    private Map<String, String> facilities;
    private Map<String, String> socialMediaLinks;
    
    private String logoUrl;
    private String bannerUrl;
    
    private LocalDateTime updatedAt;
}