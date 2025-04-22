package com.gym.datn_be.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.User;
import com.gym.datn_be.entity.UserProfile;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUser(User user);
    List<UserProfile> findByNameContainingIgnoreCase(String name);
    List<UserProfile> findByEmergencyContactPhone(String emergencyContactPhone);
    Optional<UserProfile> findByUserUserId(Long userId);
    void deleteByUserUserId(Long userId);
}