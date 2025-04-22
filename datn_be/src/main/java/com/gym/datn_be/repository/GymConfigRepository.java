package com.gym.datn_be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.GymConfig;

@Repository
public interface GymConfigRepository extends JpaRepository<GymConfig, Long> {
    // Since we'll likely have only one configuration record, no additional methods needed beyond basic CRUD
}