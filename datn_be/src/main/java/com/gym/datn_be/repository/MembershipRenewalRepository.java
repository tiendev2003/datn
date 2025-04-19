package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Membership;
import com.gym.datn_be.entity.MembershipRenewal;
import com.gym.datn_be.entity.User;

@Repository
public interface MembershipRenewalRepository extends JpaRepository<MembershipRenewal, Long> {
    List<MembershipRenewal> findByMembership(Membership membership);
    List<MembershipRenewal> findByProcessedBy(User processedBy);
    List<MembershipRenewal> findByRenewalDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<MembershipRenewal> findByPaymentStatus(MembershipRenewal.PaymentStatus status);
}