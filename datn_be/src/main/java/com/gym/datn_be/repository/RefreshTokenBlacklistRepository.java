package com.gym.datn_be.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.entity.RefreshTokenBlacklist;

@Repository
public interface RefreshTokenBlacklistRepository extends JpaRepository<RefreshTokenBlacklist, Long> {
    boolean existsByToken(String token);
    
    /**
     * Xóa tất cả các token refresh đã hết hạn trong blacklist
     * 
     * @param now Thời điểm hiện tại, các token có thời hạn trước thời điểm này sẽ bị xóa
     * @return Số lượng token đã bị xóa
     */
    @Transactional
    @Modifying
    @Query("DELETE FROM RefreshTokenBlacklist r WHERE r.expiryDate < :now")
    int deleteAllExpiredTokens(@Param("now") Date now);
    
    /**
     * Đếm số lượng token refresh đã hết hạn trong blacklist
     * 
     * @param now Thời điểm hiện tại, đếm các token có thời hạn trước thời điểm này
     * @return Số lượng token đã hết hạn
     */
    @Query("SELECT COUNT(r) FROM RefreshTokenBlacklist r WHERE r.expiryDate < :now")
    int countExpiredTokens(@Param("now") Date now);
}