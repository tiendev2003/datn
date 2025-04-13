package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.PasswordResetToken;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUser_UserId(Long userId);
    
    /**
     * Xóa các token đặt lại mật khẩu đã hết hạn
     * 
     * @param now Thời điểm hiện tại, các token có thời hạn trước thời điểm này sẽ bị xóa
     * @return Số lượng token đã bị xóa
     */
    @Modifying
    @Query("DELETE FROM PasswordResetToken p WHERE p.expiryDate < :now")
    int deleteByExpiryDateBefore(@Param("now") LocalDateTime now);
    
    /**
     * Đếm số lượng token đặt lại mật khẩu đã hết hạn
     * 
     * @param now Thời điểm hiện tại, đếm các token có thời hạn trước thời điểm này
     * @return Số lượng token đã hết hạn
     */
    @Query("SELECT COUNT(p) FROM PasswordResetToken p WHERE p.expiryDate < :now")
    int countByExpiryDateBefore(@Param("now") LocalDateTime now);
}