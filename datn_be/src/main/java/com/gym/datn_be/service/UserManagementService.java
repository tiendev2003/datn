package com.gym.datn_be.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.dto.request.UserCreateRequest;
import com.gym.datn_be.dto.request.UserRoleUpdateRequest;
import com.gym.datn_be.dto.request.UserUpdateRequest;
import com.gym.datn_be.dto.response.UserDetailResponse;
import com.gym.datn_be.dto.response.UserSummaryResponse;
import com.gym.datn_be.entity.Role;
import com.gym.datn_be.entity.User;
import com.gym.datn_be.entity.UserProfile;
import com.gym.datn_be.entity.UserRole;
import com.gym.datn_be.exception.ResourceNotFoundException;
import com.gym.datn_be.repository.RoleRepository;
import com.gym.datn_be.repository.UserProfileRepository;
import com.gym.datn_be.repository.UserRepository;
import com.gym.datn_be.repository.UserRoleRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserManagementService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Lấy danh sách người dùng có phân trang và tìm kiếm
     */
    public Page<UserSummaryResponse> getAllUsers(String keyword, List<String> roles, Boolean isActive,
            Pageable pageable) {
        Page<User> users;

        if (keyword != null && !keyword.isEmpty() && roles != null && !roles.isEmpty() && isActive != null) {
            users = userRepository.findByKeywordAndRolesAndActiveStatus(keyword, roles, isActive, pageable);
        } else if (keyword != null && !keyword.isEmpty() && roles != null && !roles.isEmpty()) {
            users = userRepository.findByKeywordAndRoles(keyword, roles, pageable);
        } else if (keyword != null && !keyword.isEmpty() && isActive != null) {
            users = userRepository.findByKeywordAndActiveStatus(keyword, isActive, pageable);
        } else if (roles != null && !roles.isEmpty() && isActive != null) {
            users = userRepository.findByRolesAndActiveStatus(roles, isActive, pageable);
        } else if (keyword != null && !keyword.isEmpty()) {
            users = userRepository.findByKeyword(keyword, pageable);
        } else if (roles != null && !roles.isEmpty()) {
            users = userRepository.findByRoles(roles, pageable);
        } else if (isActive != null) {
            users = userRepository.findByIsActive(isActive, pageable);
        } else {
            users = userRepository.findAll(pageable);
        }

        return users.map(this::convertToSummaryResponse);
    }

    /**
     * Lấy thông tin chi tiết người dùng
     */
    public UserDetailResponse getUserDetails(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));

        return convertToDetailResponse(user);
    }

    /**
     * Tạo người dùng mới
     */
    @Transactional
    public UserDetailResponse createUser(UserCreateRequest request) {
        // Kiểm tra email đã tồn tại chưa
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email đã tồn tại trong hệ thống");
        }

        // Kiểm tra số điện thoại đã tồn tại chưa (nếu có)
        if (request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()
                && userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new IllegalArgumentException("Số điện thoại đã tồn tại trong hệ thống");
        }

        // Tạo đối tượng User
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setName(request.getName());
        user.setDateOfBirth(request.getDateOfBirth());
        
        // Đảm bảo gender được đặt đúng kiểu dữ liệu
        if (request.getGender() != null) {
            user.setGender(User.Gender.valueOf(request.getGender().toString()));
        }
        
        user.setAddress(request.getAddress());
        user.setProfilePicture(request.getProfilePicture());
        user.setActive(true);  // Sửa setIsActive thành setActive
        user.setPreferredLanguage(request.getPreferredLanguage() != null ? request.getPreferredLanguage() : "vi");

        // Lưu thông tin người dùng
        User savedUser = userRepository.save(user);

        // Tạo hồ sơ người dùng
        UserProfile profile = new UserProfile();
        profile.setUser(savedUser);

        // Cập nhật thông tin hồ sơ nếu có
        if (request.getHeight() != null)
            profile.setHeight(request.getHeight());
        if (request.getWeight() != null)
            profile.setWeight(request.getWeight());
        if (request.getEmergencyContactName() != null)
            profile.setEmergencyContactName(request.getEmergencyContactName());
        if (request.getEmergencyContactPhone() != null)
            profile.setEmergencyContactPhone(request.getEmergencyContactPhone());
        if (request.getHealthConditions() != null)
            profile.setHealthConditions(request.getHealthConditions());
        if (request.getFitnessGoals() != null)
            profile.setFitnessGoals(request.getFitnessGoals());
        if (request.getNotes() != null)
            profile.setNotes(request.getNotes());

        userProfileRepository.save(profile);

        // Thêm vai trò cho người dùng
        if (request.getRoles() != null && !request.getRoles().isEmpty()) {
            for (String roleName : request.getRoles()) {
                Role role = roleRepository.findByRoleName(roleName)
                        .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy vai trò: " + roleName));

                UserRole userRole = new UserRole();
                userRole.setUser(savedUser);
                userRole.setRole(role);

                userRoleRepository.save(userRole);
            }
        } else {
            // Mặc định thêm quyền MEMBER nếu không có quyền nào được chỉ định
            Role defaultRole = roleRepository.findByRoleName("MEMBER")
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy vai trò mặc định MEMBER"));

            UserRole userRole = new UserRole();
            userRole.setUser(savedUser);
            userRole.setRole(defaultRole);

            userRoleRepository.save(userRole);
        }

        return getUserDetails(savedUser.getUserId());
    }

    /**
     * Cập nhật thông tin người dùng
     */
    @Transactional
    public UserDetailResponse updateUser(Long userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));

        // Kiểm tra nếu cập nhật email và email đã tồn tại
        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email đã tồn tại trong hệ thống");
        }

        // Kiểm tra nếu cập nhật số điện thoại và số điện thoại đã tồn tại
        if (request.getPhoneNumber() != null && !request.getPhoneNumber().equals(user.getPhoneNumber())
                && userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new IllegalArgumentException("Số điện thoại đã tồn tại trong hệ thống");
        }

        // Cập nhật thông tin người dùng
        if (request.getEmail() != null)
            user.setEmail(request.getEmail());
        if (request.getPhoneNumber() != null)
            user.setPhoneNumber(request.getPhoneNumber());
        if (request.getName() != null)
            user.setName(request.getName());
        if (request.getDateOfBirth() != null)
            user.setDateOfBirth(request.getDateOfBirth());
        if (request.getGender() != null)
            user.setGender(User.Gender.valueOf(request.getGender().toString()));
        if (request.getAddress() != null)
            user.setAddress(request.getAddress());
        if (request.getProfilePicture() != null)
            user.setProfilePicture(request.getProfilePicture());
        if (request.getPreferredLanguage() != null)
            user.setPreferredLanguage(request.getPreferredLanguage());
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        }

        userRepository.save(user);

        // Cập nhật hồ sơ người dùng nếu có
        Optional<UserProfile> profileOpt = userProfileRepository.findByUserId(userId);
        UserProfile profile;

        if (profileOpt.isPresent()) {
            profile = profileOpt.get();
        } else {
            profile = new UserProfile();
            profile.setUser(user);
        }

        if (request.getHeight() != null)
            profile.setHeight(request.getHeight());
        if (request.getWeight() != null)
            profile.setWeight(request.getWeight());
        if (request.getEmergencyContactName() != null)
            profile.setEmergencyContactName(request.getEmergencyContactName());
        if (request.getEmergencyContactPhone() != null)
            profile.setEmergencyContactPhone(request.getEmergencyContactPhone());
        if (request.getHealthConditions() != null)
            profile.setHealthConditions(request.getHealthConditions());
        if (request.getFitnessGoals() != null)
            profile.setFitnessGoals(request.getFitnessGoals());
        if (request.getNotes() != null)
            profile.setNotes(request.getNotes());

        userProfileRepository.save(profile);

        return getUserDetails(userId);
    }

    /**
     * Xóa người dùng
     */
    @Transactional
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId);
        }

        // Xóa các liên kết trước (các bảng liên quan đến người dùng)
        userRoleRepository.deleteByUserId(userId);
        userProfileRepository.deleteByUserId(userId);

        // Xóa người dùng
        userRepository.deleteById(userId);
    }

    /**
     * Kích hoạt người dùng
     */
    public void activateUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));

        user.setActive(true);  // Sửa setIsActive thành setActive
        userRepository.save(user);
    }

    /**
     * Vô hiệu hóa người dùng
     */
    public void deactivateUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));

        user.setActive(false);  // Sửa setIsActive thành setActive
        userRepository.save(user);
    }

    /**
     * Lấy danh sách tất cả các vai trò
     */
    public List<String> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toList());
    }

    /**
     * Cập nhật vai trò của người dùng
     */
    @Transactional
    public void updateUserRoles(Long userId, UserRoleUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));

        // Xóa tất cả vai trò hiện tại
        userRoleRepository.deleteByUserId(userId);

        // Thêm các vai trò mới
        List<UserRole> newRoles = new ArrayList<>();
        for (String roleName : request.getRoles()) {
            Role role = roleRepository.findByRoleName(roleName)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy vai trò: " + roleName));

            UserRole userRole = new UserRole();
            userRole.setUser(user);
            userRole.setRole(role);

            newRoles.add(userRole);
        }

        userRoleRepository.saveAll(newRoles);
    }

    /**
     * Chuyển đối tượng User sang UserSummaryResponse
     */
    private UserSummaryResponse convertToSummaryResponse(User user) {
        UserSummaryResponse response = new UserSummaryResponse();
        response.setUserId(user.getUserId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setProfilePicture(user.getProfilePicture());
        response.setIsActive(user.isActive());  // Sử dụng isActive() thay vì getIsActive()
        response.setRegistrationDate(user.getRegistrationDate());
        response.setLastLogin(user.getLastLogin());

        // Lấy danh sách vai trò
        List<String> roles = userRoleRepository.findByUserId(user.getUserId()).stream()
                .map(userRole -> userRole.getRole().getRoleName())
                .collect(Collectors.toList());

        response.setRoles(roles);

        return response;
    }

    /**
     * Chuyển đối tượng User sang UserDetailResponse
     */
    private UserDetailResponse convertToDetailResponse(User user) {
        UserDetailResponse response = new UserDetailResponse();
        response.setUserId(user.getUserId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setDateOfBirth(user.getDateOfBirth());
        response.setGender( user.getGender() != null ? user.getGender().toString() : null);
        response.setAddress(user.getAddress());
        response.setProfilePicture(user.getProfilePicture());
        response.setIsActive(user.isActive());  // Sử dụng isActive() thay vì getIsActive()
        response.setRegistrationDate(user.getRegistrationDate());
        response.setLastLogin(user.getLastLogin());
        response.setPreferredLanguage(user.getPreferredLanguage());
        response.setTwoFactorEnabled(user.isTwoFactorEnabled());  // Sử dụng isTwoFactorEnabled()

        // Lấy thông tin hồ sơ người dùng
        userProfileRepository.findByUserId(user.getUserId()).ifPresent(profile -> {
            response.setHeight(profile.getHeight());
            response.setWeight(profile.getWeight());
            response.setEmergencyContactName(profile.getEmergencyContactName());
            response.setEmergencyContactPhone(profile.getEmergencyContactPhone());
            response.setHealthConditions(profile.getHealthConditions());
            response.setFitnessGoals(profile.getFitnessGoals());
            response.setNotes(profile.getNotes());
        });

        // Lấy danh sách vai trò
        List<String> roles = userRoleRepository.findByUserId(user.getUserId()).stream()
                .map(userRole -> userRole.getRole().getRoleName())
                .collect(Collectors.toList());

        response.setRoles(roles);

        return response;
    }
}