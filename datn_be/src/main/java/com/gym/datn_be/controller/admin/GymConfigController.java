package com.gym.datn_be.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gym.datn_be.dto.request.GymConfigRequest;
import com.gym.datn_be.dto.response.GymConfigResponse;
import com.gym.datn_be.service.GymConfigService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/gym-config")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class GymConfigController {

    private final GymConfigService gymConfigService;
    
    /**
     * Get current gym configuration
     * 
     * @return GymConfigResponse with configuration details
     */
    @GetMapping
    public ResponseEntity<GymConfigResponse> getGymConfig() {
        GymConfigResponse config = gymConfigService.getGymConfig();
        return ResponseEntity.ok(config);
    }
    
    /**
     * Update or create gym configuration
     * 
     * @param request The request containing gym configuration details
     * @return The updated gym configuration
     */
    @PutMapping
    public ResponseEntity<GymConfigResponse> updateGymConfig(
            @Valid @RequestBody GymConfigRequest request) {
        
        // Since no UserPrincipal is available, audit fields are set to null
        GymConfigResponse updatedConfig = gymConfigService.updateGymConfig(request, null);
        return ResponseEntity.ok(updatedConfig);
    }
    
    /**
     * Endpoint for public access to gym information
     * This can be called from client-facing applications
     * 
     * @return GymConfigResponse with configuration details
     */
    @GetMapping("/public")
    @PreAuthorize("permitAll()")
    public ResponseEntity<GymConfigResponse> getPublicGymInfo() {
        GymConfigResponse config = gymConfigService.getGymConfig();
        return ResponseEntity.ok(config);
    }
}