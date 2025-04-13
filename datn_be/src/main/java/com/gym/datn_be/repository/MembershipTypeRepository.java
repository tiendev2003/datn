package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.MembershipType;

@Repository
public interface MembershipTypeRepository extends JpaRepository<MembershipType, Long> {
    List<MembershipType> findByTypeNameContainingIgnoreCase(String keyword);
    List<MembershipType> findByIsActiveTrue();
    List<MembershipType> findByDurationDays(int durationDays);
    List<MembershipType> findByPriceLessThanEqual(double maxPrice);
    List<MembershipType> findByPriceGreaterThanEqual(double minPrice);
    List<MembershipType> findByPriceBetween(double minPrice, double maxPrice);
}