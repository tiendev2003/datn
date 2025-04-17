package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Exercise;
import com.gym.datn_be.entity.Exercise.DifficultyLevel;
import com.gym.datn_be.entity.Exercise.ExerciseCategory;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findByExerciseNameContainingIgnoreCase(String keyword);
    List<Exercise> findByDifficultyLevel(DifficultyLevel difficultyLevel);
    List<Exercise> findByCategory(ExerciseCategory category);
    List<Exercise> findByIsActiveTrue();
}