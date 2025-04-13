package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Equipment;
import com.gym.datn_be.entity.EquipmentIssue;
import com.gym.datn_be.entity.EquipmentIssue.IssueSeverity;
import com.gym.datn_be.entity.EquipmentIssue.IssueStatus;
import com.gym.datn_be.entity.GymBranch;
import com.gym.datn_be.entity.User;

@Repository
public interface EquipmentIssueRepository extends JpaRepository<EquipmentIssue, Long> {
    List<EquipmentIssue> findByEquipment(Equipment equipment);
    List<EquipmentIssue> findByReportedBy(User reportedBy);
    List<EquipmentIssue> findByAssignedTo(User assignedTo);
    List<EquipmentIssue> findBySeverity(IssueSeverity severity);
    List<EquipmentIssue> findByStatus(IssueStatus status);
    
    @Query("SELECT ei FROM EquipmentIssue ei WHERE ei.reportDate BETWEEN ?1 AND ?2")
    List<EquipmentIssue> findByReportedDateBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT ei FROM EquipmentIssue ei JOIN ei.equipment e WHERE e.branch = ?1")
    List<EquipmentIssue> findByBranch(GymBranch branch);
    
    @Query("SELECT ei FROM EquipmentIssue ei WHERE ei.status = ?1 AND ei.dueDate < ?2")
    List<EquipmentIssue> findOverdueIssues(IssueStatus status, LocalDateTime currentDate);
}