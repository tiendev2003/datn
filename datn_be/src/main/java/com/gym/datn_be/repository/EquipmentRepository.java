package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Equipment;
import com.gym.datn_be.entity.Equipment.EquipmentStatus;
import com.gym.datn_be.entity.EquipmentCategory;
import com.gym.datn_be.entity.GymBranch;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    List<Equipment> findByStatus(EquipmentStatus status);
    List<Equipment> findByCategory(EquipmentCategory category);
    List<Equipment> findByBranch(GymBranch branch);
    List<Equipment> findByBranchAndStatus(GymBranch branch, EquipmentStatus status);
    List<Equipment> findByEquipmentNameContainingIgnoreCase(String keyword);
    int countByBranchAndStatus(GymBranch branch, EquipmentStatus status);
}