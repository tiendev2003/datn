package com.gym.datn_be.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

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
@Table(name = "system_metrics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemMetric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "metric_id")
    private Long metricId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private GymBranch branch;

    @Column(name = "metric_date", nullable = false)
    private LocalDate metricDate;

    @Column(name = "total_visitors", nullable = false)
    private Integer totalVisitors = 0;

    @Column(name = "new_members", nullable = false)
    private Integer newMembers = 0;

    @Column(name = "total_bookings", nullable = false)
    private Integer totalBookings = 0;

    @Column(name = "class_bookings", nullable = false)
    private Integer classBookings = 0;

    @Column(name = "pt_bookings", nullable = false)
    private Integer ptBookings = 0;

    @Column(name = "equipment_bookings", nullable = false)
    private Integer equipmentBookings = 0;

    @Column(name = "membership_sales", nullable = false, precision = 10, scale = 2)
    private BigDecimal membershipSales = BigDecimal.ZERO;

    @Column(name = "pt_package_sales", nullable = false, precision = 10, scale = 2)
    private BigDecimal ptPackageSales = BigDecimal.ZERO;

    @Column(name = "peak_hour_start")
    private LocalTime peakHourStart;

    @Column(name = "peak_hour_visitors")
    private Integer peakHourVisitors;

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated = LocalDateTime.now();
}