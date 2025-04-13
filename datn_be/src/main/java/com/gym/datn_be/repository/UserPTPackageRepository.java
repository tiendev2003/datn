package com.gym.datn_be.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.PTPackage;
import com.gym.datn_be.entity.TrainerProfile;
import com.gym.datn_be.entity.User;
import com.gym.datn_be.entity.UserPTPackage;
import com.gym.datn_be.entity.UserPTPackage.PackageStatus;

@Repository
public interface UserPTPackageRepository extends JpaRepository<UserPTPackage, Long> {
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
}