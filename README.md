# Hệ Thống Quản Lý Phòng Gym

## 1. Vai Trò Người Dùng và Chức Năng Chính

### 1.1. Khách Vãng Lai
- **Xem thông tin phòng gym**: Giờ hoạt động, địa chỉ, thông tin liên hệ, cơ sở vật chất (hình ảnh, video).
- **Xem danh sách gói tập**: Gym, Yoga, Zumba, v.v. (giá, thời hạn, quyền lợi).
- **Đăng ký tài khoản**: Tạo tài khoản với email, số điện thoại.
- **Liên hệ**: Form liên hệ hoặc chatbot.

### 1.2. Khách Hàng (Hội Viên)
- **Đăng ký và thanh toán gói tập**: Chọn gói, thanh toán online (MoMo, ZaloPay, v.v.), nhận email hóa đơn.
- **Quản lý thông tin cá nhân**: Cập nhật thông tin, xem lịch sử giao dịch, gia hạn gói tập.
- **Đặt lịch tập với PT**: Xem lịch trống, đặt lịch cá nhân hoặc nhóm, nhận email xác nhận.
- **Đánh giá PT**: Gửi đánh giá hoặc phản hồi.
- **Nhận thông báo**: Lịch nghỉ, sự kiện, khuyến mãi.

### 1.3. Huấn Luyện Viên (PT)
- **Quản lý lịch làm việc**: Cập nhật lịch trống, đánh dấu ngày nghỉ.
- **Quản lý học viên**: Theo dõi tiến độ, gửi thông báo cá nhân hoặc hàng loạt.
- **Quản lý thu nhập**: Xem thống kê thu nhập, lịch sử lương.
- **Hồ sơ PT**: Cập nhật thông tin cá nhân.

### 1.4. Nhân Viên
- **Quản lý ca làm việc**: Xem lịch phân ca, đánh dấu ngày làm/nghỉ, chấm công.
- **Quản lý lương thưởng**: Xem thống kê lương, nhận thông báo thưởng/phạt.
- **Hỗ trợ khách hàng tại chỗ**: Đăng ký gói tập, gia hạn gói, ghi nhận doanh thu tại chỗ.

### 1.5. Quản Lý (Admin)
- **Quản lý gói tập**: Tạo, chỉnh sửa, xóa gói tập.
- **Quản lý nhân sự**: Phân ca, duyệt ngày nghỉ, quản lý lương thưởng.
- **Quản lý khách hàng**: Xem danh sách khách hàng, xử lý phản hồi.
- **Quản lý tài chính**: Theo dõi doanh thu, báo cáo tài chính.
- **Quản lý nội dung website**: Cập nhật thông tin phòng gym, danh sách PT.
- **Thống kê và báo cáo**: Báo cáo doanh thu, hiệu suất PT/nhân viên.

## 2. Các Module Hệ Thống

### 2.1. Quản Lý Người Dùng
- Đăng ký, đăng nhập, phân quyền (khách vãng lai, khách hàng, PT, nhân viên, quản lý).
- Quản lý hồ sơ người dùng, lịch sử giao dịch, đánh giá.

### 2.2. Gói Tập và Thanh Toán
- Danh sách gói tập (Gym, Yoga, PT) với chi tiết giá, thời hạn.
- Tích hợp cổng thanh toán (MoMo, ZaloPay, ngân hàng).
- Gửi hóa đơn qua email, quản lý gia hạn gói tập.

### 2.3. Lịch và Đặt Lịch
- Hệ thống lịch cho PT, hiển thị lịch trống.
- Đặt lịch cá nhân hoặc nhóm, gửi email xác nhận và nhắc nhở.

### 2.4. Quản Lý PT
- Quản lý lịch làm việc, ngày nghỉ, học viên.
- Thống kê thu nhập, hiệu suất làm việc.
- Gửi thông báo hàng loạt tới học viên.

### 2.5. Quản Lý Nhân Viên
- Phân ca làm việc, chấm công, tính lương tự động.
- Quản lý doanh thu tại chỗ, hỗ trợ khách hàng trực tiếp.

### 2.6. Quản Lý Tài Chính
- Theo dõi doanh thu (online + tại chỗ).
- Quản lý hóa đơn, giao dịch, báo cáo tài chính.

### 2.7. Thống Kê và Báo Cáo
- Báo cáo doanh thu, số lượng khách hàng, hiệu suất PT/nhân viên.
- Dashboard trực quan (biểu đồ, số liệu).

### 2.8. Thông Báo
- Gửi email (xác nhận thanh toán, lịch tập, nghỉ lễ, nhắc nhở gia hạn).
- Tích hợp SMS hoặc thông báo đẩy.

### 2.9. Nội Dung Website
- Quản lý thông tin phòng gym (giờ hoạt động, hình ảnh, sự kiện).
- Landing page quảng bá (SEO-friendly, responsive).

## 3. Đề Xuất Công Nghệ và Kiến Trúc

- **Frontend**: ReactJs.
- **Backend**: Java Springboot.
- **Database**: MySQL.
- **Email Service**: SendGrid.
- **Thanh Toán**: MoMo, ZaloPay, VNPay.
- **Hosting**:  DigitalOcean.
- **Analytics**: Google Analytics.
- **Kiến trúc hệ thống**: MVC,
- **Bảo mật**: HTTPS, mã hóa mật khẩu, phân quyền chặt chẽ.

## 4. Quy Trình Logic

### 4.1. Đăng Ký và Thanh Toán Gói Tập
1. Khách vãng lai xem danh sách gói tập.
2. Đăng ký tài khoản, xác nhận qua email.
3. Chọn gói tập, thanh toán online.
4. Nhận email hóa đơn, cập nhật trạng thái gói tập.

### 4.2. Đặt Lịch Với PT
1. Khách hàng xem danh sách PT và lịch trống.
2. Chọn ngày/giờ, xác nhận đặt lịch.
3. Gửi email thông báo tới khách hàng và PT.

### 4.3. Gia Hạn Gói Tập
1. Hệ thống nhắc nhở khi gói sắp hết hạn.
2. Khách hàng gia hạn qua website.
3. Cập nhật thời hạn gói, gửi email xác nhận.

### 4.4. Quản Lý Ca Làm Việc
1. Quản lý tạo lịch phân ca.
2. Nhân viên xem lịch, đánh dấu ngày làm/nghỉ.
3. Hệ thống tính lương tự động.

### 4.5. Báo Cáo Tài Chính
1. Quản lý truy cập dashboard tài chính.
2. Xem doanh thu, xuất báo cáo (Excel, PDF).
3. Phân tích dữ liệu để điều chỉnh chiến lược.

---


