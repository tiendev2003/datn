package com.gym.datn_be.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    @Email(message = "Email không hợp lệ")
    private String email;
    
    @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 ký tự")
    private String password;
    
    private String name;
    
    @Pattern(regexp = "(\\+84|0)[0-9]{9,10}", message = "Số điện thoại không hợp lệ")
    private String phoneNumber;
    
    @Past(message = "Ngày sinh phải là ngày trong quá khứ")
    private LocalDate dateOfBirth;
    
    @Pattern(regexp = "Male|Female|Other", message = "Giới tính phải là 'Male', 'Female', hoặc 'Other'")
    private String gender;
    
    private String address;
    private String profilePicture;
    private String preferredLanguage;
    
    // Thông tin hồ sơ - tùy chọn
    private BigDecimal height;
    private BigDecimal weight;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String healthConditions;
    private String fitnessGoals;
    private String notes;
}