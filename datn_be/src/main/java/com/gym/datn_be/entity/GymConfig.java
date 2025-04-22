package com.gym.datn_be.entity;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

import com.gym.datn_be.utils.JsonToMapConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "gym_config")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GymConfig {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "config_id")
    private Long configId;
    
    @Column(name = "gym_name", nullable = false)
    private String gymName;
    
    @Column(name = "address", nullable = false)
    private String address;
    
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;
    
    @Column(name = "email", nullable = false)
    private String email;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "monday_open")
    private LocalTime mondayOpen;
    
    @Column(name = "monday_close")
    private LocalTime mondayClose;
    
    @Column(name = "tuesday_open")
    private LocalTime tuesdayOpen;
    
    @Column(name = "tuesday_close")
    private LocalTime tuesdayClose;
    
    @Column(name = "wednesday_open")
    private LocalTime wednesdayOpen;
    
    @Column(name = "wednesday_close")
    private LocalTime wednesdayClose;
    
    @Column(name = "thursday_open")
    private LocalTime thursdayOpen;
    
    @Column(name = "thursday_close")
    private LocalTime thursdayClose;
    
    @Column(name = "friday_open")
    private LocalTime fridayOpen;
    
    @Column(name = "friday_close")
    private LocalTime fridayClose;
    
    @Column(name = "saturday_open")
    private LocalTime saturdayOpen;
    
    @Column(name = "saturday_close")
    private LocalTime saturdayClose;
    
    @Column(name = "sunday_open")
    private LocalTime sundayOpen;
    
    @Column(name = "sunday_close")
    private LocalTime sundayClose;
    
    @Column(name = "services", columnDefinition = "TEXT")
    @Convert(converter = JsonToMapConverter.class)
    private Map<String, String> services = new HashMap<>();
    
    @Column(name = "facilities", columnDefinition = "TEXT")
    @Convert(converter = JsonToMapConverter.class)
    private Map<String, String> facilities = new HashMap<>();
    
    @Column(name = "social_media_links", columnDefinition = "TEXT")
    @Convert(converter = JsonToMapConverter.class)
    private Map<String, String> socialMediaLinks = new HashMap<>();
    
    @Column(name = "logo_url")
    private String logoUrl;
    
    @Column(name = "banner_url")
    private String bannerUrl;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Column(name = "created_by")
    private Long createdBy;
    
    @Column(name = "updated_by")
    private Long updatedBy;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}