package com.gym.datn_be.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleUpdateRequest {
    @NotEmpty(message = "Danh sách vai trò không được để trống")
    private List<String> roles;
}