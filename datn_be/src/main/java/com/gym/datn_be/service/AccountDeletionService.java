package com.gym.datn_be.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.dto.auth.AccountDeletionRequest;
import com.gym.datn_be.entity.SecurityNotification;
import com.gym.datn_be.entity.User;
import com.gym.datn_be.exception.AuthenticationException;
import com.gym.datn_be.exception.BadRequestException;
import com.gym.datn_be.repository.RefreshTokenBlacklistRepository;
import com.gym.datn_be.repository.SecurityNotificationRepository;
import com.gym.datn_be.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccountDeletionService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final RefreshTokenBlacklistRepository refreshTokenBlacklistRepository;
    private final SecurityNotificationRepository securityNotificationRepository;

    /**
     * Xóa vĩnh viễn tài khoản người dùng
     */
    @Transactional
    public void deleteAccount(User user, AccountDeletionRequest request) {
        // Xác thực bằng mật khẩu trước khi xóa
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new AuthenticationException("Mật khẩu không đúng");
        }

         String email = user.getEmail();
        String name = user.getName();

        // Ghi nhận lý do xóa tài khoản nếu có
        if (request.getReason() != null && !request.getReason().isEmpty()) {
            log.info("Lý do xóa tài khoản: {}", request.getReason());
        }

        // Xuất dữ liệu người dùng nếu được yêu cầu
        if (request.isExportData()) {
            // TODO: Implement data export logic if needed
         }

        try {
            // Blacklist tất cả các token của người dùng
            blacklistUserTokens(user);

            // Ẩn danh hóa dữ liệu thay vì xóa hoàn toàn
            anonymizeUserData(user);

            // Gửi email xác nhận xóa tài khoản
            emailService.sendAccountDeletionConfirmation(email, name);

         } catch (Exception e) {
            log.error("Lỗi khi xóa tài khoản: {}", e.getMessage());
            throw new BadRequestException("Không thể xóa tài khoản, vui lòng thử lại sau");
        }
    }

    /**
     * Đánh dấu các token của người dùng là không hợp lệ
     */
    private void blacklistUserTokens(User user) {
        // TODO: Add logic to blacklist all tokens for the user
     }

    /**
     * Ẩn danh hóa thông tin người dùng cho mục đích bảo mật
     */
    private void anonymizeUserData(User user) {
        // Lưu thời gian xóa tài khoản
        LocalDateTime deletionTime = LocalDateTime.now();

        // Tạo dữ liệu ngẫu nhiên để ẩn danh
        String anonymousId = "deleted_" + System.currentTimeMillis() + "_" + user.getUserId();

        // Ẩn danh hóa thông tin
        user.setEmail(anonymousId + "@deleted.user");
        user.setPasswordHash("DELETED_ACCOUNT");
        user.setName("Deleted User");
        user.setPhoneNumber(null);
        user.setAddress(null);
        user.setDateOfBirth(null);
        user.setProfileImage(null);
        user.setTwoFactorSecret(null);
        user.setTwoFactorEnabled(false);
        user.setActive(false);
        user.setDeleted(true);
        user.setDeletionDate(deletionTime);

        // Lưu tài khoản đã ẩn danh hóa
        userRepository.save(user);

        // Xóa các thông báo bảo mật
        securityNotificationRepository.deleteByUser(user);
    }
}