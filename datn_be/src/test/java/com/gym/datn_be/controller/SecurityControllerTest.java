package com.gym.datn_be.controller;

import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Primary;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gym.datn_be.config.SecurityConfig;
import com.gym.datn_be.dto.auth.AccountDeletionRequest;
import com.gym.datn_be.dto.auth.JwtAuthResponse;
import com.gym.datn_be.dto.auth.TwoFactorLoginRequest;
import com.gym.datn_be.dto.auth.TwoFactorSetupResponse;
import com.gym.datn_be.dto.auth.TwoFactorVerifyRequest;
import com.gym.datn_be.security.CustomUserDetailsService;
import com.gym.datn_be.security.JwtAuthenticationFilter;
import com.gym.datn_be.security.JwtTokenProvider;
import com.gym.datn_be.service.AuthService;

@WebMvcTest(controllers = SecurityController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, 
                                     classes = {SecurityConfig.class})
        })
@AutoConfigureMockMvc(addFilters = false)
public class SecurityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @TestConfiguration
    static class TestConfig {
        @Bean
        @Primary
        public AuthService authService() {
            return org.mockito.Mockito.mock(AuthService.class);
        }
        
        @Bean
        @Primary
        public JwtTokenProvider jwtTokenProvider() {
            return org.mockito.Mockito.mock(JwtTokenProvider.class);
        }
        
        @Bean
        @Primary
        public CustomUserDetailsService customUserDetailsService() {
            return org.mockito.Mockito.mock(CustomUserDetailsService.class);
        }
        
        @Bean
        @Primary
        public JwtAuthenticationFilter jwtAuthenticationFilter() {
            return new JwtAuthenticationFilter(jwtTokenProvider());
        }
    }

    @Autowired
    private AuthService authService;

    private TwoFactorLoginRequest twoFactorLoginRequest;
    private TwoFactorSetupResponse twoFactorSetupResponse;
    private TwoFactorVerifyRequest twoFactorVerifyRequest;
    private AccountDeletionRequest accountDeletionRequest;
    private JwtAuthResponse jwtAuthResponse;

    @BeforeEach
    public void setup() {
        // Khởi tạo đối tượng TwoFactorLoginRequest
        twoFactorLoginRequest = new TwoFactorLoginRequest();
        twoFactorLoginRequest.setEmail("user@example.com");
        twoFactorLoginRequest.setOtpCode("123456");
        twoFactorLoginRequest.setTemporaryToken("temp-token-123");
        twoFactorLoginRequest.setIpAddress("192.168.1.1");
        twoFactorLoginRequest.setDevice("Chrome on Windows (Máy tính)");
        twoFactorLoginRequest.setLocation("Không xác định");

        // Khởi tạo đối tượng TwoFactorSetupResponse
        twoFactorSetupResponse = new TwoFactorSetupResponse();
        twoFactorSetupResponse.setSecretKey("ABCDEFGHIJKLMNOP");
        twoFactorSetupResponse.setQrCodeUrl("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==");
        twoFactorSetupResponse.setManualEntryKey("ABCD-EFGH-IJKL-MNOP");
        twoFactorSetupResponse.setTwoFactorEnabled(false);

        // Khởi tạo đối tượng TwoFactorVerifyRequest
        twoFactorVerifyRequest = new TwoFactorVerifyRequest();
        twoFactorVerifyRequest.setOtpCode("123456");

        // Khởi tạo đối tượng AccountDeletionRequest
        accountDeletionRequest = new AccountDeletionRequest();
        accountDeletionRequest.setPassword("password123");
        accountDeletionRequest.setReason("Tôi không cần dùng nữa");
        accountDeletionRequest.setExportData(true);

        // Khởi tạo đối tượng JwtAuthResponse
        jwtAuthResponse = JwtAuthResponse.builder()
                .accessToken("access-token-123")
                .refreshToken("refresh-token-123")
                .tokenType("Bearer")
                .expiresIn(3600L)
                .userId(1L)
                .email("user@example.com")
                .fullName("User Demo")
                .roles(Arrays.asList("MEMBER"))
                .build();
    }

    @Test
    @DisplayName("Xác minh hai yếu tố - Trả về 200 OK với token truy cập")
    public void verifyTwoFactorAuthTest() throws Exception {
        when(authService.verifyTwoFactorAuthentication(any(TwoFactorLoginRequest.class)))
                .thenReturn(jwtAuthResponse);

        mockMvc.perform(post("/auth/security/verify-2fa")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(twoFactorLoginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("access-token-123"))
                .andExpect(jsonPath("$.refreshToken").value("refresh-token-123"))
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.expiresIn").value(3600))
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.email").value("user@example.com"))
                .andExpect(jsonPath("$.fullName").value("User Demo"))
                .andExpect(jsonPath("$.roles[0]").value("MEMBER"));
    }

    @Test
    @DisplayName("Thiết lập hai yếu tố - Trả về 200 OK với thông tin thiết lập")
    @WithMockUser
    public void setupTwoFactorAuthTest() throws Exception {
        when(authService.setupTwoFactorAuth()).thenReturn(twoFactorSetupResponse);

        mockMvc.perform(get("/auth/security/setup-2fa")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.secretKey").value("ABCDEFGHIJKLMNOP"))
                .andExpect(jsonPath("$.qrCodeUrl").exists())
                .andExpect(jsonPath("$.manualEntryKey").value("ABCD-EFGH-IJKL-MNOP"))
                .andExpect(jsonPath("$.twoFactorEnabled").value(false));
    }

    @Test
    @DisplayName("Bật hai yếu tố - Trả về 200 OK khi xác minh thành công")
    @WithMockUser
    public void enableTwoFactorAuthTest() throws Exception {
        when(authService.enableTwoFactorAuth(any(TwoFactorVerifyRequest.class))).thenReturn(true);

        mockMvc.perform(post("/auth/security/enable-2fa")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(twoFactorVerifyRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Xác thực hai yếu tố đã được bật thành công"));
    }

    @Test
    @DisplayName("Tắt hai yếu tố - Trả về 200 OK khi xác minh thành công")
    @WithMockUser
    public void disableTwoFactorAuthTest() throws Exception {
        when(authService.disableTwoFactorAuth(any(TwoFactorVerifyRequest.class))).thenReturn(true);

        mockMvc.perform(post("/auth/security/disable-2fa")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(twoFactorVerifyRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Xác thực hai yếu tố đã được tắt thành công"));
    }

    @Test
    @DisplayName("Xóa tài khoản - Trả về 200 OK khi xóa thành công")
    @WithMockUser
    public void deleteAccountTest() throws Exception {
        mockMvc.perform(delete("/auth/security/delete-account")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(accountDeletionRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Tài khoản đã được xóa thành công"));
    }

    @Test
    @DisplayName("Thiết lập hai yếu tố - Trả về 403 Forbidden khi chưa đăng nhập")
    public void setupTwoFactorAuthUnauthenticatedTest() throws Exception {
        // Mock the AuthService to throw AccessDeniedException for unauthenticated access
        when(authService.setupTwoFactorAuth())
            .thenThrow(new AccessDeniedException("Access Denied"));

        mockMvc.perform(get("/auth/security/setup-2fa")
                .contentType(MediaType.APPLICATION_JSON)
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Bật hai yếu tố - Trả về 403 Forbidden khi chưa đăng nhập")
    public void enableTwoFactorAuthUnauthenticatedTest() throws Exception {
        // Mock the AuthService to throw AccessDeniedException for unauthenticated access
        when(authService.enableTwoFactorAuth(any(TwoFactorVerifyRequest.class)))
            .thenThrow(new AccessDeniedException("Access Denied"));

        mockMvc.perform(post("/auth/security/enable-2fa")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(twoFactorVerifyRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Tắt hai yếu tố - Trả về 403 Forbidden khi chưa đăng nhập")
    public void disableTwoFactorAuthUnauthenticatedTest() throws Exception {
        // Mock the AuthService to throw AccessDeniedException for unauthenticated access
        when(authService.disableTwoFactorAuth(any(TwoFactorVerifyRequest.class)))
            .thenThrow(new AccessDeniedException("Access Denied"));

        mockMvc.perform(post("/auth/security/disable-2fa")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(twoFactorVerifyRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Xóa tài khoản - Trả về 403 Forbidden khi chưa đăng nhập")
    public void deleteAccountUnauthenticatedTest() throws Exception {
        // Mock the AuthService to throw AccessDeniedException for unauthenticated access
        org.mockito.Mockito.doThrow(new AccessDeniedException("Access Denied"))
            .when(authService).deleteAccount(any(AccountDeletionRequest.class));

        mockMvc.perform(delete("/auth/security/delete-account")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(accountDeletionRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Bật hai yếu tố - Trả về 200 OK nhưng báo lỗi khi xác minh thất bại")
    @WithMockUser
    public void enableTwoFactorAuthFailTest() throws Exception {
        when(authService.enableTwoFactorAuth(any(TwoFactorVerifyRequest.class))).thenReturn(false);

        mockMvc.perform(post("/auth/security/enable-2fa")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(twoFactorVerifyRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Không thể bật xác thực hai yếu tố"));
    }

    @Test
    @DisplayName("Tắt hai yếu tố - Trả về 200 OK nhưng báo lỗi khi xác minh thất bại")
    @WithMockUser
    public void disableTwoFactorAuthFailTest() throws Exception {
        when(authService.disableTwoFactorAuth(any(TwoFactorVerifyRequest.class))).thenReturn(false);

        mockMvc.perform(post("/auth/security/disable-2fa")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(twoFactorVerifyRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Không thể tắt xác thực hai yếu tố"));
    }
}