package com.gym.datn_be.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.TrainerUnavailability;

@Repository
public interface TrainerUnavailabilityRepository extends JpaRepository<TrainerUnavailability, Long> {

    List<TrainerUnavailability> findByTrainerTrainerId(Long trainerId);
    
    @Query("SELECT tu FROM TrainerUnavailability tu WHERE tu.trainer.trainerId = :trainerId " +
           "AND ((tu.startDatetime BETWEEN :startDateTime AND :endDateTime) " +
           "OR (tu.endDatetime BETWEEN :startDateTime AND :endDateTime) " +
           "OR (:startDateTime BETWEEN tu.startDatetime AND tu.endDatetime))")
    List<TrainerUnavailability> findByTrainerIdAndDateRange(
            @Param("trainerId") Long trainerId,
            @Param("startDateTime") LocalDateTime startDateTime,
            @Param("endDateTime") LocalDateTime endDateTime);
}