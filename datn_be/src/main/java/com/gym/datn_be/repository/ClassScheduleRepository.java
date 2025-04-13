package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.ClassSchedule;
import com.gym.datn_be.entity.ClassSchedule.ClassStatus;
import com.gym.datn_be.entity.ClassSchedule.DayOfWeek;
import com.gym.datn_be.entity.ClassType;
import com.gym.datn_be.entity.GymBranch;
import com.gym.datn_be.entity.TrainerProfile;

@Repository
public interface ClassScheduleRepository extends JpaRepository<ClassSchedule, Long> {
    List<ClassSchedule> findByClassType(ClassType classType);
    List<ClassSchedule> findByTrainer(TrainerProfile trainer);
    List<ClassSchedule> findByStatus(ClassStatus status);
    List<ClassSchedule> findByBranch(GymBranch branch);
    List<ClassSchedule> findByDayOfWeek(DayOfWeek dayOfWeek);
    
    @Query("SELECT cs FROM ClassSchedule cs WHERE cs.startDateTime <= ?1 AND cs.endDateTime >= ?1")
    List<ClassSchedule> findOngoingClasses(LocalDateTime now);
    
    @Query("SELECT cs FROM ClassSchedule cs WHERE cs.startDateTime BETWEEN ?1 AND ?2")
    List<ClassSchedule> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT cs FROM ClassSchedule cs WHERE cs.branch = ?1 AND cs.dayOfWeek = ?2 AND cs.status = 'ACTIVE'")
    List<ClassSchedule> findActiveBranchClassesByDay(GymBranch branch, DayOfWeek dayOfWeek);
    
    @Query("SELECT cs FROM ClassSchedule cs WHERE cs.trainer = ?1 AND cs.startDateTime BETWEEN ?2 AND ?3")
    List<ClassSchedule> findByTrainerAndTimePeriod(TrainerProfile trainer, LocalDateTime start, LocalDateTime end);
}