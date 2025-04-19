package com.gym.datn_be.dto.request;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrainerUpdateRequest {
    
    private String firstName;
    
    private String lastName;
    
    @Email(message = "Email không hợp lệ")
    private String email;
    
    @Pattern(regexp = "^[0-9]{10}$", message = "Số điện thoại phải có 10 chữ số")
    private String phone;
    
    private LocalDate dateOfBirth;
    
    private String gender;
    
    private String bio;
    
    private String specialization;
    
    private List<String> certifications;
    
    private Integer experienceYears;
    
    private String profileImage;
    
    private Double hourlyRate;
    
    private List<AvailabilityRequest> availabilities;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AvailabilityRequest {
        private String dayOfWeek;
        private String startTime;
        private String endTime;
    }
}