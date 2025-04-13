package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Announcement;
import com.gym.datn_be.entity.Announcement.AnnouncementType;
import com.gym.datn_be.entity.GymBranch;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByIsActiveTrue();
    List<Announcement> findByBranch(GymBranch branch);
    List<Announcement> findByAnnouncementType(AnnouncementType announcementType);
    
    @Query("SELECT a FROM Announcement a WHERE a.isActive = true AND a.startDate <= ?1 AND (a.endDate IS NULL OR a.endDate >= ?1)")
    List<Announcement> findCurrentAnnouncements(LocalDateTime now);
    
    List<Announcement> findByIsActiveTrueAndBranch(GymBranch branch);
    List<Announcement> findByIsActiveTrueAndAnnouncementType(AnnouncementType announcementType);
}