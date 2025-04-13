package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.GymBranch;

@Repository
public interface GymBranchRepository extends JpaRepository<GymBranch, Long> {
    List<GymBranch> findByBranchName(String name);
    List<GymBranch> findByCity(String city);
    List<GymBranch> findByIsActiveTrue();
    List<GymBranch> findByBranchNameContainingIgnoreCase(String keyword);
    List<GymBranch> findByAddressContainingIgnoreCase(String keyword);
}