package com.gym.datn_be.entity;

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
@Table(name = "user_activity_metrics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserActivityMetric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "metric_id")
    private Long metricId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "activity_date", nullable = false)
    private LocalDate activityDate;

    @Column(name = "visit_count", nullable = false)
    private Integer visitCount = 0;

    @Column(name = "total_duration_minutes", nullable = false)
    private Integer totalDurationMinutes = 0;

    @Column(name = "class_attendances", nullable = false)
    private Integer classAttendances = 0;

    @Column(name = "pt_sessions", nullable = false)
    private Integer ptSessions = 0;

    @Column(name = "areas_used")
    private String areasUsed; // Comma-separated IDs

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated = LocalDateTime.now();
}