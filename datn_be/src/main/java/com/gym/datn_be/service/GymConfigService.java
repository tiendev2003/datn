package com.gym.datn_be.service;

import java.time.DayOfWeek;
import java.time.LocalTime;

import com.gym.datn_be.dto.request.GymConfigRequest;
import com.gym.datn_be.dto.response.GymConfigResponse;

public interface GymConfigService {
    
    /**
     * Get current gym configuration
     * If no configuration exists, returns null
     * 
     * @return The gym configuration
     */
    GymConfigResponse getGymConfig();
    
    /**
     * Update or create gym configuration
     * 
     * @param request The request containing gym configuration details
     * @param userId ID of the user making the update
     * @return The updated gym configuration
     */
    GymConfigResponse updateGymConfig(GymConfigRequest request, Long userId);
    
    /**
     * Check if the gym is currently open based on day of week and time
     * 
     * @return true if the gym is open, false otherwise
     */
    boolean isGymCurrentlyOpen();
    
    /**
     * Check if the gym is open at the specified day and time
     * 
     * @param dayOfWeek The day of week to check
     * @param time The time to check
     * @return true if the gym is open, false otherwise
     */
    boolean isGymOpen(DayOfWeek dayOfWeek, LocalTime time);
}