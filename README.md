# Hệ Thống Quản Lý và Đặt Lịch Phòng Gym

## Tổng Quan Dự Án

Hệ thống quản lý phòng gym được xây dựng nhằm mục đích số hóa và tối ưu hoá toàn bộ quy trình vận hành, tương tác và quản lý trong môi trường phòng tập gym.

### Đối Tượng Sử Dụng
- Khách vãng lai
- Người dùng (hội viên)
- Nhân viên
- Huấn luyện viên (HLV)
- Admin (Quản lý)

### Mục Tiêu Dự Án
- Cho phép khách hàng dễ dàng tra cứu thông tin về các gói tập, huấn luyện viên và đăng ký tài khoản trực tuyến.
- Hỗ trợ hội viên quản lý lịch tập, đăng ký huấn luyện viên, thanh toán và đánh giá dịch vụ một cách tiện lợi.
- Tối ưu hóa quy trình vận hành nội bộ: Nhân viên lễ tân và quản lý có thể theo dõi, cập nhật và điều phối lịch tập, gói tập và thông tin hội viên một cách nhanh chóng.
- Quản lý hiệu quả tài khoản người dùng, lịch làm việc và hiệu suất của huấn luyện viên.
- Đảm bảo minh bạch và hiệu quả tài chính: Theo dõi chi tiết các khoản thanh toán (gói tập và buổi tập với HLV riêng).
- Hỗ trợ báo cáo tổng hợp về doanh thu, hiệu suất nhân sự và mức độ tham gia của hội viên.
- Hạn chế xung đột và đảm bảo lịch trình hợp lý: Tự động kiểm tra trùng lịch khi đặt lịch tập với HLV.
- Quản lý số lượng thành viên trong nhóm tập (giới hạn từ 2–5 người).
- Cập nhật trạng thái hội viên tự động khi hết hạn gói.
- Tăng khả năng quản trị và ra quyết định: Hệ thống báo cáo thống kê đa chiều.
- Ghi nhận lịch sử thao tác người dùng (audit log), phục vụ việc kiểm tra và cải tiến quy trình.

## Yêu Cầu Chức Năng (SRS - Software Requirements Specification)

### 1. Yêu Cầu Chức Năng Cơ Bản

#### 1.1. Khách Vãng Lai
| Mã | Chức năng | Mô tả |
|----|-----------|--------|
| KVL-01 | Xem thông tin phòng gym | Khách vãng lai có thể xem thông tin giới thiệu về phòng gym, cơ sở vật chất, dịch vụ |
| KVL-02 | Xem danh sách gói tập | Khách vãng lai có thể xem thông tin các gói tập, giá cả, thời hạn |
| KVL-03 | Xem danh sách HLV | Khách vãng lai có thể xem danh sách huấn luyện viên, thông tin và chuyên môn của HLV |
| KVL-04 | Đăng ký tài khoản | Khách vãng lai có thể đăng ký tài khoản để trở thành hội viên |
| KVL-05 | Liên hệ | Khách vãng lai có thể gửi thông tin liên hệ để được tư vấn |

#### 1.2. Người Dùng (Hội Viên)
| Mã | Chức năng | Mô tả |
|----|-----------|--------|
| ND-01 | Đăng nhập/Đăng xuất | Hội viên có thể đăng nhập/đăng xuất tài khoản |
| ND-02 | Quản lý thông tin cá nhân | Hội viên có thể xem và cập nhật thông tin cá nhân |
| ND-03 | Xem thông tin gói tập | Hội viên có thể xem thông tin về gói tập đã đăng ký |
| ND-04 | Đăng ký gói tập | Hội viên có thể đăng ký gói tập mới |
| ND-05 | Đặt lịch tập cá nhân | Hội viên có thể đặt lịch tập cá nhân |
| ND-06 | Đặt lịch tập với HLV | Hội viên có thể đăng ký lịch tập với HLV |
| ND-07 | Đăng ký tập nhóm | Hội viên có thể đăng ký tham gia các lớp tập nhóm |
| ND-08 | Xem lịch sử tập luyện | Hội viên có thể xem lịch sử tập luyện của mình |
| ND-09 | Thanh toán trực tuyến | Hội viên có thể thanh toán gói tập, phí HLV trực tuyến |
| ND-10 | Đánh giá dịch vụ | Hội viên có thể đánh giá chất lượng dịch vụ và HLV |
| ND-11 | Nhận thông báo | Hội viên nhận thông báo về lịch tập, thanh toán, sự kiện |
| ND-12 | Huỷ/Đổi lịch tập | Hội viên có thể huỷ hoặc thay đổi lịch tập đã đăng ký |

