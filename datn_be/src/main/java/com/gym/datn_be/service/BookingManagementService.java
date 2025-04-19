package com.gym.datn_be.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gym.datn_be.dto.request.BookingCreateRequest;
import com.gym.datn_be.dto.request.BookingUpdateRequest;
import com.gym.datn_be.dto.response.BookingDetailResponse;
import com.gym.datn_be.dto.response.BookingResponse;
import com.gym.datn_be.dto.response.BookingStatsResponse;

public interface BookingManagementService {
    
    /**
     * Get all bookings with various filter options
     */
    Page<BookingResponse> getAllBookings(String keyword, String bookingType, Long userId, 
                                         Long trainerId, String status, String startDate, 
                                         String endDate, Pageable pageable);
    
    /**
     * Get detailed information about a specific booking
     */
    BookingDetailResponse getBookingDetails(Long bookingId);
    
    /**
     * Create a new booking
     */
    BookingDetailResponse createBooking(BookingCreateRequest request);
    
    /**
     * Update an existing booking
     */
    BookingDetailResponse updateBooking(Long bookingId, BookingUpdateRequest request);
    
    /**
     * Delete a booking
     */
    void deleteBooking(Long bookingId);
    
    /**
     * Cancel a booking
     */
    void cancelBooking(Long bookingId, String reason);
    
    /**
     * Check in a user for their booking
     */
    void checkInBooking(Long bookingId);
    
    /**
     * Mark a booking as completed
     */
    void completeBooking(Long bookingId);
    
    /**
     * Mark a booking as no show
     */
    void markNoShow(Long bookingId);
    
    /**
     * Get booking statistics for a date range
     */
    BookingStatsResponse getBookingStatistics(String startDate, String endDate);
    
    /**
     * Get currently active bookings
     */
    Page<BookingResponse> getCurrentBookings(Pageable pageable);
    
    /**
     * Get upcoming bookings for a specified number of days
     */
    Page<BookingResponse> getUpcomingBookings(Integer days, Pageable pageable);
}