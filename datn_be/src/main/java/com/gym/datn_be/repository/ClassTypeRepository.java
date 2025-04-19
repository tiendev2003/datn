package com.gym.datn_be.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.ClassType;

@Repository
public interface ClassTypeRepository extends JpaRepository<ClassType, Long> {
    List<ClassType> findByIsActiveTrue();
    Optional<ClassType> findByTypeNameIgnoreCase(String typeName);
    List<ClassType> findByTypeNameContainingIgnoreCase(String keyword);
}