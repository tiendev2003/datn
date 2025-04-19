package com.gym.datn_be.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    // This system uses email for authentication instead of username
    
    boolean existsByEmail(String email);
    
    // This system uses email for authentication instead of username
    
    boolean existsByPhoneNumber(String phoneNumber);
    
    Optional<User> findByActivationToken(String token);
    
    Optional<User> findByResetToken(String token);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.active = true")
    long countActiveUsers();
    
    @Query("SELECT COUNT(u) FROM User u JOIN u.roles r WHERE r.name = 'ROLE_TRAINER'")
    long countTrainers();
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.createdAt >= :startDate")
    long countUsersCreatedAfter(LocalDateTime startDate);
    
    @Query("SELECT COUNT(u) FROM User u JOIN u.roles r WHERE r.name = 'ROLE_MEMBER' AND u.active = true")
    long countActiveMembers();
    
    // Tìm kiếm theo từ khóa (email, tên, số điện thoại)
    @Query("SELECT u FROM User u WHERE u.isDeleted = false AND (LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.phoneNumber) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<User> findByKeyword(@Param("keyword") String keyword, Pageable pageable);
    
    // Tìm kiếm theo vai trò
    @Query("SELECT DISTINCT u FROM User u JOIN u.roles r WHERE u.isDeleted = false AND r.roleName IN :roles")
    Page<User> findByRoles(@Param("roles") List<String> roles, Pageable pageable);
    
    // Tìm kiếm theo trạng thái hoạt động
    Page<User> findByIsActive(Boolean isActive, Pageable pageable);
    
    // Tìm kiếm theo từ khóa và vai trò
    @Query("SELECT DISTINCT u FROM User u JOIN u.roles r WHERE u.isDeleted = false AND " +
           "(LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.phoneNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND r.roleName IN :roles")
    Page<User> findByKeywordAndRoles(@Param("keyword") String keyword, @Param("roles") List<String> roles, Pageable pageable);
    
    // Tìm kiếm theo từ khóa và trạng thái hoạt động
    @Query("SELECT u FROM User u WHERE u.isDeleted = false AND " +
           "(LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.phoneNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND u.isActive = :isActive")
    Page<User> findByKeywordAndActiveStatus(@Param("keyword") String keyword, @Param("isActive") Boolean isActive, Pageable pageable);
    
    // Tìm kiếm theo vai trò và trạng thái hoạt động
    @Query("SELECT DISTINCT u FROM User u JOIN u.roles r WHERE u.isDeleted = false AND " +
           "r.roleName IN :roles AND u.isActive = :isActive")
    Page<User> findByRolesAndActiveStatus(@Param("roles") List<String> roles, @Param("isActive") Boolean isActive, Pageable pageable);
    
    // Tìm kiếm theo từ khóa, vai trò và trạng thái hoạt động
    @Query("SELECT DISTINCT u FROM User u JOIN u.roles r WHERE u.isDeleted = false AND " +
           "(LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(u.phoneNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND r.roleName IN :roles AND u.isActive = :isActive")
    Page<User> findByKeywordAndRolesAndActiveStatus(@Param("keyword") String keyword, @Param("roles") List<String> roles, 
                                                   @Param("isActive") Boolean isActive, Pageable pageable);
}