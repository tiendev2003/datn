package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Feedback;
import com.gym.datn_be.entity.Feedback.FeedbackStatus;
import com.gym.datn_be.entity.Feedback.FeedbackType;
import com.gym.datn_be.entity.GymBranch;
import com.gym.datn_be.entity.User;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByUser(User user);
    List<Feedback> findByFeedbackType(FeedbackType feedbackType);
    List<Feedback> findByStatus(FeedbackStatus status);
    List<Feedback> findByBranch(GymBranch branch);
    
    @Query("SELECT f FROM Feedback f WHERE f.createdAt BETWEEN ?1 AND ?2")
    List<Feedback> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT f FROM Feedback f WHERE f.branch = ?1 AND f.status = ?2")
    List<Feedback> findByBranchAndStatus(GymBranch branch, FeedbackStatus status);
    
    @Query("SELECT f FROM Feedback f WHERE f.branch = ?1 AND f.createdAt BETWEEN ?2 AND ?3")
    List<Feedback> findByBranchAndCreatedAtBetween(GymBranch branch, LocalDateTime start, LocalDateTime end);
}