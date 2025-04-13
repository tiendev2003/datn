package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.User;
import com.gym.datn_be.entity.WorkoutPlan;
import com.gym.datn_be.entity.WorkoutSession;
import com.gym.datn_be.entity.WorkoutSession.SessionStatus;
 
@Repository
public interface WorkoutSessionRepository extends JpaRepository<WorkoutSession, Long> {
    @Query("SELECT ws FROM WorkoutSession ws WHERE ws.workoutPlan.user = ?1")
    List<WorkoutSession> findByWorkoutPlanUser(User user);
    
    List<WorkoutSession> findByWorkoutPlan(WorkoutPlan workoutPlan);
    List<WorkoutSession> findBySessionStatus(SessionStatus sessionStatus);
    
    @Query("SELECT ws FROM WorkoutSession ws WHERE ws.scheduledDate BETWEEN ?1 AND ?2")
    List<WorkoutSession> findByScheduledDateBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT ws FROM WorkoutSession ws WHERE ws.workoutPlan.user = ?1 AND ws.scheduledDate BETWEEN ?2 AND ?3")
    List<WorkoutSession> findByWorkoutPlanUserAndScheduledDateBetween(User user, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT ws FROM WorkoutSession ws WHERE ws.workoutPlan.user = ?1 AND ws.sessionStatus = ?2")
    List<WorkoutSession> findByWorkoutPlanUserAndSessionStatus(User user, SessionStatus sessionStatus);
}