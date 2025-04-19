package com.gym.datn_be.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.TrainerProfile;

@Repository
public interface TrainerRepository extends JpaRepository<TrainerProfile, Long> {
    
    @Query("SELECT tp FROM TrainerProfile tp " +
           "JOIN tp.user u " +
           "WHERE (:keyword IS NULL OR " +
           "      LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "      LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:specialization IS NULL OR LOWER(tp.specialization) = LOWER(:specialization)) " +
           "AND (:isActive IS NULL OR tp.isActive = :isActive) " +
           "AND u.isDeleted = false")
    Page<TrainerProfile> findTrainers(
            @Param("keyword") String keyword,
            @Param("specialization") String specialization,
            @Param("isActive") Boolean isActive,
            Pageable pageable);
    
    @Query("SELECT COUNT(tp) FROM TrainerProfile tp WHERE tp.user.userId = :userId")
    long countByUserId(@Param("userId") Long userId);
    
    TrainerProfile findByUserId(Long userId);
}