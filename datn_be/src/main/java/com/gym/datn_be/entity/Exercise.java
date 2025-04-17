package com.gym.datn_be.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "exercises")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_id")
    private Long exerciseId;
    
    @Column(name = "exercise_name", nullable = false, length = 100)
    private String exerciseName;
    
    @Column(name = "description")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private ExerciseCategory category;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty_level", nullable = false)
    private DifficultyLevel difficultyLevel;
    
    @Column(name = "instructions")
    private String instructions;
    
    @Column(name = "demo_video_url")
    private String demoVideoUrl;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "target_muscles")
    private String targetMuscles;
    
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
    
    // Enum for exercise category
    public enum ExerciseCategory {
        STRENGTH, CARDIO, FLEXIBILITY, BALANCE, FUNCTIONAL
    }
    
    // Enum for difficulty level
    public enum DifficultyLevel {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
}