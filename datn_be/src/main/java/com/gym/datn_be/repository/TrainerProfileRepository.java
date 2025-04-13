package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.TrainerProfile;
import com.gym.datn_be.entity.User;

@Repository
public interface TrainerProfileRepository extends JpaRepository<TrainerProfile, Long> {
    TrainerProfile findByUser(User user);
    List<TrainerProfile> findBySpecializationContainingIgnoreCase(String specialization);
    List<TrainerProfile> findByExperienceYearsGreaterThanEqual(int years);
    List<TrainerProfile> findByIsActiveTrue();
}