package com.gym.datn_be.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Membership;
import com.gym.datn_be.entity.Membership.MembershipStatus;
import com.gym.datn_be.entity.MembershipType;
import com.gym.datn_be.entity.User;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {
    List<Membership> findByUser(User user);
    List<Membership> findByMembershipType(MembershipType membershipType);
    List<Membership> findByMembershipStatus(MembershipStatus membershipStatus);
    
    @Query("SELECT m FROM Membership m WHERE m.startDate <= ?1 AND m.endDate >= ?1")
    List<Membership> findActiveMemberships(LocalDate currentDate);
    
    @Query("SELECT m FROM Membership m WHERE m.user = ?1 AND m.startDate <= ?2 AND m.endDate >= ?2")
    List<Membership> findActiveUserMemberships(User user, LocalDate currentDate);
    
    @Query("SELECT m FROM Membership m WHERE m.endDate BETWEEN ?1 AND ?2")
    List<Membership> findMembershipsExpiringBetween(LocalDate start, LocalDate end);
}