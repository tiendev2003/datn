package com.gym.datn_be.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.MembershipBenefit;
import com.gym.datn_be.entity.MembershipType;

@Repository
public interface MembershipBenefitRepository extends JpaRepository<MembershipBenefit, Long> {
    List<MembershipBenefit> findByMembershipTypes(MembershipType membershipType);
    Optional<MembershipBenefit> findByBenefitName(String benefitName);
    List<MembershipBenefit> findByBenefitNameContainingIgnoreCase(String keyword);
}