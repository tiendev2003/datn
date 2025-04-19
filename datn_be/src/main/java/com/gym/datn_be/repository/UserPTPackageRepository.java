package com.gym.datn_be.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
}