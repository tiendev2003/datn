package com.gym.datn_be.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.SystemMetric;

@Repository
public interface SystemMetricRepository extends JpaRepository<SystemMetric, Long> {
    
    Optional<SystemMetric> findByMetricDate(LocalDate date);
    
    List<SystemMetric> findByMetricDateBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT SUM(sm.totalRevenue) FROM SystemMetric sm WHERE sm.metricDate BETWEEN :startDate AND :endDate")
    Optional<Double> sumTotalRevenueBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT SUM(sm.membershipSales) FROM SystemMetric sm WHERE sm.metricDate BETWEEN :startDate AND :endDate")
    Optional<Double> sumMembershipSalesBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT SUM(sm.ptPackageSales) FROM SystemMetric sm WHERE sm.metricDate BETWEEN :startDate AND :endDate")
    Optional<Double> sumPtPackageSalesBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT SUM(sm.newMembers) FROM SystemMetric sm WHERE sm.metricDate = :date")
    Optional<Integer> sumNewMembersByDate(LocalDate date);
    
    @Query("SELECT SUM(sm.totalVisitors) FROM SystemMetric sm WHERE sm.metricDate = :date")
    Optional<Integer> sumTotalVisitorsByDate(LocalDate date);
}