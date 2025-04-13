package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.TrainerProfile;
import com.gym.datn_be.entity.TrainerRating;
import com.gym.datn_be.entity.User;

@Repository
public interface TrainerRatingRepository extends JpaRepository<TrainerRating, Long> {
    List<TrainerRating> findByUser(User user);
    List<TrainerRating> findByTrainer(TrainerProfile trainer);
    List<TrainerRating> findByRatingGreaterThanEqual(int minRating);
    List<TrainerRating> findByRatingLessThanEqual(int maxRating);
    
    @Query("SELECT AVG(tr.rating) FROM TrainerRating tr WHERE tr.trainer = ?1")
    Double findAverageRatingByTrainer(TrainerProfile trainer);
    
    @Query("SELECT tr FROM TrainerRating tr WHERE tr.createdAt BETWEEN ?1 AND ?2")
    List<TrainerRating> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}