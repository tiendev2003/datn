package com.gym.datn_be.service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Arrays;

import org.apache.commons.codec.binary.Base32;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.dto.auth.TwoFactorSetupResponse;
import com.gym.datn_be.entity.SecurityNotification;
import com.gym.datn_be.entity.User;
import com.gym.datn_be.exception.BadRequestException;
import com.gym.datn_be.repository.SecurityNotificationRepository;
import com.gym.datn_be.repository.UserRepository;

import dev.samstevens.totp.code.CodeGenerator;
import dev.samstevens.totp.code.CodeVerifier;
import dev.samstevens.totp.code.DefaultCodeGenerator;
import dev.samstevens.totp.code.DefaultCodeVerifier;
import dev.samstevens.totp.code.HashingAlgorithm;
import dev.samstevens.totp.exceptions.QrGenerationException;
import dev.samstevens.totp.qr.QrData;
import dev.samstevens.totp.qr.QrGenerator;
import dev.samstevens.totp.qr.ZxingPngQrGenerator;
import dev.samstevens.totp.secret.DefaultSecretGenerator;
import dev.samstevens.totp.secret.SecretGenerator;
import dev.samstevens.totp.time.SystemTimeProvider;
import dev.samstevens.totp.time.TimeProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TwoFactorAuthService {

    private final UserRepository userRepository;
    private final SecurityNotificationRepository securityNotificationRepository;
    private final EmailService emailService;
    
    private static final int SECRET_SIZE = 20;
    private static final String ISSUER = "GymManagement";
    private static final int VERIFICATION_CODE_LENGTH = 6;
    private static final int VERIFICATION_CODE_PERIOD = 30;
    
    /**
     * Tạo và thiết lập xác thực hai yếu tố cho người dùng
     */
    @Transactional
    public TwoFactorSetupResponse setupTwoFactorAuth(User user) {
        // Tạo secret key cho người dùng
        String secretKey = generateSecretKey();
        
        // Lưu secret key vào tài khoản người dùng
        user.setTwoFactorSecret(secretKey);
        user.setTwoFactorEnabled(false); // Chưa bật cho đến khi người dùng xác nhận
        userRepository.save(user);
        
        // Tạo QR code
        String qrCodeUrl;
        String otpAuthUrl = generateOtpAuthUrl(user.getEmail(), secretKey);
        try {
            qrCodeUrl = generateQrCodeImageUrl(otpAuthUrl);
        } catch (QrGenerationException e) {
            log.error("Không thể tạo QR code", e);
            throw new BadRequestException("Không thể tạo QR code");
        }
        
        // Tạo manual entry key (hiển thị cho người dùng nhập tay)
        String manualEntryKey = formatSecretKey(secretKey);
        
        // Trả về thông tin thiết lập
        return TwoFactorSetupResponse.builder()
                .secretKey(secretKey)
                .qrCodeUrl(qrCodeUrl)
                .manualEntryKey(manualEntryKey)
                .twoFactorEnabled(false)
                .build();
    }
    
    /**
     * Xác minh mã OTP và bật xác thực hai yếu tố cho người dùng
     */
    @Transactional
    public boolean verifyAndEnableTwoFactor(User user, String otpCode) {
        String secretKey = user.getTwoFactorSecret();
        
        if (secretKey == null || secretKey.isEmpty()) {
            throw new BadRequestException("Xác thực hai yếu tố chưa được thiết lập");
        }
        
        // Xác minh mã OTP
        if (verifyOtpCode(secretKey, otpCode)) {
            // Bật xác thực hai yếu tố cho tài khoản
            user.setTwoFactorEnabled(true);
            userRepository.save(user);
            
            // Tạo thông báo bảo mật
            createSecurityNotification(user, SecurityNotification.NotificationType.TWO_FACTOR_ENABLED,
                    "Xác thực hai yếu tố đã được bật cho tài khoản của bạn",
                    "Xác thực hai yếu tố đã được kích hoạt vào " + java.time.LocalDateTime.now());
            
            // Gửi email thông báo
            emailService.sendSecurityNotificationEmail(user.getEmail(), user.getName(), 
                    "Xác thực hai yếu tố đã được bật", 
                    "Xác thực hai yếu tố đã được bật cho tài khoản của bạn. " +
                    "Nếu đây không phải là bạn, vui lòng liên hệ hỗ trợ ngay lập tức.");
            
            return true;
        }
        
        return false;
    }
    
    /**
     * Tắt xác thực hai yếu tố cho người dùng
     */
    @Transactional
    public boolean disableTwoFactor(User user, String otpCode) {
        String secretKey = user.getTwoFactorSecret();
        
        if (!user.isTwoFactorEnabled()) {
            throw new BadRequestException("Xác thực hai yếu tố chưa được bật");
        }
        
        // Xác minh mã OTP trước khi tắt
        if (verifyOtpCode(secretKey, otpCode)) {
            // Tắt xác thực hai yếu tố
            user.setTwoFactorEnabled(false);
            userRepository.save(user);
            
            // Tạo thông báo bảo mật
            createSecurityNotification(user, SecurityNotification.NotificationType.TWO_FACTOR_DISABLED,
                    "Xác thực hai yếu tố đã được tắt cho tài khoản của bạn",
                    "Xác thực hai yếu tố đã được tắt vào " + java.time.LocalDateTime.now());
            
            // Gửi email thông báo
            emailService.sendSecurityNotificationEmail(user.getEmail(), user.getName(), 
                    "Xác thực hai yếu tố đã được tắt", 
                    "Xác thực hai yếu tố đã được tắt cho tài khoản của bạn. " +
                    "Nếu đây không phải là bạn, vui lòng liên hệ hỗ trợ ngay lập tức.");
            
            return true;
        }
        
        return false;
    }
    
    /**
     * Xác minh mã OTP cho đăng nhập
     */
    public boolean verifyOtpCode(String secretKey, String otpCode) {
        if (secretKey == null || secretKey.isEmpty() || otpCode == null || otpCode.isEmpty()) {
            return false;
        }
        
        TimeProvider timeProvider = new SystemTimeProvider();
        CodeGenerator codeGenerator = new DefaultCodeGenerator(HashingAlgorithm.SHA1, VERIFICATION_CODE_LENGTH);
        CodeVerifier verifier = new DefaultCodeVerifier(codeGenerator, timeProvider);
        
        return verifier.isValidCode(secretKey, otpCode);
    }
    
    /**
     * Tạo thông báo bảo mật 
     */
    private void createSecurityNotification(User user, SecurityNotification.NotificationType type, 
                                          String message, String details) {
        SecurityNotification notification = new SecurityNotification();
        notification.setUser(user);
        notification.setCreatedAt(java.time.LocalDateTime.now());
        notification.setNotificationType(type);
        notification.setMessage(message);
        notification.setDetails(details);
        
        securityNotificationRepository.save(notification);
    }
    
    /**
     * Tạo secret key mới 
     */
    private String generateSecretKey() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[SECRET_SIZE];
        random.nextBytes(bytes);
        
        Base32 base32 = new Base32();
        return base32.encodeToString(bytes);
    }
    
    /**
     * Tạo OTP Auth URL cho QR code 
     */
    private String generateOtpAuthUrl(String username, String secretKey) {
        String encodedIssuer = URLEncoder.encode(ISSUER, StandardCharsets.UTF_8);
        String encodedUsername = URLEncoder.encode(username, StandardCharsets.UTF_8);
        
        return String.format("otpauth://totp/%s:%s?secret=%s&issuer=%s&algorithm=SHA1&digits=%d&period=%d",
                encodedIssuer, encodedUsername, secretKey, encodedIssuer, 
                VERIFICATION_CODE_LENGTH, VERIFICATION_CODE_PERIOD);
    }
    
    /**
     * Tạo QR code dạng base64 image 
     */
    private String generateQrCodeImageUrl(String otpAuthUrl) throws QrGenerationException {
        QrData data = new QrData.Builder()
                .label("GymManagement")
                .secret(otpAuthUrl)
                .issuer(ISSUER)
                .algorithm(HashingAlgorithm.SHA1)
                .digits(VERIFICATION_CODE_LENGTH)
                .period(VERIFICATION_CODE_PERIOD)
                .build();
        
        QrGenerator qrGenerator = new ZxingPngQrGenerator();
        byte[] imageData = qrGenerator.generate(data);
        
        return "data:image/png;base64," + java.util.Base64.getEncoder().encodeToString(imageData);
    }
    
    /**
     * Format secret key thành nhóm 4 ký tự để dễ nhập tay
     */
    private String formatSecretKey(String secretKey) {
        StringBuilder formattedKey = new StringBuilder();
        char[] chars = secretKey.toCharArray();
        
        for (int i = 0; i < chars.length; i++) {
            if (i > 0 && i % 4 == 0) {
                formattedKey.append(" ");
            }
            formattedKey.append(chars[i]);
        }
        
        return formattedKey.toString();
    }
}