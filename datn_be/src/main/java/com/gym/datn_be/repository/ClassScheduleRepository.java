package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.ClassSchedule;
import com.gym.datn_be.entity.ClassSchedule.ClassStatus;
import com.gym.datn_be.entity.ClassType;
import com.gym.datn_be.entity.User;

@Repository
public interface ClassScheduleRepository extends JpaRepository<ClassSchedule, Long> {

    List<ClassSchedule> findByClassType(ClassType classType);

    List<ClassSchedule> findByTrainerAndStatusAndStartTimeBetween(
            User trainer, ClassStatus status, LocalDateTime start, LocalDateTime end);

    @Query("SELECT cs FROM ClassSchedule cs WHERE " +
            "(:keyword IS NULL OR LOWER(cs.classType.typeName) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
            "(:classTypeId IS NULL OR cs.classType.classTypeId = :classTypeId) AND " +
            "(:trainerId IS NULL OR cs.trainer.trainerId = :trainerId) AND " +
            "(:status IS NULL OR cs.status = :status) AND " +
            "(:startDate IS NULL OR cs.startTime >= :startDate) AND " +
            "(:endDate IS NULL OR cs.startTime <= :endDate)")
    Page<ClassSchedule> findByFilters(
            String keyword, Long classTypeId, Long trainerId, 
            ClassStatus status, LocalDateTime startDate, LocalDateTime endDate,
            Pageable pageable);

    List<ClassSchedule> findByStartTimeBetweenAndStatus(
            LocalDateTime start, LocalDateTime end, ClassStatus status);

    @Query("SELECT COUNT(cs) FROM ClassSchedule cs WHERE cs.status = :status " +
            "AND cs.startTime BETWEEN :start AND :end")
    Long countByStatusAndStartTimeBetween(ClassStatus status, LocalDateTime start, LocalDateTime end);
}