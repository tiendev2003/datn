package com.gym.datn_be.controller;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Primary;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.gym.datn_be.config.SecurityConfig;
import com.gym.datn_be.dto.response.DashboardStatsResponse;
import com.gym.datn_be.security.CustomUserDetailsService;
import com.gym.datn_be.security.JwtAuthenticationFilter;
import com.gym.datn_be.security.JwtTokenProvider;
import com.gym.datn_be.service.AdminDashboardService;

@WebMvcTest(controllers = AdminController.class,
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, 
                                     classes = {SecurityConfig.class, JwtAuthenticationFilter.class})
        })
@AutoConfigureMockMvc(addFilters = false)
public class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AdminDashboardService dashboardService;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @TestConfiguration
    static class TestConfig {
        @Bean
        @Primary
        public AdminDashboardService adminDashboardService() {
            return mock(AdminDashboardService.class);
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

    private DashboardStatsResponse dashboardStats;

    @BeforeEach
    public void setup() {
        // Tạo dữ liệu mẫu cho dashboard statistics
        Map<String, Integer> classAttendance = new HashMap<>();
        classAttendance.put("Yoga", 25);
        classAttendance.put("Cardio", 30);
        classAttendance.put("Strength", 20);

        Map<String, Integer> visitorsByHour = new HashMap<>();
        visitorsByHour.put("08:00", 15);
        visitorsByHour.put("12:00", 45);
        visitorsByHour.put("18:00", 60);

        Map<String, Integer> visitorsByDay = new HashMap<>();
        visitorsByDay.put("Monday", 120);
        visitorsByDay.put("Wednesday", 140);
        visitorsByDay.put("Friday", 180);

        Map<String, Object> membershipPackage1 = new HashMap<>();
        membershipPackage1.put("name", "Platinum");
        membershipPackage1.put("count", 50);
        membershipPackage1.put("revenue", 25000000);

        Map<String, Object> membershipPackage2 = new HashMap<>();
        membershipPackage2.put("name", "Gold");
        membershipPackage2.put("count", 80);
        membershipPackage2.put("revenue", 28000000);

        Map<String, Object> ptPackage1 = new HashMap<>();
        ptPackage1.put("name", "Personal 10");
        ptPackage1.put("count", 30);
        ptPackage1.put("revenue", 15000000);

        Map<String, Object> ptPackage2 = new HashMap<>();
        ptPackage2.put("name", "Personal 20");
        ptPackage2.put("count", 20);
        ptPackage2.put("revenue", 18000000);

        List<Map<String, Object>> topMembershipPackages = Arrays.asList(membershipPackage1, membershipPackage2);
        List<Map<String, Object>> topPtPackages = Arrays.asList(ptPackage1, ptPackage2);

        dashboardStats = DashboardStatsResponse.builder()
                .totalUsers(500)
                .activeMembers(280)
                .totalTrainers(20)
                .totalBookings(1500)
                .totalRevenue(new BigDecimal("350000000"))
                .membershipRevenue(new BigDecimal("200000000"))
                .ptPackageRevenue(new BigDecimal("120000000"))
                .otherRevenue(new BigDecimal("30000000"))
                .todayVisitors(150)
                .todayBookings(45)
                .todayClasses(12)
                .newMembersToday(15)
                .newMembersThisWeek(45)
                .newMembersThisMonth(120)
                .occupancyRate(75.5)
                .classAttendance(classAttendance)
                .topMembershipPackages(topMembershipPackages)
                .topPtPackages(topPtPackages)
                .visitorsByHour(visitorsByHour)
                .visitorsByDay(visitorsByDay)
                .build();
    }

    @Test
    @DisplayName("Lấy thông tin dashboard - Admin - Trả về 200 OK với thông tin thống kê")
    @WithMockUser(roles = "ADMIN")
    public void getDashboardStatsAsAdminTest() throws Exception {
        when(dashboardService.getDashboardStatistics()).thenReturn(dashboardStats);

        mockMvc.perform(get("/admin/dashboard/stats")
                .contentType(MediaType.APPLICATION_JSON)
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalUsers").value(500))
                .andExpect(jsonPath("$.activeMembers").value(280))
                .andExpect(jsonPath("$.totalTrainers").value(20))
                .andExpect(jsonPath("$.totalBookings").value(1500))
                .andExpect(jsonPath("$.totalRevenue").value(350000000))
                .andExpect(jsonPath("$.membershipRevenue").value(200000000))
                .andExpect(jsonPath("$.newMembersToday").value(15))
                .andExpect(jsonPath("$.occupancyRate").value(75.5));
    }

    @Test
    @DisplayName("Lấy thông tin dashboard - User - Trả về 403 Forbidden")
    @WithMockUser(roles = "USER")
    public void getDashboardStatsAsUserTest() throws Exception {
        mockMvc.perform(get("/admin/dashboard/stats")
                .contentType(MediaType.APPLICATION_JSON)
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Lấy thông tin dashboard - Chưa xác thực - Trả về 401 Unauthorized")
    public void getDashboardStatsUnauthenticatedTest() throws Exception {
        mockMvc.perform(get("/admin/dashboard/stats")
                .contentType(MediaType.APPLICATION_JSON)
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Kiểm tra sức khỏe hệ thống - Admin - Trả về 200 OK với thông tin sức khỏe")
    @WithMockUser(roles = "ADMIN")
    public void getSystemHealthAsAdminTest() throws Exception {
        mockMvc.perform(get("/admin/system/health")
                .contentType(MediaType.APPLICATION_JSON)
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Hệ thống đang hoạt động bình thường"));
    }

    @Test
    @DisplayName("Kiểm tra sức khỏe hệ thống - User - Trả về 403 Forbidden")
    @WithMockUser(roles = "USER")
    public void getSystemHealthAsUserTest() throws Exception {
        mockMvc.perform(get("/admin/system/health")
                .contentType(MediaType.APPLICATION_JSON)
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Kiểm tra sức khỏe hệ thống - Chưa xác thực - Trả về 401 Unauthorized")
    public void getSystemHealthUnauthenticatedTest() throws Exception {
        mockMvc.perform(get("/admin/system/health")
                .contentType(MediaType.APPLICATION_JSON)
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isUnauthorized());
    }
}