package com.gym.datn_be.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.dto.response.PTRevenueReportResponse;
import com.gym.datn_be.entity.PTPackage;
import com.gym.datn_be.entity.TrainerProfile;
import com.gym.datn_be.entity.User;
import com.gym.datn_be.entity.UserPTPackage;
import com.gym.datn_be.entity.UserPTPackage.PackageStatus;

@Repository
public interface UserPTPackageRepository extends JpaRepository<UserPTPackage, Long>, JpaSpecificationExecutor<UserPTPackage> {
    List<UserPTPackage> findByUser(User user);
    List<UserPTPackage> findByTrainer(TrainerProfile trainer);
    List<UserPTPackage> findByPtPackage(PTPackage ptPackage);
    List<UserPTPackage> findByPackageStatus(PackageStatus packageStatus);
    
    @Query("SELECT upt FROM UserPTPackage upt WHERE upt.user = ?1 AND upt.packageStatus = ?2")
    List<UserPTPackage> findByUserAndPackageStatus(User user, PackageStatus packageStatus);
    
    @Query("SELECT upt FROM UserPTPackage upt WHERE upt.trainer = ?1 AND upt.packageStatus = ?2")
    List<UserPTPackage> findByTrainerAndPackageStatus(TrainerProfile trainer, PackageStatus packageStatus);
    
    @Query("SELECT upt FROM UserPTPackage upt WHERE upt.startDate <= ?1 AND (upt.endDate IS NULL OR upt.endDate >= ?1) AND upt.packageStatus = 'ACTIVE'")
    List<UserPTPackage> findActivePackages(LocalDate currentDate);
    
    @Query("SELECT upt FROM UserPTPackage upt WHERE upt.user = ?1 AND upt.startDate <= ?2 AND (upt.endDate IS NULL OR upt.endDate >= ?2) AND upt.packageStatus = 'ACTIVE'")
    List<UserPTPackage> findActiveUserPackages(User user, LocalDate currentDate);
    
    @Query("SELECT upt FROM UserPTPackage upt WHERE upt.endDate BETWEEN ?1 AND ?2")
    List<UserPTPackage> findPackagesExpiringBetween(LocalDate start, LocalDate end);
    
    @Query("SELECT u FROM UserPTPackage u WHERE u.user.userId = :userId AND u.packageStatus = 'ACTIVE'")
    List<UserPTPackage> findActivePackagesByUserId(@Param("userId") Long userId);
    
    List<UserPTPackage> findByPtPackageAndPackageStatus(PTPackage ptPackage, PackageStatus packageStatus);
    
