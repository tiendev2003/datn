package com.gym.datn_be.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassTypeUpdateRequest {
    
    @NotBlank(message = "Tên loại lớp không được để trống")
    @Size(max = 100, message = "Tên loại lớp không được vượt quá 100 ký tự")
    private String typeName;
    
    @Size(max = 1000, message = "Mô tả không được vượt quá 1000 ký tự")
    private String description;
    
    @NotNull(message = "Thời lượng lớp học không được để trống")
    @Positive(message = "Thời lượng lớp học phải là số dương")
    private Integer durationMinutes;
    
    @NotNull(message = "Số học viên tối đa không được để trống")
    @Positive(message = "Số học viên tối đa phải là số dương")
    private Integer maxCapacity;
    
    @NotNull(message = "Cường độ lớp học không được để trống")
    @Size(max = 50, message = "Cường độ lớp học không được vượt quá 50 ký tự")
    private String intensity;
    
    private String imageUrl;
    
    private Boolean isActive;
}