package com.gym.datn_be.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.TrainerRating;

@Repository
public interface TrainerRatingRepository extends JpaRepository<TrainerRating, Long> {

    Page<TrainerRating> findByTrainerTrainerId(Long trainerId, Pageable pageable);
    
    @Query("SELECT AVG(tr.rating) FROM TrainerRating tr WHERE tr.trainer.trainerId = :trainerId")
    Double findAverageRatingByTrainerId(@Param("trainerId") Long trainerId);
    
    @Query("SELECT COUNT(tr) FROM TrainerRating tr WHERE tr.trainer.trainerId = :trainerId")
    Integer countByTrainerId(@Param("trainerId") Long trainerId);
}