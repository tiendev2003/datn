package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.LoginAttempt;
import com.gym.datn_be.entity.User;

@Repository
public interface LoginAttemptRepository extends JpaRepository<LoginAttempt, Long> {
    List<LoginAttempt> findByUserOrderByAttemptTimeDesc(User user);
    
    List<LoginAttempt> findByUserAndAttemptTimeAfterOrderByAttemptTimeDesc(User user, LocalDateTime time);
    
    List<LoginAttempt> findByUserAndStatusAndAttemptTimeAfterOrderByAttemptTimeDesc(
            User user, LoginAttempt.Status status, LocalDateTime time);
    
    long countByUserAndStatusAndAttemptTimeAfter(User user, LoginAttempt.Status status, LocalDateTime time);
}