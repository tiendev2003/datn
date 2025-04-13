package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.EmailVerification;
import com.gym.datn_be.entity.User;

@Repository
public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Long> {
    Optional<EmailVerification> findByToken(String token);
    void deleteByUser(User user);
    
    /**
     * Xóa các token xác minh email đã hết hạn
     * 
     * @param expiryDate Thời điểm hiện tại, các token có thời hạn trước thời điểm này sẽ bị xóa
     * @return Số lượng token đã bị xóa
     */
    @Modifying
    @Query("DELETE FROM EmailVerification e WHERE e.expiryDate < :expiryDate")
    int deleteByExpiryDateBefore(@Param("expiryDate") LocalDateTime expiryDate);
    
    /**
     * Đếm số lượng token xác minh email đã hết hạn
     * 
     * @param expiryDate Thời điểm hiện tại, đếm các token có thời hạn trước thời điểm này
     * @return Số lượng token đã hết hạn
     */
    @Query("SELECT COUNT(e) FROM EmailVerification e WHERE e.expiryDate < :expiryDate")
    int countByExpiryDateBefore(@Param("expiryDate") LocalDateTime expiryDate);
}