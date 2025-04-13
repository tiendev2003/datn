package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.TrainerProfile;
import com.gym.datn_be.entity.User;
import com.gym.datn_be.entity.WorkoutPlan;
import com.gym.datn_be.entity.WorkoutPlan.PlanStatus;

@Repository
public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan, Long> {
    List<WorkoutPlan> findByUser(User user);
    List<WorkoutPlan> findByTrainer(TrainerProfile trainer);
    List<WorkoutPlan> findByPlanStatus(PlanStatus planStatus);
    List<WorkoutPlan> findByPlanNameContainingIgnoreCase(String keyword);
}