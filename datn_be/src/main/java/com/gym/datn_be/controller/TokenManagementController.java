package com.gym.datn_be.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gym.datn_be.service.TokenCleanupService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller cung cấp các API để quản lý token trong hệ thống
 */
@RestController
@RequestMapping("/api/token-management")
@RequiredArgsConstructor
@Slf4j
public class TokenManagementController {

    private final TokenCleanupService tokenCleanupService;

    /**
     * Lấy thông tin về số lượng token đã hết hạn trong hệ thống
     * 
     * @return Map chứa thông tin về số lượng token hết hạn theo từng loại
     */
    @GetMapping("/expired-counts")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Integer>> getExpiredTokenCounts() {
        log.info("Request to get expired token counts");
        Map<String, Integer> counts = tokenCleanupService.getExpiredTokenCounts();
        return ResponseEntity.ok(counts);
    }

    /**
     * Thực hiện xóa thủ công tất cả các loại token đã hết hạn
     * 
     * @return Map chứa thông tin về số lượng token đã xóa theo từng loại
     */
    @PostMapping("/cleanup")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Integer>> cleanupExpiredTokens() {
        log.info("Request to manually cleanup expired tokens");
        Map<String, Integer> result = tokenCleanupService.cleanupAllExpiredTokensManually();
        return ResponseEntity.ok(result);
    }
}