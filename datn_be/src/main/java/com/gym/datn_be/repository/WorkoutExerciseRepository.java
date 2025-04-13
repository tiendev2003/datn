package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Exercise;
import com.gym.datn_be.entity.WorkoutExercise;
import com.gym.datn_be.entity.WorkoutSession;

@Repository
public interface WorkoutExerciseRepository extends JpaRepository<WorkoutExercise, Long> {
    List<WorkoutExercise> findByWorkoutSession(WorkoutSession workoutSession);
    List<WorkoutExercise> findByExercise(Exercise exercise);
    List<WorkoutExercise> findByWorkoutSessionOrderBySequenceNumber(WorkoutSession workoutSession);
}