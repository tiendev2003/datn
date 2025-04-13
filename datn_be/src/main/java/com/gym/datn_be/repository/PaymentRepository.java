package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Payment;
import com.gym.datn_be.entity.Payment.PaymentMethod;
import com.gym.datn_be.entity.Payment.PaymentStatus;
import com.gym.datn_be.entity.Payment.PaymentType;
import com.gym.datn_be.entity.User;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUser(User user);
    List<Payment> findByPaymentStatus(PaymentStatus paymentStatus);
    List<Payment> findByPaymentMethod(PaymentMethod paymentMethod);
    List<Payment> findByPaymentType(PaymentType paymentType);
    
    @Query("SELECT p FROM Payment p WHERE p.paymentDate BETWEEN ?1 AND ?2")
    List<Payment> findByPaymentDateBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT p FROM Payment p WHERE p.user = ?1 AND p.paymentDate BETWEEN ?2 AND ?3")
    List<Payment> findByUserAndPaymentDateBetween(User user, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.paymentStatus = 'COMPLETED' AND p.paymentDate BETWEEN ?1 AND ?2")
    Double getTotalSuccessfulPaymentsInPeriod(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.user = ?1 AND p.paymentStatus = 'COMPLETED'")
    Double getTotalUserPayments(User user);
}