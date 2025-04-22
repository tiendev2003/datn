package com.gym.datn_be.dto.request;

import java.time.LocalTime;
import java.util.Map;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GymConfigRequest {
    
    @NotBlank(message = "Tên phòng tập không được để trống")
    private String gymName;
    
    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;
    
    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "^[0-9]{10}$", message = "Số điện thoại phải có 10 chữ số")
    private String phoneNumber;
    
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;
    
    private String description;
    
    // Opening hours for each day of the week
    private LocalTime mondayOpen;
    private LocalTime mondayClose;
    
    private LocalTime tuesdayOpen;
    private LocalTime tuesdayClose;
    
    private LocalTime wednesdayOpen;
    private LocalTime wednesdayClose;
    
    private LocalTime thursdayOpen;
    private LocalTime thursdayClose;
    
    private LocalTime fridayOpen;
    private LocalTime fridayClose;
    
    private LocalTime saturdayOpen;
    private LocalTime saturdayClose;
    
    private LocalTime sundayOpen;
    private LocalTime sundayClose;
    
    // Services, facilities and social media links
    private Map<String, String> services;
    private Map<String, String> facilities;
    private Map<String, String> socialMediaLinks;
    
    private String logoUrl;
    private String bannerUrl;
}