# Hệ Thống Quản Lý Phòng Gym

## 1. Vai Trò Người Dùng và Chức Năng Chính

### 1.1. Khách Vãng Lai
- **Xem thông tin phòng gym**: Giờ hoạt động, địa chỉ, thông tin liên hệ, cơ sở vật chất (hình ảnh, video).
- **Xem danh sách pt**:   Thông tin cá nhân, lịch làm việc, đánh giá từ học viên.
- **Xem danh sách gói tập**: Gym, Yoga, Zumba, v.v. (giá, thời hạn, quyền lợi).
- **Đăng ký tài khoản**: Tạo tài khoản với email, số điện thoại.
- **Liên hệ**: Form liên hệ 

### 1.2. Khách Hàng (Hội Viên)
- **Đăng ký và thanh toán gói tập**: Chọn gói, thanh toán online (MoMo, ZaloPay, v.v.), nhận email hóa đơn.
  - Có thể chọn gói theo ngày cụ thể (1, 7, 15, 30 ngày) hoặc theo tháng (1, 3, 6, 12 tháng)
  - Tính năng ưu đãi cho gói dài hạn
  - Thông báo khi gói sắp hết hạn
- **Quản lý thông tin cá nhân**: Cập nhật thông tin, xem lịch sử giao dịch, gia hạn gói tập.
- **Đặt lịch tập với PT**: Xem lịch trống, đặt lịch cá nhân hoặc nhóm, nhận email xác nhận.
- **Đánh giá PT**: 
  - Đánh giá sau mỗi buổi tập hoặc sau khi hoàn thành một gói PT
  - Cho điểm sao (1-5 sao) và viết nhận xét chi tiết
  - Đánh giá về chuyên môn, thái độ, hiệu quả của PT
  - Tùy chọn đính kèm hình ảnh (trước/sau)
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
  - Hỗ trợ nhiều loại thời hạn: theo ngày cố định (1, 7, 15, 30 ngày) hoặc theo tháng (1, 3, 6, 12 tháng)
  - Thiết lập giá theo thời hạn với ưu đãi cho gói dài hạn
  - Khả năng tạo gói combo (PT + Gym) hoặc gói tùy chỉnh
- Tích hợp cổng thanh toán (MoMo, ZaloPay, ngân hàng).
- Gửi hóa đơn qua email, quản lý gia hạn gói tập.
- Hệ thống nhắc nhở tự động khi sắp hết hạn (15, 7, 3, 1 ngày trước)

### 2.3. Lịch và Đặt Lịch
- Hệ thống lịch cho PT, hiển thị lịch trống.
- Đặt lịch cá nhân hoặc nhóm, gửi email xác nhận và nhắc nhở.

### 2.4. Quản Lý PT
- Quản lý lịch làm việc, ngày nghỉ, học viên.
- Thống kê thu nhập, hiệu suất làm việc.
- Gửi thông báo hàng loạt tới học viên.
- Hệ thống đánh giá và phản hồi:
  - Hiển thị điểm đánh giá trung bình (1-5 sao)
  - Hiển thị các đánh giá chi tiết từ khách hàng
  - Khả năng phản hồi các đánh giá của khách hàng
  - Thống kê xu hướng đánh giá theo thời gian
  - Xếp hạng PT dựa trên đánh giá và hiệu suất

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

### 4.6. Đánh Giá PT và Phản Hồi
1. Sau khi hoàn thành buổi tập hoặc kết thúc gói PT, hệ thống gửi email mời đánh giá.
2. Khách hàng đánh giá PT (sao + nhận xét), có thể đính kèm hình ảnh.
3. PT nhận thông báo về đánh giá mới và có thể phản hồi.
4. Các đánh giá được hiển thị công khai trên hồ sơ PT (có thể lọc và sắp xếp).
5. Hệ thống tự động tính toán và cập nhật điểm trung bình cho PT.

### 4.7. Quản Lý Gói Tập Theo Thời Hạn
1. Admin thiết lập các gói tập với nhiều lựa chọn thời hạn (ngày/tháng).
2. Hệ thống tự động tính giá theo thời hạn và áp dụng ưu đãi cho gói dài hạn.
3. Khách hàng chọn gói và thời hạn phù hợp, thanh toán.
4. Hệ thống tự động tính ngày hết hạn và thiết lập lịch nhắc nhở.
5. Gửi thông báo khi sắp hết hạn và đề xuất gia hạn với ưu đãi đặc biệt.

## 5. Mô Hình Dữ Liệu và Quan Hệ

### 5.1. Bảng Người Dùng (users)
- `id`, `email`, `password`, `role`, `full_name`, `phone`, `address`, `created_at`, `updated_at`

### 5.2. Bảng Gói Tập (packages)
- `id`, `name`, `description`, `type` (gym, yoga, zumba, etc.)
- `base_price` (giá cơ bản)
- `is_active` (trạng thái hoạt động)
- `created_at`, `updated_at`

### 5.3. Bảng Thời Hạn Gói (package_durations)
- `id`, `package_id` (khóa ngoại tới gói tập)
- `duration_type` (day/month - ngày/tháng)
- `duration_value` (số ngày/tháng)
- `price` (giá theo thời hạn cụ thể)
- `discount_percent` (phần trăm giảm giá cho gói dài hạn)

### 5.4. Bảng Đăng Ký Gói (memberships)
- `id`, `user_id`, `package_id`, `duration_id`
- `start_date`, `end_date`
- `payment_status`, `payment_method`
- `total_price`, `transaction_id`
- `created_at`, `updated_at`

### 5.5. Bảng Đánh Giá PT (trainer_ratings)
- `id`, `user_id` (người đánh giá), `trainer_id` (PT được đánh giá)
- `session_id` (buổi tập liên quan, nếu có)
- `rating` (1-5 sao)
- `comment` (nhận xét chi tiết)
- `expertise_rating` (đánh giá về chuyên môn)
- `attitude_rating` (đánh giá về thái độ)
- `effectiveness_rating` (đánh giá về hiệu quả)
- `images` (URL hình ảnh đính kèm, có thể lưu dạng JSON)
- `is_public` (hiển thị công khai hay không)
- `created_at`, `updated_at`

### 5.6. Bảng Phản Hồi Đánh Giá (rating_replies)
- `id`, `rating_id` (khóa ngoại tới bảng đánh giá)
- `reply_text`, `replied_by` (người phản hồi, thường là PT hoặc admin)
- `created_at`, `updated_at`


