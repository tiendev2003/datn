package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.ClassType;
import com.gym.datn_be.entity.ClassType.IntensityLevel;
import com.gym.datn_be.entity.GymBranch;

@Repository
public interface ClassTypeRepository extends JpaRepository<ClassType, Long> {
    List<ClassType> findByTypeName(String typeName);
    List<ClassType> findByIntensityLevel(IntensityLevel intensityLevel);
    List<ClassType> findByIsActiveTrue();
    
    @Query("SELECT ct FROM ClassType ct JOIN ct.branches b WHERE b = ?1")
    List<ClassType> findByBranch(GymBranch branch);
    
    List<ClassType> findByTypeNameContainingIgnoreCase(String keyword);
    
    @Query("SELECT ct FROM ClassType ct WHERE ct.maxParticipants >= ?1")
    List<ClassType> findByMinCapacity(int capacity);
}