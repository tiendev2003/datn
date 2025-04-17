package com.gym.datn_be.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Primary;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.gym.datn_be.config.SecurityConfig;
import com.gym.datn_be.dto.auth.JwtAuthResponse;
import com.gym.datn_be.dto.auth.LoginRequest;
import com.gym.datn_be.dto.auth.RefreshTokenRequest;
import com.gym.datn_be.dto.auth.RegisterRequest;
import com.gym.datn_be.entity.User.Gender;
import com.gym.datn_be.exception.AuthenticationException;
import com.gym.datn_be.exception.ResourceAlreadyExistsException;
import com.gym.datn_be.exception.TokenRefreshException;
import com.gym.datn_be.security.CustomUserDetailsService;
import com.gym.datn_be.security.JwtAuthenticationFilter;
import com.gym.datn_be.security.JwtTokenProvider;
import com.gym.datn_be.service.AuthService;

@WebMvcTest(controllers = AuthController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, 
                                     classes = {SecurityConfig.class, JwtAuthenticationFilter.class})
        })
@AutoConfigureMockMvc(addFilters = false)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuthService authService;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    private ObjectMapper objectMapper;

    @TestConfiguration
    static class TestConfig {
        @Bean
        @Primary
        public AuthService authService() {
            return mock(AuthService.class);
        }
        
        @Bean
        @Primary
        public JwtTokenProvider jwtTokenProvider() {
            return mock(JwtTokenProvider.class);
        }
        
        @Bean
        @Primary
        public CustomUserDetailsService customUserDetailsService() {
            return mock(CustomUserDetailsService.class);
        }
    }

    @BeforeEach
    public void setup() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule()); // For LocalDate serialization
    }

    // Login endpoint tests
    @Test
    public void testLoginSuccess() throws Exception {
        // Prepare test data
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");

        List<String> roles = Arrays.asList("MEMBER");
        JwtAuthResponse response = JwtAuthResponse.builder()
                .accessToken("test-access-token")
                .refreshToken("test-refresh-token")
                .tokenType("Bearer")
                .expiresIn(3600L)
                .userId(1L)
                .email("test@example.com")
                .fullName("Test User")
                .roles(roles)
                .build();

        // Mock service behavior
        when(authService.login(any(LoginRequest.class))).thenReturn(response);

        // Perform the request and validate
        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.accessToken").value("test-access-token"))
                .andExpect(jsonPath("$.refreshToken").value("test-refresh-token"))
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.expiresIn").value(3600))
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.fullName").value("Test User"))
                .andExpect(jsonPath("$.roles[0]").value("MEMBER"));
    }

    @Test
    public void testLoginWithInvalidCredentials() throws Exception {
        // Prepare test data
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("wrongpassword");

        // Mock service behavior
        when(authService.login(any(LoginRequest.class)))
                .thenThrow(new AuthenticationException("Invalid email or password"));

        // Perform the request and validate
        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testLoginWithMissingEmail() throws Exception {
        // Prepare test data with validation error (missing email)
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setPassword("password123");

        // Perform the request and validate
        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testLoginWithMissingPassword() throws Exception {
        // Prepare test data with validation error (missing password)
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");

        // Perform the request and validate
        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isBadRequest());
    }

    // Register endpoint tests
    @Test
    public void testRegisterSuccess() throws Exception {
        // Prepare test data
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setPassword("password123");
        registerRequest.setEmail("newuser@example.com");
        registerRequest.setName("New User");
        registerRequest.setPhoneNumber("+1234567890");
        registerRequest.setDateOfBirth(LocalDate.of(1990, 1, 1));
        registerRequest.setGender(Gender.Male);
        registerRequest.setAddress("123 Test St");

        List<String> roles = Arrays.asList("MEMBER");
        JwtAuthResponse response = JwtAuthResponse.builder()
                .accessToken("test-access-token")
                .refreshToken("test-refresh-token")
                .tokenType("Bearer")
                .expiresIn(3600L)
                .userId(1L)
                .email("newuser@example.com")
                .fullName("New User")
                .roles(roles)
                .build();

        // Mock service behavior
        when(authService.register(any(RegisterRequest.class))).thenReturn(response);

        // Perform the request and validate
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.accessToken").value("test-access-token"))
                .andExpect(jsonPath("$.refreshToken").value("test-refresh-token"))
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.expiresIn").value(3600))
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.email").value("newuser@example.com"))
                .andExpect(jsonPath("$.fullName").value("New User"))
                .andExpect(jsonPath("$.roles[0]").value("MEMBER"));
    }

    @Test
    public void testRegisterWithExistingEmail() throws Exception {
        // Prepare test data
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setPassword("password123");
        registerRequest.setEmail("existing@example.com");
        registerRequest.setName("New User");
        registerRequest.setPhoneNumber("+1234567890");

        // Mock service behavior
        when(authService.register(any(RegisterRequest.class)))
                .thenThrow(new ResourceAlreadyExistsException("Email is already in use"));

        // Perform the request and validate
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isConflict());
    }

    @Test
    public void testRegisterWithMissingRequiredFields() throws Exception {
        // Prepare test data with validation errors (missing required fields)
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setPassword("password123");
        // Missing email and name

        // Perform the request and validate
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testRegisterWithInvalidEmail() throws Exception {
        // Prepare test data with validation error (invalid email)
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setPassword("password123");
        registerRequest.setEmail("invalidemail");  // Invalid email format
        registerRequest.setName("New User");

        // Perform the request and validate
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testRegisterWithShortPassword() throws Exception {
        // Prepare test data with validation error (short password)
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setPassword("short");  // Too short
        registerRequest.setEmail("newuser@example.com");
        registerRequest.setName("New User");

        // Perform the request and validate
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isBadRequest());
    }

    // Refresh token endpoint tests
    @Test
    public void testRefreshTokenSuccess() throws Exception {
        // Prepare test data
        RefreshTokenRequest refreshTokenRequest = new RefreshTokenRequest();
        refreshTokenRequest.setRefreshToken("valid-refresh-token");

        List<String> roles = Arrays.asList("MEMBER");
        JwtAuthResponse response = JwtAuthResponse.builder()
                .accessToken("new-access-token")
                .refreshToken("new-refresh-token")
                .tokenType("Bearer")
                .expiresIn(3600L)
                .userId(1L)
                .email("test@example.com")
                .fullName("Test User")
                .roles(roles)
                .build();

        // Mock service behavior
        when(authService.refreshToken(any(RefreshTokenRequest.class))).thenReturn(response);

        // Perform the request and validate
        mockMvc.perform(post("/auth/refresh-token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(refreshTokenRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.accessToken").value("new-access-token"))
                .andExpect(jsonPath("$.refreshToken").value("new-refresh-token"))
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.expiresIn").value(3600))
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.fullName").value("Test User"))
                .andExpect(jsonPath("$.roles[0]").value("MEMBER"));
    }

    @Test
    public void testRefreshTokenWithInvalidToken() throws Exception {
        // Prepare test data
        RefreshTokenRequest refreshTokenRequest = new RefreshTokenRequest();
        refreshTokenRequest.setRefreshToken("invalid-refresh-token");

        // Mock service behavior
        when(authService.refreshToken(any(RefreshTokenRequest.class)))
                .thenThrow(new TokenRefreshException("Invalid refresh token"));

        // Perform the request and validate
        mockMvc.perform(post("/auth/refresh-token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(refreshTokenRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testRefreshTokenWithMissingToken() throws Exception {
        // Prepare test data with validation error (missing refresh token)
        RefreshTokenRequest refreshTokenRequest = new RefreshTokenRequest();

        // Perform the request and validate
        mockMvc.perform(post("/auth/refresh-token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(refreshTokenRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testRefreshTokenWithExpiredToken() throws Exception {
        // Prepare test data
        RefreshTokenRequest refreshTokenRequest = new RefreshTokenRequest();
        refreshTokenRequest.setRefreshToken("expired-refresh-token");

        // Mock service behavior
        when(authService.refreshToken(any(RefreshTokenRequest.class)))
                .thenThrow(new TokenRefreshException("Refresh token was expired"));

        // Perform the request and validate
        mockMvc.perform(post("/auth/refresh-token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(refreshTokenRequest))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isUnauthorized());
    }
}