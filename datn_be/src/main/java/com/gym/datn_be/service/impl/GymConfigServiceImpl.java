package com.gym.datn_be.service.impl;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.dto.request.GymConfigRequest;
import com.gym.datn_be.dto.response.GymConfigResponse;
import com.gym.datn_be.entity.GymConfig;
import com.gym.datn_be.repository.GymConfigRepository;
import com.gym.datn_be.service.GymConfigService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GymConfigServiceImpl implements GymConfigService {

    private final GymConfigRepository gymConfigRepository;
    
    @Override
    public GymConfigResponse getGymConfig() {
        // We assume there is only one config record in the system
        List<GymConfig> configs = gymConfigRepository.findAll();
        
        if (configs.isEmpty()) {
            return null;
        }
        
        // Return the first config (there should only be one)
        return convertToResponse(configs.get(0));
    }
    
    @Override
    @Transactional
    public GymConfigResponse updateGymConfig(GymConfigRequest request, Long userId) {
        List<GymConfig> existingConfigs = gymConfigRepository.findAll();
        GymConfig gymConfig;
        
        if (existingConfigs.isEmpty()) {
            // Create new configuration
            gymConfig = new GymConfig();
            gymConfig.setCreatedBy(userId);
        } else {
            // Update existing configuration (take the first one)
            gymConfig = existingConfigs.get(0);
        }
        
        // Update fields from request
        updateEntityFromRequest(gymConfig, request);
        gymConfig.setUpdatedBy(userId);
        gymConfig.setUpdatedAt(LocalDateTime.now());
        
        // Save to repository
        GymConfig savedConfig = gymConfigRepository.save(gymConfig);
        
        log.info("Gym configuration has been updated by user ID: {}", userId);
        return convertToResponse(savedConfig);
    }
    
    @Override
    public boolean isGymCurrentlyOpen() {
        // Get current day of week and time
        LocalDateTime now = LocalDateTime.now();
        DayOfWeek dayOfWeek = now.getDayOfWeek();
        LocalTime currentTime = now.toLocalTime();
        
        return isGymOpen(dayOfWeek, currentTime);
    }
    
    @Override
    public boolean isGymOpen(DayOfWeek dayOfWeek, LocalTime time) {
        // Get gym configuration
        List<GymConfig> configs = gymConfigRepository.findAll();
        if (configs.isEmpty()) {
            // No configuration exists, default to closed
            return false;
        }
        
        GymConfig config = configs.get(0);
        
        // Check opening hours based on day of week
        LocalTime openingTime = null;
        LocalTime closingTime = null;
        
        switch (dayOfWeek) {
            case MONDAY:
                openingTime = config.getMondayOpen();
                closingTime = config.getMondayClose();
                break;
            case TUESDAY:
                openingTime = config.getTuesdayOpen();
                closingTime = config.getTuesdayClose();
                break;
            case WEDNESDAY:
                openingTime = config.getWednesdayOpen();
                closingTime = config.getWednesdayClose();
                break;
            case THURSDAY:
                openingTime = config.getThursdayOpen();
                closingTime = config.getThursdayClose();
                break;
            case FRIDAY:
                openingTime = config.getFridayOpen();
                closingTime = config.getFridayClose();
                break;
            case SATURDAY:
                openingTime = config.getSaturdayOpen();
                closingTime = config.getSaturdayClose();
                break;
            case SUNDAY:
                openingTime = config.getSundayOpen();
                closingTime = config.getSundayClose();
                break;
        }
        
        // If opening or closing time not configured, gym is closed
        if (openingTime == null || closingTime == null) {
            return false;
        }
        
        // Check if current time is within opening hours
        return (time.equals(openingTime) || time.isAfter(openingTime)) && 
               (time.isBefore(closingTime));
    }
    
    /**
     * Update GymConfig entity with values from request
     */
    private void updateEntityFromRequest(GymConfig entity, GymConfigRequest request) {
        entity.setGymName(request.getGymName());
        entity.setAddress(request.getAddress());
        entity.setPhoneNumber(request.getPhoneNumber());
        entity.setEmail(request.getEmail());
        entity.setDescription(request.getDescription());
        
        // Update opening hours
        entity.setMondayOpen(request.getMondayOpen());
        entity.setMondayClose(request.getMondayClose());
        entity.setTuesdayOpen(request.getTuesdayOpen());
        entity.setTuesdayClose(request.getTuesdayClose());
        entity.setWednesdayOpen(request.getWednesdayOpen());
        entity.setWednesdayClose(request.getWednesdayClose());
        entity.setThursdayOpen(request.getThursdayOpen());
        entity.setThursdayClose(request.getThursdayClose());
        entity.setFridayOpen(request.getFridayOpen());
        entity.setFridayClose(request.getFridayClose());
        entity.setSaturdayOpen(request.getSaturdayOpen());
        entity.setSaturdayClose(request.getSaturdayClose());
        entity.setSundayOpen(request.getSundayOpen());
        entity.setSundayClose(request.getSundayClose());
        
        // Update services, facilities, and social media
        if (request.getServices() != null) {
            entity.setServices(request.getServices());
        }
        if (request.getFacilities() != null) {
            entity.setFacilities(request.getFacilities());
        }
        if (request.getSocialMediaLinks() != null) {
            entity.setSocialMediaLinks(request.getSocialMediaLinks());
        }
        
        // Update logo and banner URLs
        entity.setLogoUrl(request.getLogoUrl());
        entity.setBannerUrl(request.getBannerUrl());
    }
    
    /**
     * Convert GymConfig entity to GymConfigResponse DTO
     */
    private GymConfigResponse convertToResponse(GymConfig entity) {
        return GymConfigResponse.builder()
                .configId(entity.getConfigId())
                .gymName(entity.getGymName())
                .address(entity.getAddress())
                .phoneNumber(entity.getPhoneNumber())
                .email(entity.getEmail())
                .description(entity.getDescription())
                .mondayOpen(entity.getMondayOpen())
                .mondayClose(entity.getMondayClose())
                .tuesdayOpen(entity.getTuesdayOpen())
                .tuesdayClose(entity.getTuesdayClose())
                .wednesdayOpen(entity.getWednesdayOpen())
                .wednesdayClose(entity.getWednesdayClose())
                .thursdayOpen(entity.getThursdayOpen())
                .thursdayClose(entity.getThursdayClose())
                .fridayOpen(entity.getFridayOpen())
                .fridayClose(entity.getFridayClose())
                .saturdayOpen(entity.getSaturdayOpen())
                .saturdayClose(entity.getSaturdayClose())
                .sundayOpen(entity.getSundayOpen())
                .sundayClose(entity.getSundayClose())
                .services(entity.getServices())
                .facilities(entity.getFacilities())
                .socialMediaLinks(entity.getSocialMediaLinks())
                .logoUrl(entity.getLogoUrl())
                .bannerUrl(entity.getBannerUrl())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}