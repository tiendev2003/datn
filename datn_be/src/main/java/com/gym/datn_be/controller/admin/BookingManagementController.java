package com.gym.datn_be.controller.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.gym.datn_be.dto.request.BookingCreateRequest;
import com.gym.datn_be.dto.request.BookingUpdateRequest;
import com.gym.datn_be.dto.response.ApiResponse;
import com.gym.datn_be.dto.response.BookingDetailResponse;
import com.gym.datn_be.dto.response.BookingResponse;
import com.gym.datn_be.dto.response.BookingStatsResponse;
import com.gym.datn_be.service.BookingManagementService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/bookings")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class BookingManagementController {

    private final BookingManagementService bookingService;

    @GetMapping
    public ResponseEntity<Page<BookingResponse>> getAllBookings(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String bookingType,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Long trainerId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            Pageable pageable) {
        return ResponseEntity.ok(bookingService.getAllBookings(keyword, bookingType, userId, trainerId, status, startDate, endDate, pageable));
    }
    
    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingDetailResponse> getBookingDetails(@PathVariable Long bookingId) {
        return ResponseEntity.ok(bookingService.getBookingDetails(bookingId));
    }
    
    @PostMapping
    public ResponseEntity<BookingDetailResponse> createBooking(
            @Valid @RequestBody BookingCreateRequest request) {
        return new ResponseEntity<>(bookingService.createBooking(request), HttpStatus.CREATED);
    }
    
    @PutMapping("/{bookingId}")
    public ResponseEntity<BookingDetailResponse> updateBooking(
            @PathVariable Long bookingId,
            @Valid @RequestBody BookingUpdateRequest request) {
        return ResponseEntity.ok(bookingService.updateBooking(bookingId, request));
    }
    
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<ApiResponse> deleteBooking(@PathVariable Long bookingId) {
        bookingService.deleteBooking(bookingId);
        return ResponseEntity.ok(new ApiResponse(true, "Lịch đặt đã được xóa thành công"));
    }
    
    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<ApiResponse> cancelBooking(
            @PathVariable Long bookingId,
            @RequestParam(required = false) String reason) {
        bookingService.cancelBooking(bookingId, reason);
        return ResponseEntity.ok(new ApiResponse(true, "Lịch đặt đã được hủy thành công"));
    }
    
    @PutMapping("/{bookingId}/check-in")
    public ResponseEntity<ApiResponse> checkInBooking(@PathVariable Long bookingId) {
        bookingService.checkInBooking(bookingId);
        return ResponseEntity.ok(new ApiResponse(true, "Đã check-in thành công"));
    }
    
    @PutMapping("/{bookingId}/complete")
    public ResponseEntity<ApiResponse> completeBooking(@PathVariable Long bookingId) {
        bookingService.completeBooking(bookingId);
        return ResponseEntity.ok(new ApiResponse(true, "Đã hoàn thành buổi đặt lịch"));
    }
    
    @PutMapping("/{bookingId}/mark-no-show")
    public ResponseEntity<ApiResponse> markNoShow(@PathVariable Long bookingId) {
        bookingService.markNoShow(bookingId);
        return ResponseEntity.ok(new ApiResponse(true, "Đã đánh dấu không đến"));
    }
    
    @GetMapping("/statistics")
    public ResponseEntity<BookingStatsResponse> getBookingStatistics(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        return ResponseEntity.ok(bookingService.getBookingStatistics(startDate, endDate));
    }
    
    @GetMapping("/current")
    public ResponseEntity<Page<BookingResponse>> getCurrentBookings(
            Pageable pageable) {
        return ResponseEntity.ok(bookingService.getCurrentBookings(pageable));
    }
    
    @GetMapping("/upcoming")
    public ResponseEntity<Page<BookingResponse>> getUpcomingBookings(
            @RequestParam(required = false) Integer days,
            Pageable pageable) {
        return ResponseEntity.ok(bookingService.getUpcomingBookings(days, pageable));
    }
}