package com.gym.datn_be.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    @Column(name = "location", nullable = false)
    private String location;

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

    @Column(name = "membership_sales", nullable = false, precision = 10, scale = 2)
    private BigDecimal membershipSales = BigDecimal.ZERO;

    @Column(name = "pt_package_sales", nullable = false, precision = 10, scale = 2)
    private BigDecimal ptPackageSales = BigDecimal.ZERO;

    @Column(name = "other_sales", nullable = false, precision = 10, scale = 2)
    private BigDecimal otherSales = BigDecimal.ZERO;

    @Column(name = "total_revenue", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalRevenue = BigDecimal.ZERO;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "notes")
    private String notes;
}