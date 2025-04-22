package com.gym.datn_be.controller;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.gym.datn_be.service.TokenCleanupService;

@WebMvcTest(TokenManagementController.class)
@EnableMethodSecurity
public class TokenManagementControllerTest {

    @Configuration
    @EnableWebSecurity
    static class SecurityTestConfig {
        @Bean
        SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/api/token-management/**").hasRole("ADMIN")
                    .anyRequest().authenticated()
                );
            return http.build();
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TokenCleanupService tokenCleanupService;

    private Map<String, Integer> expiredTokenCounts;
    private Map<String, Integer> cleanupResults;

    @BeforeEach
    public void setup() {
        // Dữ liệu mẫu cho số lượng token hết hạn
        expiredTokenCounts = new HashMap<>();
        expiredTokenCounts.put("accessTokens", 5);
        expiredTokenCounts.put("refreshTokens", 10);
        expiredTokenCounts.put("verificationTokens", 3);
        expiredTokenCounts.put("passwordResetTokens", 2);

        // Dữ liệu mẫu cho kết quả xóa token
        cleanupResults = new HashMap<>();
        cleanupResults.put("accessTokens", 5);
        cleanupResults.put("refreshTokens", 10);
        cleanupResults.put("verificationTokens", 3);
        cleanupResults.put("passwordResetTokens", 2);
    }

    @Test
    @DisplayName("Lấy số lượng token hết hạn - Trả về 200 OK và danh sách token")
    @WithMockUser(roles = "ADMIN")
    public void getExpiredTokenCountsTest() throws Exception {
        // Giả lập service trả về số lượng token hết hạn
        when(tokenCleanupService.getExpiredTokenCounts()).thenReturn(expiredTokenCounts);

        // Thực hiện request và kiểm tra kết quả
        mockMvc.perform(get("/api/token-management/expired-counts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessTokens").value(5))
                .andExpect(jsonPath("$.refreshTokens").value(10))
                .andExpect(jsonPath("$.verificationTokens").value(3))
                .andExpect(jsonPath("$.passwordResetTokens").value(2));
    }

    @Test
    @DisplayName("Xóa thủ công token hết hạn - Trả về 200 OK và số lượng token đã xóa")
    @WithMockUser(roles = "ADMIN")
    public void cleanupExpiredTokensTest() throws Exception {
        // Giả lập service trả về kết quả xóa token
        when(tokenCleanupService.cleanupAllExpiredTokensManually()).thenReturn(cleanupResults);

        // Thực hiện request và kiểm tra kết quả
        mockMvc.perform(post("/api/token-management/cleanup")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessTokens").value(5))
                .andExpect(jsonPath("$.refreshTokens").value(10))
                .andExpect(jsonPath("$.verificationTokens").value(3))
                .andExpect(jsonPath("$.passwordResetTokens").value(2));
    }

    @Test
    @DisplayName("Lấy số lượng token hết hạn - Không có quyền - Trả về 403 Forbidden")
    @WithMockUser(roles = "MEMBER")
    public void getExpiredTokenCountsWithoutAdminRoleTest() throws Exception {
        mockMvc.perform(get("/api/token-management/expired-counts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Xóa thủ công token hết hạn - Không có quyền - Trả về 403 Forbidden")
    @WithMockUser(roles = "MEMBER")
    public void cleanupExpiredTokensWithoutAdminRoleTest() throws Exception {
        mockMvc.perform(post("/api/token-management/cleanup")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Lấy số lượng token hết hạn - Chưa xác thực - Trả về 401 Unauthorized")
    public void getExpiredTokenCountsUnauthenticatedTest() throws Exception {
        mockMvc.perform(get("/api/token-management/expired-counts")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Xóa thủ công token hết hạn - Chưa xác thực - Trả về 401 Unauthorized")
    public void cleanupExpiredTokensUnauthenticatedTest() throws Exception {
        mockMvc.perform(post("/api/token-management/cleanup")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}