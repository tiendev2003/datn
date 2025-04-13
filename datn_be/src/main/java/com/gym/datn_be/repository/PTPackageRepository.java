package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.PTPackage;

@Repository
public interface PTPackageRepository extends JpaRepository<PTPackage, Long> {
    List<PTPackage> findByPackageNameContainingIgnoreCase(String keyword);
    List<PTPackage> findByIsActiveTrue();
    List<PTPackage> findByNumberOfSessions(int numberOfSessions);
    List<PTPackage> findByPriceLessThanEqual(double maxPrice);
    List<PTPackage> findByPriceGreaterThanEqual(double minPrice);
    List<PTPackage> findByPriceBetween(double minPrice, double maxPrice);
}