package com.gym.datn_be.service;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gym.datn_be.dto.request.SessionRescheduleRequest;
import com.gym.datn_be.dto.response.PTSessionResponse;

public interface PTSessionService {
    
    // Quản lý các buổi tập PT
    Page<PTSessionResponse> getPTSessions(LocalDate date, Long trainerId, Long userId, String status, Pageable pageable);
    PTSessionResponse getPTSessionDetail(Long sessionId);
    void cancelPTSession(Long sessionId, String reason);
    void completePTSession(Long sessionId, String notes);
    void reschedulePTSession(Long sessionId, SessionRescheduleRequest request);
}