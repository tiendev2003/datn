package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.Booking.BookingStatus;
import com.gym.datn_be.entity.PTSession;
import com.gym.datn_be.entity.UserPTPackage;

@Repository
public interface PTSessionRepository extends JpaRepository<PTSession, Long>, JpaSpecificationExecutor<PTSession> {
    
    /**
     * Tìm buổi tập theo gói PT người dùng và trạng thái đang chờ
     * 
     * @param userPackage Gói PT người dùng
     * @return Danh sách các buổi tập đang chờ
     */
    @Query("SELECT s FROM PTSession s JOIN s.booking b WHERE s.userPackage = :userPackage AND b.status = 'PENDING'")
    List<PTSession> findByUserPackageAndStatusPending(@Param("userPackage") UserPTPackage userPackage);
    
    /**
     * Tìm buổi tập gần nhất đã hoàn thành
     * 
     * @param userPackage Gói PT người dùng
     * @param completed Đã hoàn thành hay chưa
     * @return Buổi tập gần nhất đã hoàn thành
     */
    @Query("SELECT s FROM PTSession s JOIN s.booking b WHERE s.userPackage = :userPackage AND b.status = 'COMPLETED' ORDER BY b.endDateTime DESC")
    PTSession findTopByUserPackageAndCompletedOrderByEndDateTimeDesc(@Param("userPackage") UserPTPackage userPackage, @Param("completed") boolean completed);
    
    /**
     * Tìm buổi tập tiếp theo theo trạng thái
     * 
     * @param userPackage Gói PT người dùng
     * @param status Trạng thái buổi tập
     * @return Buổi tập tiếp theo
     */
    @Query("SELECT s FROM PTSession s JOIN s.booking b WHERE s.userPackage = :userPackage AND b.status = :status AND b.startDateTime > CURRENT_TIMESTAMP ORDER BY b.startDateTime ASC")
    PTSession findTopByUserPackageAndStatusOrderByStartDateTimeAsc(@Param("userPackage") UserPTPackage userPackage, @Param("status") BookingStatus status);
    
    /**
     * Đếm số buổi tập đã hủy của gói PT người dùng
     * 
     * @param userPackage Gói PT người dùng
     * @return Số buổi tập đã hủy
     */
    @Query("SELECT COUNT(s) FROM PTSession s JOIN s.booking b WHERE s.userPackage = :userPackage AND b.status = 'CANCELLED'")
    int countCancelledSessionsByUserPackage(@Param("userPackage") UserPTPackage userPackage);
    
    /**
     * Tìm các buổi tập trong khoảng thời gian và theo huấn luyện viên
     * 
     * @param trainerId ID huấn luyện viên
     * @param startDateTime Thời gian bắt đầu
     * @param endDateTime Thời gian kết thúc
     * @return Danh sách các buổi tập
     */
    @Query("SELECT s FROM PTSession s JOIN s.userPackage up JOIN s.booking b " + 
           "WHERE up.trainer.trainerId = :trainerId AND " +
           "((b.startDateTime BETWEEN :startDateTime AND :endDateTime) OR " +
           "(b.endDateTime BETWEEN :startDateTime AND :endDateTime))")
    List<PTSession> findByTrainerAndTimeRange(
            @Param("trainerId") Long trainerId, 
            @Param("startDateTime") LocalDateTime startDateTime, 
            @Param("endDateTime") LocalDateTime endDateTime);
    
    /**
     * Đếm số buổi tập theo trạng thái và huấn luyện viên
     * 
     * @param trainerId ID huấn luyện viên
     * @param status Trạng thái buổi tập
     * @param startDate Ngày bắt đầu
     * @param endDate Ngày kết thúc
     * @return Số buổi tập
     */
    @Query("SELECT COUNT(s) FROM PTSession s JOIN s.userPackage up JOIN s.booking b " +
           "WHERE up.trainer.trainerId = :trainerId AND b.status = :status AND " +
           "b.startDateTime BETWEEN :startDate AND :endDate")
    int countSessionsByTrainerAndStatus(
            @Param("trainerId") Long trainerId, 
            @Param("status") BookingStatus status,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);
}