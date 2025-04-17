package com.gym.datn_be.config;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gym.datn_be.entity.Permission;
import com.gym.datn_be.entity.Role;
import com.gym.datn_be.repository.PermissionRepository;
import com.gym.datn_be.repository.RoleRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    @PostConstruct
    @Transactional
    public void init() {
        // initRolesAndPermissions();
    }

    private void initRolesAndPermissions() {
        log.info("Initializing roles and permissions...");

        // Create default permissions if they don't exist
        List<String> defaultPermissions = Arrays.asList(
                "USER_READ", "USER_CREATE", "USER_UPDATE", "USER_DELETE",
                "MEMBER_READ", "MEMBER_CREATE", "MEMBER_UPDATE", "MEMBER_DELETE",
                "TRAINER_READ", "TRAINER_CREATE", "TRAINER_UPDATE", "TRAINER_DELETE",
                "CLASS_READ", "CLASS_CREATE", "CLASS_UPDATE", "CLASS_DELETE",
                "BOOKING_READ", "BOOKING_CREATE", "BOOKING_UPDATE", "BOOKING_DELETE"
        );

        Set<Permission> adminPermissions = new HashSet<>();
        Set<Permission> managerPermissions = new HashSet<>();
        Set<Permission> trainerPermissions = new HashSet<>();
        Set<Permission> memberPermissions = new HashSet<>();

        for (String permName : defaultPermissions) {
            Permission permission = permissionRepository.findByPermissionName(permName)
                    .orElseGet(() -> {
                        Permission newPerm = new Permission();
                        newPerm.setPermissionName(permName);
                        newPerm.setDescription("Permission to " + permName.replace("_", " ").toLowerCase());
                        return permissionRepository.save(newPerm);
                    });

            // Add to respective permission sets
            adminPermissions.add(permission);
            
            if (permName.startsWith("USER_READ") || 
                permName.startsWith("MEMBER") || 
                permName.startsWith("TRAINER") || 
                permName.startsWith("CLASS") || 
                permName.startsWith("BOOKING")) {
                managerPermissions.add(permission);
            }
            
            if (permName.startsWith("MEMBER_READ") || 
                permName.startsWith("CLASS_READ") || 
                permName.startsWith("BOOKING") ||
                permName.equals("TRAINER_READ")) {
                trainerPermissions.add(permission);
            }
            
            if (permName.equals("MEMBER_READ") || 
                permName.equals("CLASS_READ") || 
                permName.equals("BOOKING_READ") || 
                permName.equals("BOOKING_CREATE")) {
                memberPermissions.add(permission);
            }
        }

        // Create default roles if they don't exist
        createRoleIfNotExists("ADMIN", "Administrator with full access", adminPermissions);
        createRoleIfNotExists("MANAGER", "Gym manager with management access", managerPermissions);
        createRoleIfNotExists("TRAINER", "Fitness trainer with training access", trainerPermissions);
        createRoleIfNotExists("MEMBER", "Regular gym member", memberPermissions);

        log.info("Roles and permissions initialization completed");
    }

    private void createRoleIfNotExists(String roleName, String description, Set<Permission> permissions) {
        if (!roleRepository.existsByRoleName(roleName)) {
            Role role = new Role();
            role.setRoleName(roleName);
            role.setDescription(description);
            role.setPermissions(permissions);
            roleRepository.save(role);
            log.info("Created role: {}", roleName);
        }
    }
}