#### 1.3. Nhân Viên
| Mã | Chức năng | Mô tả |
|----|-----------|--------|
| NV-01 | Đăng nhập/Đăng xuất | Nhân viên có thể đăng nhập/đăng xuất hệ thống |
| NV-02 | Quản lý hội viên | Nhân viên có thể xem, thêm, sửa thông tin hội viên |
| NV-03 | Đăng ký gói tập cho hội viên | Nhân viên có thể đăng ký gói tập cho hội viên |
| NV-04 | Xử lý thanh toán | Nhân viên có thể xác nhận và xử lý thanh toán trực tiếp |
| NV-05 | Check-in/Check-out | Nhân viên có thể xác nhận check-in/check-out cho hội viên |
| NV-06 | Xem lịch tập | Nhân viên có thể xem lịch tập của hội viên và HLV |
| NV-07 | Quản lý lịch tập | Nhân viên có thể thêm, sửa, huỷ lịch tập cho hội viên |
| NV-08 | Báo cáo cơ bản | Nhân viên có thể xem báo cáo cơ bản về hoạt động hàng ngày |

#### 1.4. Huấn Luyện Viên (HLV)
| Mã | Chức năng | Mô tả |
|----|-----------|--------|
| HLV-01 | Đăng nhập/Đăng xuất | HLV có thể đăng nhập/đăng xuất hệ thống |
| HLV-02 | Quản lý thông tin cá nhân | HLV có thể xem và cập nhật thông tin cá nhân, chuyên môn |
| HLV-03 | Quản lý lịch làm việc | HLV có thể thiết lập lịch làm việc của mình |
| HLV-04 | Xem lịch dạy | HLV có thể xem lịch dạy và danh sách hội viên |
| HLV-05 | Xác nhận lịch tập | HLV có thể xác nhận lịch tập với hội viên |
| HLV-06 | Ghi chú tiến độ | HLV có thể cập nhật ghi chú về tiến độ của hội viên |
| HLV-07 | Báo cáo hoạt động | HLV có thể xem báo cáo về hoạt động giảng dạy của mình |
| HLV-08 | Xem đánh giá | HLV có thể xem đánh giá từ hội viên |

#### 1.5. Admin (Quản Lý)
| Mã | Chức năng | Mô tả |
|----|-----------|--------|
| AD-01 | Đăng nhập/Đăng xuất | Admin có thể đăng nhập/đăng xuất hệ thống |
| AD-02 | Quản lý tài khoản | Admin có thể quản lý tất cả tài khoản trong hệ thống |
| AD-03 | Quản lý nhân viên | Admin có thể thêm, sửa, xoá thông tin nhân viên |
| AD-04 | Quản lý HLV | Admin có thể thêm, sửa, xoá thông tin HLV |
| AD-05 | Quản lý gói tập | Admin có thể thêm, sửa, xoá các gói tập |
| AD-06 | Quản lý lớp tập nhóm | Admin có thể thêm, sửa, xoá các lớp tập nhóm |
| AD-07 | Thống kê doanh thu | Admin có thể xem báo cáo thống kê doanh thu |
| AD-08 | Báo cáo hoạt động | Admin có thể xem báo cáo hoạt động của phòng gym |
| AD-09 | Cấu hình hệ thống | Admin có thể thay đổi các cấu hình của hệ thống |
| AD-10 | Quản lý phản hồi | Admin có thể xem và xử lý phản hồi của khách hàng |

