package com.gym.datn_be.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fitness_assessments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FitnessAssessment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assessment_id")
    private Long assessmentId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trainer_id", nullable = false)
    private TrainerProfile trainer;
    
    @Column(name = "assessment_date", nullable = false)
    private LocalDate assessmentDate;
    
    @Column(name = "weight", precision = 5, scale = 2)
    private BigDecimal weight;
    
    @Column(name = "body_fat_percentage", precision = 5, scale = 2)
    private BigDecimal bodyFatPercentage;
    
    @Column(name = "muscle_mass", precision = 5, scale = 2)
    private BigDecimal muscleMass;
    
    @Column(name = "bmi", precision = 5, scale = 2)
    private BigDecimal bmi;
    
    @Column(name = "chest_measurement", precision = 5, scale = 2)
    private BigDecimal chestMeasurement;
    
    @Column(name = "waist_measurement", precision = 5, scale = 2)
    private BigDecimal waistMeasurement;
    
    @Column(name = "hip_measurement", precision = 5, scale = 2)
    private BigDecimal hipMeasurement;
    
    @Column(name = "arm_measurement", precision = 5, scale = 2)
    private BigDecimal armMeasurement;
    
    @Column(name = "thigh_measurement", precision = 5, scale = 2)
    private BigDecimal thighMeasurement;
    
    @Column(name = "cardiovascular_fitness", length = 50)
    private String cardiovascularFitness;
    
    @Column(name = "flexibility", length = 50)
    private String flexibility;
    
    @Column(name = "strength", length = 50)
    private String strength;
    
    @Column(name = "notes")
    private String notes;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}