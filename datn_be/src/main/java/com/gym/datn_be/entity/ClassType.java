package com.gym.datn_be.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "class_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassType {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_type_id")
    private Long classTypeId;
    
    @Column(name = "type_name", nullable = false, length = 100)
    private String typeName;
    
    @Column(name = "description")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "intensity_level", nullable = false)
    private IntensityLevel intensityLevel;
    
    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
    
    @Column(name = "max_participants", nullable = false)
    private Integer maxParticipants;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "class_type_branches",
        joinColumns = @JoinColumn(name = "class_type_id"),
        inverseJoinColumns = @JoinColumn(name = "branch_id")
    )
    private Set<GymBranch> branches = new HashSet<>();
    
    // Enum for intensity level
    public enum IntensityLevel {
        LOW, MEDIUM, HIGH
    }
}