### 2. Yêu Cầu Nâng Cao

#### 2.1. Khách Vãng Lai
| Mã | Chức năng | Mô tả |
|----|-----------|--------|
| KVL-N01 | Đăng ký dùng thử | Khách vãng lai có thể đăng ký dùng thử phòng gym 1 ngày |
| KVL-N02 | Tour ảo 360° | Khách vãng lai có thể xem tour ảo 360° của phòng gym |
| KVL-N03 | Chatbot tư vấn | Khách vãng lai có thể trao đổi với chatbot để được tư vấn |

#### 2.2. Người Dùng (Hội Viên)
| Mã | Chức năng | Mô tả |
|----|-----------|--------|
| ND-N01 | Theo dõi chỉ số cơ thể | Hội viên có thể ghi nhận và theo dõi các chỉ số cơ thể |
| ND-N02 | Tạo và theo dõi mục tiêu | Hội viên có thể thiết lập và theo dõi mục tiêu tập luyện |
| ND-N03 | Đề xuất lịch tập thông minh | Hệ thống đề xuất lịch tập dựa trên thói quen tập luyện |
| ND-N04 | Chia sẻ thành tích | Hội viên có thể chia sẻ thành tích lên mạng xã hội |
| ND-N05 | Tích điểm thưởng | Hội viên có thể tích điểm và đổi quà/ưu đãi |
| ND-N06 | Gia hạn tự động | Hội viên có thể thiết lập gia hạn tự động gói tập |
| ND-N07 | Hệ thống giới thiệu bạn | Hội viên có thể giới thiệu bạn bè và nhận ưu đãi |

#### 2.3. Nhân Viên
| Mã | Chức năng | Mô tả |
|----|-----------|--------|
| NV-N01 | Quản lý lưu trữ hồ sơ | Nhân viên có thể quản lý và lưu trữ hồ sơ sức khỏe hội viên |
| NV-N02 | Quản lý sự kiện | Nhân viên có thể tạo và quản lý các sự kiện, workshop |
| NV-N03 | Quản lý khuyến mãi | Nhân viên có thể tạo và quản lý các chương trình khuyến mãi |
| NV-N04 | Hệ thống nhắc nhở | Nhân viên nhận thông báo về các hội viên sắp hết hạn |
| NV-N05 | Quản lý kho và thiết bị | Nhân viên có thể quản lý kho và thiết bị tập luyện |

#### 2.4. Huấn Luyện Viên (HLV)
| Mã | Chức năng | Mô tả |
|----|-----------|--------|
| HLV-N01 | Tạo kế hoạch tập luyện | HLV có thể tạo kế hoạch tập luyện cho từng hội viên |
| HLV-N02 | Chia sẻ video hướng dẫn | HLV có thể chia sẻ video hướng dẫn cho hội viên |
| HLV-N03 | Tạo thử thách | HLV có thể tạo các thử thách tập luyện cho hội viên |
| HLV-N04 | Tư vấn dinh dưỡng | HLV có thể tạo và chia sẻ kế hoạch dinh dưỡng |
| HLV-N05 | Tư vấn trực tuyến | HLV có thể tư vấn trực tuyến cho hội viên qua chat/video |

#### 2.5. Admin (Quản Lý)
| Mã | Chức năng | Mô tả |
|----|-----------|--------|
| AD-N01 | Phân tích dữ liệu nâng cao | Admin có thể xem các phân tích dữ liệu nâng cao, dự báo xu hướng |
| AD-N02 | Quản lý chi nhánh | Admin có thể quản lý nhiều chi nhánh phòng gym |
| AD-N03 | Tích hợp CRM | Tích hợp hệ thống CRM để quản lý khách hàng hiệu quả |
| AD-N04 | Tối ưu hóa lịch trình | Hệ thống tự động đề xuất tối ưu lịch làm việc của nhân viên và HLV |
| AD-N05 | Quản lý kinh doanh đa kênh | Quản lý các kênh kinh doanh (website, app, đối tác) |
| AD-N06 | Báo cáo tài chính | Hệ thống báo cáo tài chính chi tiết, kết nối kế toán |
| AD-N07 | Giám sát thời gian thực | Giám sát hoạt động phòng gym theo thời gian thực |

