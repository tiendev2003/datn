package com.gym.datn_be.service;

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
}