    List<UserPTPackage> findByCreatedAtBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);
    
    int countByPtPackage(PTPackage ptPackage);
    
    int countByPtPackageAndPackageStatus(PTPackage ptPackage, PackageStatus packageStatus);
    
    List<UserPTPackage> findTop5ByPtPackageOrderByCreatedAtDesc(PTPackage ptPackage);
    
    @Query("SELECT u FROM UserPTPackage u WHERE u.endDate BETWEEN :today AND :expiryDate AND u.packageStatus = :status")
    List<UserPTPackage> findExpiringPackages(
            @Param("today") LocalDate today, 
            @Param("expiryDate") LocalDate expiryDate, 
            @Param("status") PackageStatus status);
    
    @Query("SELECT u FROM UserPTPackage u WHERE u.endDate < :today AND u.packageStatus = :status")
    List<UserPTPackage> findExpiredPackages(@Param("today") LocalDate today, @Param("status") PackageStatus status);
    
    @Query("SELECT u FROM UserPTPackage u WHERE u.trainer.trainerId = :trainerId")
    List<UserPTPackage> findByTrainerId(@Param("trainerId") Long trainerId);
    
    @Query("SELECT u FROM UserPTPackage u WHERE u.trainer.trainerId = :trainerId AND u.packageStatus = 'ACTIVE'")
    List<UserPTPackage> findActivePackagesByTrainerId(@Param("trainerId") Long trainerId);
    
    @Query("SELECT u.packageStatus as status, COUNT(u) as count FROM UserPTPackage u " +
           "WHERE u.createdAt BETWEEN :startDate AND :endDate GROUP BY u.packageStatus")
    List<Object[]> countPackagesByStatusAndDateRange(
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
    
    Optional<UserPTPackage> findFirstByUserAndTrainerOrderByEndDateDesc(User user, TrainerProfile trainer);
    
    // Revenue report query methods
    @Query("SELECT SUM(u.actualPrice) FROM UserPTPackage u " +
           "WHERE u.createdAt BETWEEN :startDate AND :endDate")
    BigDecimal calculateTotalRevenueBetweenDates(
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(u) FROM UserPTPackage u " +
           "WHERE u.createdAt BETWEEN :startDate AND :endDate")
    Integer countPackagesSoldBetweenDates(
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT new map(t.user.name as name, SUM(u.actualPrice) as revenue) FROM UserPTPackage u " +
           "JOIN u.trainer t " +
           "WHERE u.createdAt BETWEEN :startDate AND :endDate " +
           "GROUP BY t.user.name")
    List<Map<String, Object>> getRevenueByTrainerBetweenDates(
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT new map(p.packageName as name, SUM(u.actualPrice) as revenue) FROM UserPTPackage u " +
           "JOIN u.ptPackage p " +
           "WHERE u.createdAt BETWEEN :startDate AND :endDate " +
           "GROUP BY p.packageName")
    List<Map<String, Object>> getRevenueByPackageTypeBetweenDates(
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT new map(FUNCTION('DATE_FORMAT', u.createdAt, '%Y-%m-%d') as day, SUM(u.actualPrice) as revenue) FROM UserPTPackage u " +
           "WHERE u.createdAt BETWEEN :startDate AND :endDate " +
           "GROUP BY FUNCTION('DATE_FORMAT', u.createdAt, '%Y-%m-%d')")
    List<Map<String, Object>> getRevenueByDayBetweenDates(
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT new map(FUNCTION('DATE_FORMAT', u.createdAt, '%Y-%m') as month, SUM(u.actualPrice) as revenue) FROM UserPTPackage u " +
           "WHERE u.createdAt BETWEEN :startDate AND :endDate " +
           "GROUP BY FUNCTION('DATE_FORMAT', u.createdAt, '%Y-%m')")
    List<Map<String, Object>> getRevenueByMonthBetweenDates(
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
    
    // Helper methods for service implementation
    default Map<String, BigDecimal> calculateRevenueByTrainerBetweenDates(LocalDateTime startDate, LocalDateTime endDate) {
        List<Map<String, Object>> results = getRevenueByTrainerBetweenDates(startDate, endDate);
        Map<String, BigDecimal> revenueByTrainer = new java.util.HashMap<>();
        
        for (Map<String, Object> result : results) {
            String trainerName = (String) result.get("name");
            BigDecimal revenue = (BigDecimal) result.get("revenue");
            revenueByTrainer.put(trainerName, revenue);
        }
        
        return revenueByTrainer;
    }
    
    default Map<String, BigDecimal> calculateRevenueByPackageTypeBetweenDates(LocalDateTime startDate, LocalDateTime endDate) {
        List<Map<String, Object>> results = getRevenueByPackageTypeBetweenDates(startDate, endDate);
        Map<String, BigDecimal> revenueByPackage = new java.util.HashMap<>();
        
        for (Map<String, Object> result : results) {
            String packageName = (String) result.get("name");
            BigDecimal revenue = (BigDecimal) result.get("revenue");
            revenueByPackage.put(packageName, revenue);
        }
        
        return revenueByPackage;
    }
    
    default Map<String, BigDecimal> calculateRevenueByDayBetweenDates(LocalDateTime startDate, LocalDateTime endDate) {
        List<Map<String, Object>> results = getRevenueByDayBetweenDates(startDate, endDate);
        Map<String, BigDecimal> revenueByDay = new java.util.HashMap<>();
        
        for (Map<String, Object> result : results) {
            String day = (String) result.get("day");
            BigDecimal revenue = (BigDecimal) result.get("revenue");
            revenueByDay.put(day, revenue);
        }
        
        return revenueByDay;
    }
    
    default Map<String, BigDecimal> calculateRevenueByMonthBetweenDates(LocalDateTime startDate, LocalDateTime endDate) {
        List<Map<String, Object>> results = getRevenueByMonthBetweenDates(startDate, endDate);
        Map<String, BigDecimal> revenueByMonth = new java.util.HashMap<>();
        
        for (Map<String, Object> result : results) {
            String month = (String) result.get("month");
            BigDecimal revenue = (BigDecimal) result.get("revenue");
            revenueByMonth.put(month, revenue);
        }
        
        return revenueByMonth;
    }
    
    // Method to get package revenue details
    @Query("SELECT new com.gym.datn_be.dto.response.PTRevenueReportResponse$PackageRevenueDetail(" +
           "p.packageId, p.packageName, p.numberOfSessions, p.validityDays, p.price, " +
           "SUM(u.actualPrice), COUNT(u), 0.0, " +
           "SUM(CASE WHEN u.packageStatus = 'ACTIVE' THEN 1 ELSE 0 END), " +
           "SUM(CASE WHEN u.packageStatus = 'COMPLETED' THEN 1 ELSE 0 END)) " +
           "FROM UserPTPackage u JOIN u.ptPackage p " +
           "WHERE u.createdAt BETWEEN :startDate AND :endDate " +
           "GROUP BY p.packageId, p.packageName, p.numberOfSessions, p.validityDays, p.price")
    List<PTRevenueReportResponse.PackageRevenueDetail> getPackageRevenueDetailsBetweenDates(
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
}