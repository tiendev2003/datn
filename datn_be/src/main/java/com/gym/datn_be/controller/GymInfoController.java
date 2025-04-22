package com.gym.datn_be.controller;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gym.datn_be.dto.response.GymConfigResponse;
import com.gym.datn_be.service.GymConfigService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/gym-info")
@RequiredArgsConstructor
public class GymInfoController {

    private final GymConfigService gymConfigService;
    
    /**
     * Get public gym information (opening hours, services, contact details)
     * 
     * @return GymConfigResponse with configuration details
     */
    @GetMapping
    public ResponseEntity<GymConfigResponse> getGymInfo() {
        GymConfigResponse config = gymConfigService.getGymConfig();
        return ResponseEntity.ok(config);
    }
    
    /**
     * Check if the gym is currently open
     * 
     * @return Map with open status
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getGymStatus() {
        boolean isOpen = gymConfigService.isGymCurrentlyOpen();
        
        Map<String, Object> response = new HashMap<>();
        response.put("isOpen", isOpen);
        response.put("timestamp", java.time.LocalDateTime.now());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Check if the gym is open at a specific time
     * 
     * @param dayOfWeek The day of the week to check
     * @param time The time to check in HH:mm format
     * @return Map with open status
     */
    @GetMapping("/check-open")
    public ResponseEntity<Map<String, Object>> checkGymOpen(
            @RequestParam DayOfWeek dayOfWeek,
            @RequestParam @DateTimeFormat(pattern = "HH:mm") LocalTime time) {
        
        boolean isOpen = gymConfigService.isGymOpen(dayOfWeek, time);
        
        Map<String, Object> response = new HashMap<>();
        response.put("isOpen", isOpen);
        response.put("dayOfWeek", dayOfWeek);
        response.put("time", time);
        
        return ResponseEntity.ok(response);
    }
}