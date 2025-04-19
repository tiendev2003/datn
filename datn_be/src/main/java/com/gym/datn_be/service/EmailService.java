package com.gym.datn_be.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Value("${app.name}")
    private String appName;
    
    @Async
    public void sendPasswordResetEmail(String to, String name, String resetLink) {
        try {
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("resetLink", resetLink);
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/password-reset", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Đặt lại mật khẩu cho tài khoản " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Password reset email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send password reset email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendVerificationEmail(String to, String name, String verificationLink) {
        try {
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("verificationLink", verificationLink);
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/email-verification", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Xác minh email cho tài khoản " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Verification email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send verification email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendSecurityNotificationEmail(String to, String name, String subject, String notificationText) {
        try {
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("notificationText", notificationText);
            context.setVariable("appName", appName);
            context.setVariable("currentTime", java.time.LocalDateTime.now().toString());
            
            String emailContent = templateEngine.process("email/security-notification", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject + " - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Security notification email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send security notification email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendNewLoginNotification(String to, String name, String ipAddress, String location, String deviceInfo) {
        try {
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("ipAddress", ipAddress);
            context.setVariable("location", location);
            context.setVariable("deviceInfo", deviceInfo);
            context.setVariable("loginTime", java.time.LocalDateTime.now().toString());
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/new-login", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Đăng nhập mới vào tài khoản " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("New login notification email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send login notification email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendAccountDeletionConfirmation(String to, String name) {
        try {
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("deletionTime", java.time.LocalDateTime.now().toString());
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/account-deletion", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Xác nhận xóa tài khoản " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Account deletion confirmation email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send account deletion email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendPTPackageCancelledEmail(String to, String userName, String packageName, 
                                            String trainerName, Integer remainingSessions, String reason) {
        try {
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("packageName", packageName);
            context.setVariable("trainerName", trainerName);
            context.setVariable("remainingSessions", remainingSessions);
            context.setVariable("reason", reason != null ? reason : "Không có lý do cụ thể");
            context.setVariable("cancellationTime", java.time.LocalDateTime.now().toString());
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/pt-package-cancelled", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Thông báo hủy gói PT - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("PT package cancellation email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send PT package cancellation email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendPTPackageUpdatedEmail(String to, String userName, String packageName,
                                         Integer addedAmount, String addedType, Integer remainingSessions,
                                         LocalDate oldEndDate, LocalDate newEndDate, String reason) {
        try {
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("packageName", packageName);
            context.setVariable("addedAmount", addedAmount);
            context.setVariable("addedType", addedType);
            context.setVariable("remainingSessions", remainingSessions);
            
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            
            if (oldEndDate != null && newEndDate != null) {
                context.setVariable("oldEndDate", oldEndDate.format(formatter));
                context.setVariable("newEndDate", newEndDate.format(formatter));
            }
            
            context.setVariable("reason", reason != null ? reason : "Không có lý do cụ thể");
            context.setVariable("updateTime", java.time.LocalDateTime.now().toString());
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/pt-package-updated", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Thông báo cập nhật gói PT - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("PT package update email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send PT package update email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendPackageExpirationReminderEmail(String to, String userName, String packageName, 
                                                 LocalDate expiryDate, Integer sessionsRemaining, 
                                                 Integer daysThreshold) {
        try {
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("packageName", packageName);
            context.setVariable("expiryDate", expiryDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            context.setVariable("sessionsRemaining", sessionsRemaining);
            context.setVariable("daysLeft", daysThreshold);
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/pt-package-expiry-reminder", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Thông báo sắp hết hạn gói PT - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("PT package expiration reminder email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send PT package expiration reminder email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendPTSessionCancelledEmail(String to, String userName, String trainerName, 
                                          LocalDateTime sessionStartTime, LocalDateTime sessionEndTime,
                                          String packageName, String reason) {
        try {
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("trainerName", trainerName);
            
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
            
            context.setVariable("sessionDate", sessionStartTime.format(dateFormatter));
            context.setVariable("startTime", sessionStartTime.format(timeFormatter));
            context.setVariable("endTime", sessionEndTime.format(timeFormatter));
            context.setVariable("packageName", packageName);
            context.setVariable("reason", reason != null ? reason : "Không có lý do cụ thể");
            context.setVariable("cancellationTime", java.time.LocalDateTime.now().toString());
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/pt-session-cancelled", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Thông báo hủy buổi tập PT - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("PT session cancellation email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send PT session cancellation email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendPTPackageCompletedEmail(String to, String userName, String packageName, 
                                          String trainerName) {
        try {
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("packageName", packageName);
            context.setVariable("trainerName", trainerName);
            context.setVariable("completionTime", java.time.LocalDateTime.now().toString());
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/pt-package-completed", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Thông báo hoàn thành gói PT - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("PT package completion email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send PT package completion email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendPTSessionRescheduledEmail(String to, String userName, String trainerName,
                                            LocalDateTime oldStartTime, LocalDateTime oldEndTime,
                                            LocalDateTime newStartTime, LocalDateTime newEndTime,
                                            String reason) {
        try {
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("trainerName", trainerName);
            
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
            
            // Thông tin lịch cũ
            context.setVariable("oldDate", oldStartTime.format(dateFormatter));
            context.setVariable("oldStartTime", oldStartTime.format(timeFormatter));
            context.setVariable("oldEndTime", oldEndTime.format(timeFormatter));
            
            // Thông tin lịch mới
            context.setVariable("newDate", newStartTime.format(dateFormatter));
            context.setVariable("newStartTime", newStartTime.format(timeFormatter));
            context.setVariable("newEndTime", newEndTime.format(timeFormatter));
            
            context.setVariable("reason", reason != null ? reason : "Không có lý do cụ thể");
            context.setVariable("rescheduleTime", java.time.LocalDateTime.now().toString());
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/pt-session-rescheduled", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Thông báo đổi lịch buổi tập PT - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("PT session reschedule email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send PT session reschedule email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendGenericEmail(String to, String name, String subject, String content) {
        try {
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("content", content);
            context.setVariable("appName", appName);
            context.setVariable("currentTime", java.time.LocalDateTime.now().toString());
            
            String emailContent = templateEngine.process("email/security-notification", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject + " - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Generic email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send generic email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendMembershipAssignedEmail(String to, String userName, String membershipTypeName, 
                                           LocalDate startDate, LocalDate endDate) {
        try {
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("membershipTypeName", membershipTypeName);
            
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            context.setVariable("startDate", startDate.format(dateFormatter));
            context.setVariable("endDate", endDate.format(dateFormatter));
            context.setVariable("assignedAt", LocalDateTime.now().toString());
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/security-notification", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Thông báo đăng ký gói tập thành công - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Membership assigned email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send membership assigned email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendMembershipFreezeEmail(String to, String userName, String membershipTypeName,
                                         LocalDate startDate, LocalDate endDate, String reason) {
        try {
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("membershipTypeName", membershipTypeName);
            
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            context.setVariable("freezeStartDate", startDate.format(dateFormatter));
            context.setVariable("freezeEndDate", endDate.format(dateFormatter));
            context.setVariable("reason", reason != null ? reason : "Không có lý do cụ thể");
            context.setVariable("freezeTime", LocalDateTime.now().toString());
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/security-notification", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Thông báo tạm dừng gói tập - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Membership freeze email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send membership freeze email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendMembershipUnfreezeEmail(String to, String userName, String membershipTypeName) {
        try {
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("membershipTypeName", membershipTypeName);
            context.setVariable("unfreezeTime", LocalDateTime.now().toString());
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/security-notification", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Thông báo kích hoạt lại gói tập - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Membership unfreeze email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send membership unfreeze email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendMembershipCancellationEmail(String to, String userName, String membershipTypeName, String reason) {
        try {
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("membershipTypeName", membershipTypeName);
            context.setVariable("reason", reason != null ? reason : "Không có lý do cụ thể");
            context.setVariable("cancellationTime", LocalDateTime.now().toString());
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/security-notification", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Thông báo hủy gói tập - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Membership cancellation email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send membership cancellation email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendMembershipRenewalEmail(String to, String userName, String membershipTypeName, 
                                          LocalDate previousEndDate, LocalDate newEndDate, Integer months) {
        try {
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("membershipTypeName", membershipTypeName);
            
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            context.setVariable("previousEndDate", previousEndDate.format(dateFormatter));
            context.setVariable("newEndDate", newEndDate.format(dateFormatter));
            context.setVariable("months", months);
            context.setVariable("renewalTime", LocalDateTime.now().toString());
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/security-notification", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Thông báo gia hạn gói tập - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Membership renewal email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send membership renewal email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendMembershipExtensionEmail(String to, String userName, String membershipTypeName,
                                           LocalDate previousEndDate, LocalDate newEndDate, String reason) {
        try {
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("membershipTypeName", membershipTypeName);
            
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            context.setVariable("previousEndDate", previousEndDate.format(dateFormatter));
            context.setVariable("newEndDate", newEndDate.format(dateFormatter));
            context.setVariable("reason", reason != null ? reason : "Không có lý do cụ thể");
            context.setVariable("extensionTime", LocalDateTime.now().toString());
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/security-notification", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Thông báo mở rộng thời hạn gói tập - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Membership extension email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send membership extension email to {}: {}", to, e.getMessage());
        }
    }
    
    @Async
    public void sendMembershipExpiryReminderEmail(String to, String userName, String membershipTypeName,
                                                LocalDate expiryDate, Integer daysRemaining) {
        try {
            Context context = new Context();
            context.setVariable("name", userName);
            context.setVariable("membershipTypeName", membershipTypeName);
            
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            context.setVariable("expiryDate", expiryDate.format(dateFormatter));
            context.setVariable("daysRemaining", daysRemaining);
            context.setVariable("appName", appName);
            
            String emailContent = templateEngine.process("email/security-notification", context);
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Thông báo gói tập sắp hết hạn - " + appName);
            helper.setText(emailContent, true);
            
            mailSender.send(message);
            log.info("Membership expiry reminder email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send membership expiry reminder email to {}: {}", to, e.getMessage());
        }
    }
}