### 3. Yêu Cầu Phi Chức Năng

#### 3.1. Bảo Mật và Quyền Riêng Tư
- Bảo vệ thông tin cá nhân của hội viên
- Mã hóa dữ liệu nhạy cảm
- Phân quyền truy cập hệ thống
- Hệ thống xác thực hai yếu tố
- Tuân thủ quy định bảo vệ dữ liệu

#### 3.2. Hiệu Suất và Khả Năng Mở Rộng
- Đáp ứng nhiều người dùng cùng lúc
- Thời gian phản hồi nhanh (<2 giây)
- Khả năng mở rộng cho nhiều chi nhánh
- Xử lý hiệu quả trong giờ cao điểm

#### 3.3. Tính Khả Dụng và Độ Tin Cậy
- Hệ thống hoạt động 24/7
- Sao lưu dữ liệu tự động
- Phục hồi sau sự cố nhanh chóng
- Tỷ lệ uptime >99.5%

#### 3.4. Trải Nghiệm Người Dùng
- Giao diện thân thiện, dễ sử dụng
- Tương thích đa thiết bị (responsive)
- Thời gian học sử dụng ngắn
- Hỗ trợ đa ngôn ngữ (Tiếng Việt, Tiếng Anh)

#### 3.5. Khả Năng Tích Hợp
- API cho bên thứ ba
- Tích hợp với các dịch vụ thanh toán
- Tích hợp với thiết bị theo dõi sức khỏe
- Tích hợp với các nền tảng mạng xã hội

## Mô Hình Dữ Liệu Cơ Bản

### Các Thực Thể Chính
1. **User (Người dùng)**
   - UserID, Username, Password, Email, Role, Status

2. **Member (Hội viên)**
   - MemberID, UserID, FullName, Phone, Address, Gender, DateOfBirth, HealthInfo, JoinDate

3. **Staff (Nhân viên)**
   - StaffID, UserID, FullName, Phone, Position, Status

4. **Trainer (Huấn luyện viên)**
   - TrainerID, UserID, FullName, Phone, Specialization, Description, Experience, Rating

5. **MembershipPackage (Gói tập)**
   - PackageID, Name, Description, Duration, Price, Status

6. **MemberSubscription (Đăng ký gói tập)**
   - SubscriptionID, MemberID, PackageID, StartDate, EndDate, Status, PaymentStatus

7. **TrainingSession (Buổi tập)**
   - SessionID, TrainerID, SessionType, StartTime, EndTime, MaxParticipants, CurrentParticipants, Status

8. **Booking (Đặt lịch)**
   - BookingID, MemberID, SessionID/TrainerID, BookingDate, Status

9. **Payment (Thanh toán)**
   - PaymentID, SubscriptionID/BookingID, Amount, PaymentDate, PaymentMethod, Status

10. **Attendance (Điểm danh)**
    - AttendanceID, MemberID, CheckInTime, CheckOutTime, Date

11. **Feedback (Đánh giá)**
    - FeedbackID, MemberID, TrainerID/ServiceType, Rating, Comment, Date

## Tài Liệu Tham Khảo
- [Đặc tả yêu cầu phần mềm IEEE 830](https://standards.ieee.org/standard/830-1998.html)
- [Quy trình phát triển phần mềm Agile](https://agilemanifesto.org/)
- [Tiêu chuẩn thiết kế giao diện người dùng](https://www.nngroup.com/articles/ten-usability-heuristics/)

---

© 2025 - Hệ thống quản lý phòng gym | Đồ án tốt nghiệp