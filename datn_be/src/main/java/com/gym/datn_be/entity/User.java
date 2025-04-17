package com.gym.datn_be.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"roles", "userProfile"})
@ToString(exclude = {"roles", "userProfile"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "email", unique = true, nullable = false, length = 100)
    private String email;

    @Column(name = "phone_number", unique = true, length = 20)
    private String phoneNumber;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "address")
    private String address;

    @Column(name = "profile_picture")
    private String profilePicture;
    
    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "registration_date", nullable = false)
    private LocalDateTime registrationDate = LocalDateTime.now();

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
    
    @Column(name = "is_email_verified", nullable = false)
    private boolean isEmailVerified = false;

    @Column(name = "activation_token")
    private String activationToken;

    @Column(name = "reset_token")
    private String resetToken;

    @Column(name = "preferred_language", length = 10)
    private String preferredLanguage = "vi";

    @Column(name = "two_factor_enabled")
    private boolean twoFactorEnabled = false;

    @Column(name = "two_factor_secret")
    private String twoFactorSecret;
    
    @Column(name = "is_deleted")
    private boolean isDeleted = false;
    
    @Column(name = "deletion_date")
    private LocalDateTime deletionDate;
    
    @Column(name = "failed_login_attempts")
    private Integer failedLoginAttempts = 0;
    
    @Column(name = "account_locked_until")
    private LocalDateTime accountLockedUntil;
    
    @Column(name = "last_login_ip")
    private String lastLoginIp;
    
    @Column(name = "last_login_device")
    private String lastLoginDevice;
    
    @Column(name = "last_login_location")
    private String lastLoginLocation;
    
    @Column(name = "password_changed_at")
    private LocalDateTime passwordChangedAt;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserProfile userProfile;

    // Enum for gender
    public enum Gender {
        Male, Female, Other
    }
    
    // Phương thức để tăng số lần đăng nhập thất bại
    public void incrementFailedLoginAttempts() {
        this.failedLoginAttempts = (this.failedLoginAttempts == null) ? 1 : this.failedLoginAttempts + 1;
    }
    
    // Phương thức để đặt lại số lần đăng nhập thất bại
    public void resetFailedLoginAttempts() {
        this.failedLoginAttempts = 0;
    }
    
    // Phương thức để kiểm tra tài khoản có bị khóa hay không
    public boolean isAccountLocked() {
        return this.accountLockedUntil != null && this.accountLockedUntil.isAfter(LocalDateTime.now());
    }
    
    // Phương thức để tự động mở khóa tài khoản nếu thời gian khóa đã qua
    public void checkAndUnlockAccount() {
        if (this.accountLockedUntil != null && this.accountLockedUntil.isBefore(LocalDateTime.now())) {
            this.accountLockedUntil = null;
            this.failedLoginAttempts = 0;
        }
    }
}