package com.gym.datn_be.dto.request;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrainerCreateRequest {
    
    @NotBlank(message = "Họ không được để trống")
    private String firstName;
    
    @NotBlank(message = "Tên không được để trống")
    private String lastName;
    
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;
    
    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "^[0-9]{10}$", message = "Số điện thoại phải có 10 chữ số")
    private String phone;
    
    @NotNull(message = "Ngày sinh không được để trống")
    private LocalDate dateOfBirth;
    
    @NotBlank(message = "Giới tính không được để trống")
    private String gender;
    
    private String bio;
    
    @NotBlank(message = "Chuyên môn không được để trống")
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