package com.gym.datn_be.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Equipment;
import com.gym.datn_be.entity.EquipmentMaintenance;
import com.gym.datn_be.entity.EquipmentMaintenance.MaintenanceType;
import com.gym.datn_be.entity.GymBranch;

@Repository
public interface EquipmentMaintenanceRepository extends JpaRepository<EquipmentMaintenance, Long> {
    List<EquipmentMaintenance> findByEquipment(Equipment equipment);
    List<EquipmentMaintenance> findByPerformedByContaining(String performedBy);
    List<EquipmentMaintenance> findByMaintenanceType(MaintenanceType maintenanceType);
    
    @Query("SELECT em FROM EquipmentMaintenance em WHERE em.maintenanceDate BETWEEN ?1 AND ?2")
    List<EquipmentMaintenance> findByMaintenanceDateBetween(LocalDate start, LocalDate end);
    
    @Query("SELECT em FROM EquipmentMaintenance em JOIN em.equipment e WHERE e.branch = ?1")
    List<EquipmentMaintenance> findByBranch(GymBranch branch);
    
    @Query("SELECT em FROM EquipmentMaintenance em JOIN em.equipment e WHERE e.branch = ?1 AND em.maintenanceDate BETWEEN ?2 AND ?3")
    List<EquipmentMaintenance> findByBranchAndMaintenanceDateBetween(GymBranch branch, LocalDate start, LocalDate end);
}