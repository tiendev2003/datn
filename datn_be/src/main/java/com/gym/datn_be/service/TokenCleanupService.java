package com.gym.datn_be.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.repository.EmailVerificationRepository;
import com.gym.datn_be.repository.PasswordResetTokenRepository;
import com.gym.datn_be.repository.RefreshTokenBlacklistRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TokenCleanupService {

    private final EmailVerificationRepository emailVerificationRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final RefreshTokenBlacklistRepository refreshTokenBlacklistRepository;

    /**
     * Xóa các token xác minh email đã hết hạn mỗi ngày lúc 1 giờ sáng
     */
    @Scheduled(cron = "0 0 1 * * ?")
    @Transactional
    public void cleanupExpiredEmailVerificationTokens() {
        LocalDateTime now = LocalDateTime.now();
        log.info("Cleaning up expired email verification tokens");
        try {
            int count = emailVerificationRepository.deleteByExpiryDateBefore(now);
            log.info("Deleted {} expired email verification tokens", count);
        } catch (Exception e) {
            log.error("Error cleaning up expired email verification tokens", e);
        }
    }

    /**
     * Xóa các token đặt lại mật khẩu đã hết hạn mỗi ngày lúc 2 giờ sáng
     */
    @Scheduled(cron = "0 0 2 * * ?")
    @Transactional
    public void cleanupExpiredPasswordResetTokens() {
        LocalDateTime now = LocalDateTime.now();
        log.info("Cleaning up expired password reset tokens");
        try {
            int count = passwordResetTokenRepository.deleteByExpiryDateBefore(now);
            log.info("Deleted {} expired password reset tokens", count);
        } catch (Exception e) {
            log.error("Error cleaning up expired password reset tokens", e);
        }
    }

    /**
     * Xóa các token refresh đã hết hạn trong blacklist mỗi ngày lúc 3 giờ sáng
     */
    @Scheduled(cron = "0 0 3 * * ?")
    @Transactional
    public void cleanupExpiredBlacklistedTokens() {
        Date now = new Date();
        log.info("Cleaning up expired blacklisted refresh tokens");
        try {
            int count = refreshTokenBlacklistRepository.deleteAllExpiredTokens(now);
            log.info("Deleted {} expired blacklisted refresh tokens", count);
        } catch (Exception e) {
            log.error("Error cleaning up expired blacklisted refresh tokens", e);
        }
    }
    
    /**
     * Kiểm tra số lượng token đã hết hạn hiện tại trong hệ thống
     * @return Map chứa thông tin về số lượng token hết hạn theo từng loại
     */
    public Map<String, Integer> getExpiredTokenCounts() {
        Map<String, Integer> result = new HashMap<>();
        LocalDateTime now = LocalDateTime.now();
        Date currentDate = new Date();
        
        try {
            int emailVerificationCount = emailVerificationRepository.countByExpiryDateBefore(now);
            int passwordResetCount = passwordResetTokenRepository.countByExpiryDateBefore(now);
            int blacklistedTokenCount = refreshTokenBlacklistRepository.countExpiredTokens(currentDate);
            
            result.put("expiredEmailVerificationTokens", emailVerificationCount);
            result.put("expiredPasswordResetTokens", passwordResetCount);
            result.put("expiredBlacklistedTokens", blacklistedTokenCount);
        } catch (Exception e) {
            log.error("Error counting expired tokens", e);
        }
        
        return result;
    }
    
    /**
     * Thực hiện xóa thủ công tất cả các loại token đã hết hạn
     * @return Map chứa thông tin về số lượng token đã xóa theo từng loại
     */
    @Transactional
    public Map<String, Integer> cleanupAllExpiredTokensManually() {
        Map<String, Integer> result = new HashMap<>();
        LocalDateTime now = LocalDateTime.now();
        Date currentDate = new Date();
        
        log.info("Manual cleanup of all expired tokens started");
        
        try {
            int emailVerificationCount = emailVerificationRepository.deleteByExpiryDateBefore(now);
            result.put("emailVerificationTokensDeleted", emailVerificationCount);
            log.info("Manually deleted {} expired email verification tokens", emailVerificationCount);
        } catch (Exception e) {
            log.error("Error during manual cleanup of email verification tokens", e);
            result.put("emailVerificationTokensDeleted", 0);
        }
        
        try {
            int passwordResetCount = passwordResetTokenRepository.deleteByExpiryDateBefore(now);
            result.put("passwordResetTokensDeleted", passwordResetCount);
            log.info("Manually deleted {} expired password reset tokens", passwordResetCount);
        } catch (Exception e) {
            log.error("Error during manual cleanup of password reset tokens", e);
            result.put("passwordResetTokensDeleted", 0);
        }
        
        try {
            int blacklistedTokenCount = refreshTokenBlacklistRepository.deleteAllExpiredTokens(currentDate);
            result.put("blacklistedTokensDeleted", blacklistedTokenCount);
            log.info("Manually deleted {} expired blacklisted refresh tokens", blacklistedTokenCount);
        } catch (Exception e) {
            log.error("Error during manual cleanup of blacklisted tokens", e);
            result.put("blacklistedTokensDeleted", 0);
        }
        
        log.info("Manual cleanup of all expired tokens completed");
        return result;
    }
}