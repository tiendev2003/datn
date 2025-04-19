package com.gym.datn_be.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "class_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_type_id")
    private Long classTypeId;
    
    @Column(name = "type_name", nullable = false, length = 100)
    private String typeName;
    
    @Column(name = "description", length = 1000)
    private String description;
    
    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;
    
    @Column(name = "max_capacity", nullable = false)
    private Integer maxCapacity;
    
    @Column(name = "intensity", length = 50)
    private String intensity;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "classType", cascade = CascadeType.ALL)
    private List<ClassSchedule> schedules = new ArrayList<>();
}