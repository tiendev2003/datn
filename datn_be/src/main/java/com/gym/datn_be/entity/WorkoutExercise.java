package com.gym.datn_be.entity;

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
@Table(name = "workout_exercises")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExercise {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workout_exercise_id")
    private Long workoutExerciseId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private WorkoutSession workoutSession;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;
    
    @Column(name = "sequence_number", nullable = false)
    private Integer sequenceNumber;
    
    @Column(name = "sets")
    private Integer sets;
    
    @Column(name = "reps")
    private String reps;
    
    @Column(name = "weight")
    private String weight;
    
    @Column(name = "duration")
    private String duration;
    
    @Column(name = "rest_period")
    private String restPeriod;
    
    @Column(name = "notes")
    private String notes;
    
    @Column(name = "actual_sets_completed")
    private Integer actualSetsCompleted;
    
    @Column(name = "actual_reps_completed")
    private String actualRepsCompleted;
    
    @Column(name = "actual_weight_used")
    private String actualWeightUsed;
    
    @Column(name = "perceived_difficulty")
    private Integer perceivedDifficulty;
}