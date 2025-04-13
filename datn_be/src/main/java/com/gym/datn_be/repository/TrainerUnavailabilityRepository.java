package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.TrainerProfile;
import com.gym.datn_be.entity.TrainerUnavailability;

@Repository
public interface TrainerUnavailabilityRepository extends JpaRepository<TrainerUnavailability, Long> {
    List<TrainerUnavailability> findByTrainer(TrainerProfile trainer);
    
    @Query("SELECT tu FROM TrainerUnavailability tu WHERE tu.startDatetime <= ?2 AND tu.endDatetime >= ?1 AND tu.trainer = ?3")
    List<TrainerUnavailability> findOverlappingUnavailability(LocalDateTime start, LocalDateTime end, TrainerProfile trainer);
    
    @Query("SELECT tu FROM TrainerUnavailability tu WHERE tu.startDatetime BETWEEN ?1 AND ?2")
    List<TrainerUnavailability> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT tu FROM TrainerUnavailability tu WHERE tu.trainer = ?1 AND tu.startDatetime BETWEEN ?2 AND ?3")
    List<TrainerUnavailability> findByTrainerAndTimePeriod(TrainerProfile trainer, LocalDateTime start, LocalDateTime end);
}