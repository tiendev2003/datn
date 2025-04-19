package com.gym.datn_be.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gym.datn_be.dto.response.ApiResponse;
import com.gym.datn_be.dto.response.DashboardStatsResponse;
import com.gym.datn_be.service.AdminDashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {
    
    private final AdminDashboardService dashboardService;
    
    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        return ResponseEntity.ok(dashboardService.getDashboardStatistics());
    }
    
    @GetMapping("/system/health")
    public ResponseEntity<ApiResponse> getSystemHealth() {
        return ResponseEntity.ok(new ApiResponse(true, "Hệ thống đang hoạt động bình thường"));
    }
}