package com.gym.datn_be.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.dto.auth.ChangePasswordRequest;
import com.gym.datn_be.dto.auth.JwtAuthResponse;
import com.gym.datn_be.dto.auth.LoginRequest;
import com.gym.datn_be.dto.auth.LogoutRequest;
import com.gym.datn_be.dto.auth.RefreshTokenRequest;
import com.gym.datn_be.dto.auth.RegisterRequest;
import com.gym.datn_be.dto.auth.ResetPasswordRequest;
import com.gym.datn_be.dto.auth.TwoFactorLoginRequest;
import com.gym.datn_be.dto.auth.TwoFactorSetupResponse;
import com.gym.datn_be.dto.auth.TwoFactorVerifyRequest;
import com.gym.datn_be.dto.auth.AccountDeletionRequest;
import com.gym.datn_be.entity.EmailVerification;
import com.gym.datn_be.entity.LoginAttempt;
import com.gym.datn_be.entity.PasswordResetToken;
import com.gym.datn_be.entity.RefreshTokenBlacklist;
import com.gym.datn_be.entity.Role;
import com.gym.datn_be.entity.SecurityNotification;
import com.gym.datn_be.entity.User;
import com.gym.datn_be.entity.UserProfile;
import com.gym.datn_be.exception.AuthenticationException;
import com.gym.datn_be.exception.BadRequestException;
import com.gym.datn_be.exception.ResourceAlreadyExistsException;
import com.gym.datn_be.exception.ResourceNotFoundException;
import com.gym.datn_be.exception.TokenRefreshException;
import com.gym.datn_be.repository.EmailVerificationRepository;
import com.gym.datn_be.repository.LoginAttemptRepository;
import com.gym.datn_be.repository.PasswordResetTokenRepository;
import com.gym.datn_be.repository.RefreshTokenBlacklistRepository;
import com.gym.datn_be.repository.RoleRepository;
import com.gym.datn_be.repository.SecurityNotificationRepository;
import com.gym.datn_be.repository.UserRepository;
import com.gym.datn_be.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final EmailService emailService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailVerificationRepository emailVerificationRepository;
    private final RefreshTokenBlacklistRepository refreshTokenBlacklistRepository;
    private final LoginAttemptRepository loginAttemptRepository;
    private final SecurityNotificationRepository securityNotificationRepository;
    private final TwoFactorAuthService twoFactorAuthService;
    private final AccountDeletionService accountDeletionService;

    @Value("${app.jwt.expiration}")
    private long jwtExpirationMs;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final int ACCOUNT_LOCK_TIME_MINUTES = 15;

    @Transactional
    public JwtAuthResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate tokens
            String accessToken = tokenProvider.generateToken(authentication);
            String refreshToken = tokenProvider.generateRefreshToken(authentication);

            // Get user details
            org.springframework.security.core.userdetails.User userDetails = 
                    (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
            
            User user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new AuthenticationException("User not found with username: " + userDetails.getUsername()));

            // Update last login time
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);

            // Extract roles
            List<String> roles = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .filter(authority -> authority.startsWith("ROLE_"))
                    .map(role -> role.substring(5)) // Remove "ROLE_" prefix
                    .collect(Collectors.toList());

            // Build and return the authentication response
            return JwtAuthResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .tokenType("Bearer")
                    .expiresIn(jwtExpirationMs / 1000) // Convert to seconds
                    .userId(user.getUserId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .fullName(user.getName())
                    .roles(roles)
                    .build();
        } catch (Exception e) {
            log.error("Authentication error: {}", e.getMessage());
            throw new AuthenticationException("Invalid username or password");
        }
    }

    @Transactional
    public JwtAuthResponse register(RegisterRequest registerRequest) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new ResourceAlreadyExistsException("Username is already taken");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new ResourceAlreadyExistsException("Email is already in use");
        }

        // Get the default role (MEMBER)
        Role memberRole = roleRepository.findByRoleName("MEMBER")
                .orElseThrow(() -> new RuntimeException("Default role not found."));

        // Create user entity
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setName(registerRequest.getName());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setDateOfBirth(registerRequest.getDateOfBirth());
        user.setGender(registerRequest.getGender());
        user.setAddress(registerRequest.getAddress());
        user.setRegistrationDate(LocalDateTime.now());
        user.setActive(true);
        
        // Initialize roles set
        HashSet<Role> roles = new HashSet<>();
        roles.add(memberRole);
        user.setRoles(roles);

        // Create user profile
        UserProfile userProfile = new UserProfile();
        userProfile.setUser(user);
        userProfile.setName(registerRequest.getName());
        userProfile.setUpdatedAt(LocalDateTime.now());
        user.setUserProfile(userProfile);

        // Save user first to ensure it has an ID
        User savedUser = userRepository.save(user);

        // Authenticate the newly registered user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        registerRequest.getUsername(),
                        registerRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate tokens
        String accessToken = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);

        // Build and return the authentication response
        return JwtAuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtExpirationMs / 1000) // Convert to seconds
                .userId(savedUser.getUserId())
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .fullName(savedUser.getName())
                .roles(Collections.singletonList("MEMBER"))
                .build();
    }

    public JwtAuthResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String refreshToken = refreshTokenRequest.getRefreshToken();

        if (!tokenProvider.validateToken(refreshToken)) {
            throw new TokenRefreshException("Invalid refresh token");
        }

        String username = tokenProvider.getUsernameFromToken(refreshToken);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new TokenRefreshException("User not found for the token"));

        // Create a new authentication with the user's details
        Authentication authentication = tokenProvider.getAuthentication(refreshToken);
        
        // Generate new tokens
        String newAccessToken = tokenProvider.generateToken(authentication);
        String newRefreshToken = tokenProvider.generateRefreshToken(authentication);

        // Extract roles
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(authority -> authority.startsWith("ROLE_"))
                .map(role -> role.substring(5)) // Remove "ROLE_" prefix
                .collect(Collectors.toList());

        // Build and return the authentication response
        return JwtAuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtExpirationMs / 1000) // Convert to seconds
                .userId(user.getUserId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getName())
                .roles(roles)
                .build();
    }
     
    @Transactional
    public void logout(LogoutRequest logoutRequest) {
        String refreshToken = logoutRequest.getRefreshToken();
        
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new TokenRefreshException("Invalid refresh token");
        }
        
        // Add the token to blacklist
        RefreshTokenBlacklist blacklistToken = new RefreshTokenBlacklist();
        blacklistToken.setToken(refreshToken);
        blacklistToken.setExpiryDate(tokenProvider.getExpirationDateFromToken(refreshToken));
        blacklistToken.setBlacklistedAt(LocalDateTime.now());
        
        refreshTokenBlacklistRepository.save(blacklistToken);
        
        // Clear security context
        SecurityContextHolder.clearContext();
    }
    
    @Transactional
    public void sendPasswordResetEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        
        // Generate a unique token
        String token = UUID.randomUUID().toString();
        
        // Save the token with expiry time (24 hours)
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setUser(user);
        resetToken.setToken(token);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(24));
        
        passwordResetTokenRepository.save(resetToken);
        
        // Send email with reset link
        String resetLink = frontendUrl + "/reset-password?token=" + token;
        emailService.sendPasswordResetEmail(user.getEmail(), user.getName(), resetLink);
    }
    
    @Transactional
    public void resetPassword(ResetPasswordRequest resetPasswordRequest) {
        String token = resetPasswordRequest.getToken();
        String password = resetPasswordRequest.getPassword();
        String confirmPassword = resetPasswordRequest.getConfirmPassword();
        
        // Validate password match
        if (!password.equals(confirmPassword)) {
            throw new BadRequestException("Mật khẩu không khớp");
        }
        
        // Find valid token
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token không hợp lệ hoặc đã hết hạn"));
        
        // Check if token is expired
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            passwordResetTokenRepository.delete(resetToken);
            throw new BadRequestException("Token đã hết hạn");
        }
        
        // Update user password
        User user = resetToken.getUser();
        user.setPasswordHash(passwordEncoder.encode(password));
        userRepository.save(user);
        
        // Invalidate token
        passwordResetTokenRepository.delete(resetToken);
    }
    
    @Transactional
    public void changePassword(ChangePasswordRequest request) {
        // Get current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AuthenticationException("Người dùng chưa xác thực");
        }
        
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        
        // Validate current password
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Mật khẩu hiện tại không đúng");
        }
        
        // Validate new password and confirmation match
        if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            throw new BadRequestException("Mật khẩu mới không khớp");
        }
        
        // Update password
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
    
    @Transactional
    public void sendVerificationEmail(User user) {
        // Delete any existing verification tokens for the user
        emailVerificationRepository.deleteByUser(user);
        
        // Generate a unique token
        String token = UUID.randomUUID().toString();
        
        // Save the token with expiry time (24 hours)
        EmailVerification verification = new EmailVerification();
        verification.setUser(user);
        verification.setToken(token);
        verification.setExpiryDate(LocalDateTime.now().plusHours(24));
        
        emailVerificationRepository.save(verification);
        
        // Send email with verification link
        String verificationLink = frontendUrl + "/verify-email?token=" + token;
        emailService.sendVerificationEmail(user.getEmail(), user.getName(), verificationLink);
    }
    
    @Transactional
    public void verifyEmail(String token) {
        // Find valid token
        EmailVerification verification = emailVerificationRepository.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token xác minh email không hợp lệ hoặc đã hết hạn"));
        
        // Check if token is expired
        if (verification.getExpiryDate().isBefore(LocalDateTime.now())) {
            emailVerificationRepository.delete(verification);
            throw new BadRequestException("Token xác minh email đã hết hạn");
        }
        
        // Update user verified status
        User user = verification.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);
        
        // Invalidate token
        emailVerificationRepository.delete(verification);
    }
    
    @Transactional
    public void resendVerificationEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        
        if (user.isEmailVerified()) {
            throw new BadRequestException("Email đã được xác minh");
        }
        
        sendVerificationEmail(user);
    }
    
    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }
    
    public boolean isEmailAvailable(String email) {
        return !userRepository.existsByEmail(email);
    }
    
    private boolean isTokenBlacklisted(String token) {
        return refreshTokenBlacklistRepository.existsByToken(token);
    }
    @Transactional
    public JwtAuthResponse verifyTwoFactorAuthentication(TwoFactorLoginRequest request) {
        try {
            // Xác thực token tạm thời
            if (!tokenProvider.validateTemporaryToken(request.getTemporaryToken())) {
                throw new AuthenticationException("Token không hợp lệ hoặc đã hết hạn");
            }

            // Lấy thông tin người dùng từ token tạm thời
            String username = tokenProvider.getUsernameFromToken(request.getTemporaryToken());
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new AuthenticationException("Người dùng không tồn tại"));

            // Kiểm tra nếu người dùng đã bật 2FA
            if (!user.isTwoFactorEnabled()) {
                throw new BadRequestException("Xác thực hai yếu tố không được bật cho tài khoản này");
            }

            // Xác thực mã OTP
            if (!twoFactorAuthService.verifyOtpCode(user.getTwoFactorSecret(), request.getOtpCode())) {
                throw new BadRequestException("Mã OTP không đúng");
            }

            // Tạo authentication object
            Authentication authentication = tokenProvider.getAuthenticationFromTemporaryToken(request.getTemporaryToken());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Cập nhật thông tin đăng nhập
            user.setLastLogin(LocalDateTime.now());
            updateLoginInfo(user, request.getIpAddress(), request.getDevice(), request.getLocation());
            userRepository.save(user);

            // Tạo token thật sau khi xác thực 2FA thành công
            String accessToken = tokenProvider.generateToken(authentication);
            String refreshToken = tokenProvider.generateRefreshToken(authentication);

            // Extract roles
            List<String> roles = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .filter(authority -> authority.startsWith("ROLE_"))
                    .map(role -> role.substring(5))
                    .collect(Collectors.toList());

            // Trả về phản hồi đăng nhập đầy đủ
            return JwtAuthResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .tokenType("Bearer")
                    .expiresIn(jwtExpirationMs / 1000)
                    .userId(user.getUserId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .fullName(user.getName())
                    .roles(roles)
                    .build();
        } catch (Exception e) {
            log.error("2FA verification error: {}", e.getMessage());
            throw new AuthenticationException(e.getMessage());
        }
    }

    @Transactional
    public TwoFactorSetupResponse setupTwoFactorAuth() {
        // Lấy thông tin người dùng hiện tại
        User user = getCurrentUser();

        // Gọi service để thiết lập 2FA
        return twoFactorAuthService.setupTwoFactorAuth(user);
    }

    @Transactional
    public boolean enableTwoFactorAuth(TwoFactorVerifyRequest request) {
        User user = getCurrentUser();

        boolean result = twoFactorAuthService.verifyAndEnableTwoFactor(user, request.getOtpCode());

        if (result) {
            // Gửi email thông báo
            emailService.sendSecurityNotificationEmail(
                    user.getEmail(),
                    user.getName(),
                    "Xác thực hai yếu tố đã được bật",
                    "Xác thực hai yếu tố đã được bật cho tài khoản của bạn."
            );
        }

        return result;
    }

    @Transactional
    public boolean disableTwoFactorAuth(TwoFactorVerifyRequest request) {
        User user = getCurrentUser();

        boolean result = twoFactorAuthService.disableTwoFactor(user, request.getOtpCode());

        if (result) {
            // Gửi email thông báo
            emailService.sendSecurityNotificationEmail(
                    user.getEmail(),
                    user.getName(),
                    "Xác thực hai yếu tố đã được tắt",
                    "Xác thực hai yếu tố đã được tắt cho tài khoản của bạn."
            );
        }

        return result;
    }

    @Transactional
    public void deleteAccount(AccountDeletionRequest request) {
        User user = getCurrentUser();
        accountDeletionService.deleteAccount(user, request);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AuthenticationException("Người dùng chưa xác thực");
        }

        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin người dùng"));
    }

    private void updateLoginInfo(User user, String ipAddress, String deviceInfo, String location) {
        user.setLastLoginIp(ipAddress);
        user.setLastLoginDevice(deviceInfo);
        user.setLastLoginLocation(location);

        // Ghi nhận lịch sử đăng nhập
        saveLoginAttempt(user, ipAddress, deviceInfo, location, LoginAttempt.Status.SUCCESS);

        // Kiểm tra nếu đây là thiết bị mới hoặc địa điểm mới
        boolean isNewDevice = (user.getLastLoginDevice() == null || !user.getLastLoginDevice().equals(deviceInfo));
        boolean isNewLocation = (user.getLastLoginLocation() == null || !user.getLastLoginLocation().equals(location));

        if (isNewDevice || isNewLocation) {
            // Tạo thông báo bảo mật
            createSecurityNotification(user,
                    SecurityNotification.NotificationType.NEW_LOGIN,
                    "Phát hiện đăng nhập mới vào tài khoản của bạn",
                    "Đăng nhập mới từ " + deviceInfo + " tại " + location);

            // Gửi email thông báo
            emailService.sendNewLoginNotification(
                    user.getEmail(),
                    user.getName(),
                    ipAddress,
                    location,
                    deviceInfo);
        }
    }

    private void saveLoginAttempt(User user, String ipAddress, String deviceInfo, String location, LoginAttempt.Status status) {
        LoginAttempt attempt = new LoginAttempt();
        attempt.setUser(user);
        attempt.setAttemptTime(LocalDateTime.now());
        attempt.setIpAddress(ipAddress);
        attempt.setDeviceInfo(deviceInfo);
        attempt.setLocation(location);
        attempt.setStatus(status);

        loginAttemptRepository.save(attempt);
    }

    private void createSecurityNotification(User user, SecurityNotification.NotificationType type,
                                            String message, String details) {
        SecurityNotification notification = new SecurityNotification();
        notification.setUser(user);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setNotificationType(type);
        notification.setMessage(message);
        notification.setDetails(details);

        securityNotificationRepository.save(notification);
    }
}