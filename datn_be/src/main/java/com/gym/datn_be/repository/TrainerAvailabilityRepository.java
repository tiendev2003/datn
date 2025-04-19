package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.TrainerAvailability;

@Repository
public interface TrainerAvailabilityRepository extends JpaRepository<TrainerAvailability, Long> {

    List<TrainerAvailability> findByTrainerTrainerId(Long trainerId);
    
    @Query("SELECT ta FROM TrainerAvailability ta WHERE ta.trainer.trainerId = :trainerId")
    List<TrainerAvailability> findByTrainerId(@Param("trainerId") Long trainerId);
    
    @Modifying
    @Query("DELETE FROM TrainerAvailability ta WHERE ta.trainer.trainerId = :trainerId")
    void deleteByTrainerId(@Param("trainerId") Long trainerId);
}