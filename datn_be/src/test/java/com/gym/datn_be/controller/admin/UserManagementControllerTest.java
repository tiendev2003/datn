package com.gym.datn_be.controller.admin;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gym.datn_be.dto.request.UserCreateRequest;
import com.gym.datn_be.dto.request.UserRoleUpdateRequest;
import com.gym.datn_be.dto.request.UserUpdateRequest;
import com.gym.datn_be.dto.response.UserDetailResponse;
import com.gym.datn_be.dto.response.UserSummaryResponse;
import com.gym.datn_be.service.UserManagementService;

@WebMvcTest(UserManagementController.class)
public class UserManagementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserManagementService userManagementService;

    private UserCreateRequest userCreateRequest;
    private UserUpdateRequest userUpdateRequest;
    private UserRoleUpdateRequest userRoleUpdateRequest;
    private UserDetailResponse userDetailResponse;
    private UserSummaryResponse userSummaryResponse1;
    private UserSummaryResponse userSummaryResponse2;
    private List<UserSummaryResponse> userSummaryList;

    @BeforeEach
    public void setup() {
        // Khởi tạo đối tượng UserCreateRequest
        userCreateRequest = new UserCreateRequest();
        userCreateRequest.setEmail("newuser@example.com");
        userCreateRequest.setPassword("Password123");
        userCreateRequest.setName("New User");
        userCreateRequest.setPhoneNumber("0987654321");
        userCreateRequest.setDateOfBirth(LocalDate.of(1990, 1, 1));
        userCreateRequest.setGender("MALE");
        userCreateRequest.setAddress("123 Example Street, City");
        userCreateRequest.setRoles(Arrays.asList("MEMBER"));

        // Khởi tạo đối tượng UserUpdateRequest
        userUpdateRequest = new UserUpdateRequest();
        userUpdateRequest.setName("Updated User");
        userUpdateRequest.setPhoneNumber("0987654322");
        userUpdateRequest.setDateOfBirth(LocalDate.of(1990, 1, 1));
        userUpdateRequest.setGender("MALE");
        userUpdateRequest.setAddress("123 Example Street, Updated City");

        // Khởi tạo đối tượng UserRoleUpdateRequest
        userRoleUpdateRequest = new UserRoleUpdateRequest();
        userRoleUpdateRequest.setRoles(Arrays.asList("MEMBER", "TRAINER"));

        // Khởi tạo đối tượng UserDetailResponse
        userDetailResponse = new UserDetailResponse();
        userDetailResponse.setUserId(1L);
        userDetailResponse.setEmail("user@example.com");
        userDetailResponse.setName("User Demo");
        userDetailResponse.setPhoneNumber("0987654321");
        userDetailResponse.setDateOfBirth(LocalDate.of(1990, 1, 1));
        userDetailResponse.setGender("MALE");
        userDetailResponse.setAddress("123 Example Street, City");
        userDetailResponse.setRoles(Arrays.asList("MEMBER"));
        userDetailResponse.setIsActive(true);
        userDetailResponse.setTwoFactorEnabled(false);
        userDetailResponse.setRegistrationDate(LocalDateTime.now().minusDays(30));
        userDetailResponse.setLastLogin(LocalDateTime.now().minusHours(5));

        // Khởi tạo đối tượng UserSummaryResponse 1
        userSummaryResponse1 = new UserSummaryResponse();
        userSummaryResponse1.setUserId(1L);
        userSummaryResponse1.setEmail("user1@example.com");
        userSummaryResponse1.setName("User One");
        userSummaryResponse1.setRoles(Arrays.asList("MEMBER"));
        userSummaryResponse1.setIsActive(true);
        userSummaryResponse1.setRegistrationDate(LocalDateTime.now().minusDays(30));

        // Khởi tạo đối tượng UserSummaryResponse 2
        userSummaryResponse2 = new UserSummaryResponse();
        userSummaryResponse2.setUserId(2L);
        userSummaryResponse2.setEmail("user2@example.com");
        userSummaryResponse2.setName("User Two");
        userSummaryResponse2.setRoles(Arrays.asList("MEMBER", "TRAINER"));
        userSummaryResponse2.setIsActive(true);
        userSummaryResponse2.setRegistrationDate(LocalDateTime.now().minusDays(15));
        
        // Tạo danh sách UserSummaryResponse
        userSummaryList = Arrays.asList(userSummaryResponse1, userSummaryResponse2);
    }

    @Test
    @DisplayName("Lấy danh sách người dùng - Trả về 200 OK với danh sách người dùng")
    @WithMockUser(roles = "ADMIN")
    public void getAllUsersTest() throws Exception {
        Page<UserSummaryResponse> userPage = new PageImpl<>(userSummaryList);
        when(userManagementService.getAllUsers(anyString(), anyList(), anyBoolean(), any(Pageable.class)))
                .thenReturn(userPage);

        mockMvc.perform(get("/admin/users")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content.length()").value(2))
                .andExpect(jsonPath("$.content[0].userId").value(1))
                .andExpect(jsonPath("$.content[0].email").value("user1@example.com"))
                .andExpect(jsonPath("$.content[0].name").value("User One"))
                .andExpect(jsonPath("$.content[0].roles[0]").value("MEMBER"))
                .andExpect(jsonPath("$.content[0].active").value(true))
                .andExpect(jsonPath("$.content[1].userId").value(2))
                .andExpect(jsonPath("$.content[1].email").value("user2@example.com"))
                .andExpect(jsonPath("$.content[1].name").value("User Two"))
                .andExpect(jsonPath("$.content[1].roles[0]").value("MEMBER"))
                .andExpect(jsonPath("$.content[1].roles[1]").value("TRAINER"))
                .andExpect(jsonPath("$.content[1].active").value(true));
    }

    @Test
    @DisplayName("Lấy chi tiết người dùng - Trả về 200 OK với thông tin chi tiết người dùng")
    @WithMockUser(roles = "ADMIN")
    public void getUserDetailsTest() throws Exception {
        when(userManagementService.getUserDetails(anyLong())).thenReturn(userDetailResponse);

        mockMvc.perform(get("/admin/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.email").value("user@example.com"))
                .andExpect(jsonPath("$.name").value("User Demo"))
                .andExpect(jsonPath("$.phoneNumber").value("0987654321"))
                .andExpect(jsonPath("$.gender").value("MALE"))
                .andExpect(jsonPath("$.address").value("123 Example Street, City"))
                .andExpect(jsonPath("$.roles[0]").value("MEMBER"))
                .andExpect(jsonPath("$.active").value(true))
                .andExpect(jsonPath("$.emailVerified").value(true))
                .andExpect(jsonPath("$.twoFactorEnabled").value(false));
    }

    @Test
    @DisplayName("Tạo người dùng mới - Trả về 201 Created với thông tin người dùng đã tạo")
    @WithMockUser(roles = "ADMIN")
    public void createUserTest() throws Exception {
        when(userManagementService.createUser(any(UserCreateRequest.class))).thenReturn(userDetailResponse);

        mockMvc.perform(post("/admin/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userCreateRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.email").value("user@example.com"))
                .andExpect(jsonPath("$.name").value("User Demo"));
    }

    @Test
    @DisplayName("Cập nhật người dùng - Trả về 200 OK với thông tin người dùng đã cập nhật")
    @WithMockUser(roles = "ADMIN")
    public void updateUserTest() throws Exception {
        when(userManagementService.updateUser(anyLong(), any(UserUpdateRequest.class))).thenReturn(userDetailResponse);

        mockMvc.perform(put("/admin/users/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userUpdateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.email").value("user@example.com"))
                .andExpect(jsonPath("$.name").value("User Demo"));
    }

    @Test
    @DisplayName("Xóa người dùng - Trả về 200 OK khi xóa thành công")
    @WithMockUser(roles = "ADMIN")
    public void deleteUserTest() throws Exception {
        doNothing().when(userManagementService).deleteUser(anyLong());

        mockMvc.perform(delete("/admin/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Người dùng đã được xóa thành công"));
    }

    @Test
    @DisplayName("Kích hoạt người dùng - Trả về 200 OK khi kích hoạt thành công")
    @WithMockUser(roles = "ADMIN")
    public void activateUserTest() throws Exception {
        doNothing().when(userManagementService).activateUser(anyLong());

        mockMvc.perform(put("/admin/users/1/activate")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Người dùng đã được kích hoạt thành công"));
    }

    @Test
    @DisplayName("Vô hiệu hóa người dùng - Trả về 200 OK khi vô hiệu hóa thành công")
    @WithMockUser(roles = "ADMIN")
    public void deactivateUserTest() throws Exception {
        doNothing().when(userManagementService).deactivateUser(anyLong());

        mockMvc.perform(put("/admin/users/1/deactivate")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Người dùng đã bị vô hiệu hóa thành công"));
    }

    @Test
    @DisplayName("Lấy danh sách vai trò - Trả về 200 OK với danh sách vai trò")
    @WithMockUser(roles = "ADMIN")
    public void getAllRolesTest() throws Exception {
        List<String> roles = Arrays.asList("ADMIN", "MEMBER", "TRAINER");
        when(userManagementService.getAllRoles()).thenReturn(roles);

        mockMvc.perform(get("/admin/users/roles")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0]").value("ADMIN"))
                .andExpect(jsonPath("$[1]").value("MEMBER"))
                .andExpect(jsonPath("$[2]").value("TRAINER"));
    }

    @Test
    @DisplayName("Cập nhật vai trò người dùng - Trả về 200 OK khi cập nhật thành công")
    @WithMockUser(roles = "ADMIN")
    public void updateUserRolesTest() throws Exception {
        doNothing().when(userManagementService).updateUserRoles(anyLong(), any(UserRoleUpdateRequest.class));

        mockMvc.perform(put("/admin/users/1/roles")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userRoleUpdateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Quyền của người dùng đã được cập nhật"));
    }

    @Test
    @DisplayName("Truy cập API quản lý người dùng - Không phải Admin - Trả về 403 Forbidden")
    @WithMockUser(roles = "MEMBER")
    public void accessUserManagementAsNonAdminTest() throws Exception {
        mockMvc.perform(get("/admin/users")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Truy cập API quản lý người dùng - Chưa xác thực - Trả về 401 Unauthorized")
    public void accessUserManagementUnauthenticatedTest() throws Exception {
        mockMvc.perform(get("/admin/users")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}