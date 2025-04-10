# Hệ Thống Đặt Lịch và Quản Lý Phòng Gym

## Tổng Quan

Hệ thống đặt lịch và quản lý phòng gym là một nền tảng trực tuyến giúp người dùng đặt lịch sử dụng dịch vụ gym, đồng thời cung cấp các công cụ quản lý cho nhân viên, huấn luyện viên và quản lý. Hệ thống hướng đến việc tối ưu hóa trải nghiệm người dùng, tăng hiệu quả quản lý và vận hành phòng gym.

## Mục Tiêu Tổng Thể

Dự án hướng đến việc xây dựng một hệ thống quản lý toàn diện cho phòng gym với các mục tiêu cụ thể sau:
 

## Đặc Điểm Hệ Thống

- **Không bán hàng**: Hệ thống tập trung vào việc đặt lịch và quản lý, không có tính năng bán hàng trực tuyến.
- **Đa nền tảng**: Tương thích với các thiết bị di động và máy tính.
- **Thời gian thực**: Cập nhật thông tin đặt lịch và quản lý theo thời gian thực.
- **Bảo mật**: Đảm bảo thông tin cá nhân của người dùng được bảo vệ.

## Phân Tích Yêu Cầu Theo Tác Nhân

### 1. Khách Vãng Lai

#### Yêu Cầu Cơ Bản
- Xem thông tin cơ bản về phòng gym (địa chỉ, giờ hoạt động, dịch vụ): Hiển thị thông tin chi tiết về vị trí, giờ mở cửa, các tiện ích và dịch vụ có sẵn tại phòng gym.
- Xem gói tập và bảng giá: Hiển thị danh sách các gói tập luyện kèm mức giá, thời hạn và quyền lợi tương ứng của từng gói.
- Đăng ký tài khoản mới: Cho phép người dùng tạo tài khoản mới với thông tin cá nhân cơ bản, yêu cầu xác thực email/số điện thoại.
- Liên hệ với phòng gym thông qua form liên hệ: Form liên hệ đơn giản với các trường thông tin cơ bản và yêu cầu, kèm theo xác thực để tránh spam.
- Xem thông tin về huấn luyện viên: Hiển thị danh sách các huấn luyện viên kèm thông tin về chuyên môn, kinh nghiệm, chứng chỉ và lịch làm việc.

#### Yêu Cầu Nâng Cao
- Xem tour ảo 360° của phòng gym: Cho phép người dùng tham quan ảo không gian phòng gym thông qua công nghệ 360° để có cái nhìn tổng quan về cơ sở vật chất.
- Đọc đánh giá và phản hồi từ người dùng hiện tại: Hiển thị các đánh giá, nhận xét từ người dùng đã sử dụng dịch vụ kèm theo thông tin về mức độ hài lòng (sao/điểm).
- Tham khảo lịch trình các lớp tập nhóm: Hiển thị lịch các lớp tập nhóm theo ngày/tuần/tháng, kèm thông tin về nội dung lớp, huấn luyện viên phụ trách và số lượng chỗ còn trống.

### 2. Người Dùng (Đã Đăng Ký)

#### Yêu Cầu Cơ Bản
- Đăng nhập và quản lý tài khoản cá nhân: Cho phép người dùng đăng nhập an toàn, cập nhật thông tin cá nhân, thay đổi mật khẩu và quản lý các cài đặt riêng tư.
- Đặt lịch sử dụng phòng gym, máy tập: Cho phép đặt thời gian sử dụng phòng gym, đặt trước máy tập cụ thể trong khung giờ mong muốn.
- Đặt lịch với huấn luyện viên: Cho phép chọn huấn luyện viên, xem lịch rảnh và đặt buổi tập cá nhân theo thời gian phù hợp.
- Đăng ký tham gia lớp tập nhóm: Hiển thị danh sách các lớp tập nhóm, cho phép đăng ký tham gia và nhận thông báo xác nhận.
- Xem lịch sử tập luyện: Hiển thị thông tin chi tiết về các buổi tập đã hoàn thành, thời gian, khu vực/thiết bị đã sử dụng.
- Theo dõi tiến trình cá nhân: Hiển thị biểu đồ, thống kê về tiến độ tập luyện theo thời gian, bao gồm các chỉ số đo lường.
- Nhận thông báo về lịch đặt, thay đổi lịch: Hệ thống gửi thông báo qua email, SMS hoặc push notification về lịch đặt và cập nhật lịch.

#### Yêu Cầu Nâng Cao
- Quản lý mục tiêu tập luyện cá nhân: Cho phép thiết lập, theo dõi và cập nhật các mục tiêu tập luyện ngắn hạn và dài hạn.
- Xem và theo dõi chỉ số cơ thể (BMI, cân nặng, v.v.): Nhập và theo dõi các chỉ số cơ thể theo thời gian, hiển thị dưới dạng biểu đồ trực quan.
- Nhận kế hoạch tập luyện được cá nhân hóa: Nhận chương trình tập luyện tùy chỉnh dựa trên mục tiêu và khả năng cá nhân từ huấn luyện viên.
- Đánh giá và gửi phản hồi về dịch vụ, huấn luyện viên: Hệ thống đánh giá với thang điểm, bình luận chi tiết sau mỗi buổi tập/khóa học.
- Tích hợp với ứng dụng theo dõi sức khỏe: Đồng bộ dữ liệu với các ứng dụng phổ biến như Google Fit, Apple Health, Fitbit.
- Tùy chỉnh chế độ thông báo: Cài đặt thời gian, tần suất và loại thông báo muốn nhận (email, SMS, push notification).
- Gia hạn thành viên trực tuyến: Xem thông tin hết hạn, lựa chọn và thanh toán gói gia hạn trực tuyến.

### 3. Nhân Viên

#### Yêu Cầu Cơ Bản
- Đăng nhập vào hệ thống quản lý: Hệ thống xác thực với phân quyền dành riêng cho nhân viên, có tính năng bảo mật và ghi nhớ phiên đăng nhập.
- Quản lý lịch đặt của người dùng: Xem, xác nhận, hủy và thay đổi các lịch đặt của hội viên, kèm theo ghi chú và thông tin chi tiết.
- Kiểm tra thông tin hội viên: Tra cứu nhanh thông tin hội viên theo tên, mã số, thẻ thành viên, hiển thị chi tiết gói tập và thời hạn.
- Xử lý check-in và check-out: Quản lý việc vào/ra của hội viên, xác nhận danh tính, ghi nhận thời gian sử dụng dịch vụ thông qua mã QR/thẻ.
- Quản lý sắp xếp phòng tập và thiết bị: Cập nhật trạng thái thiết bị, đánh dấu khu vực đang bảo trì/sửa chữa, sắp xếp lại vị trí trang thiết bị.
- Hỗ trợ người dùng với các vấn đề cơ bản: Giải đáp thắc mắc, hướng dẫn sử dụng hệ thống, xử lý sự cố đơn giản trong quá trình hội viên sử dụng dịch vụ.

#### Yêu Cầu Nâng Cao
- Quản lý lịch làm việc cá nhân: Xem và cập nhật lịch làm việc, đăng ký ca trực, trao đổi ca với đồng nghiệp với phê duyệt của quản lý.
- Gửi thông báo tới người dùng: Gửi thông báo cá nhân hoặc theo nhóm đến hội viên về thay đổi lịch, sự kiện, bảo trì hoặc các thông tin quan trọng.
- Báo cáo vấn đề thiết bị hoặc cơ sở vật chất: Hệ thống báo cáo nhanh với phân loại mức độ ưu tiên, kèm ảnh và mô tả chi tiết vấn đề.
- Quản lý đăng ký hội viên mới tại quầy: Tạo hồ sơ hội viên mới, xử lý thanh toán, in thẻ thành viên và cung cấp thông tin về quy định phòng gym.
- Truy cập báo cáo thống kê cơ bản: Xem báo cáo về số lượng khách, giờ cao điểm, tần suất sử dụng thiết bị phục vụ hoạt động hàng ngày.
- Quản lý lịch các lớp tập nhóm: Theo dõi sĩ số lớp, cập nhật thông tin lớp học, điều chỉnh lịch huấn luyện viên, xử lý trường hợp vắng mặt.

### 4. Huấn Luyện Viên

#### Yêu Cầu Cơ Bản
- Đăng nhập và quản lý tài khoản: Hệ thống đăng nhập an toàn với tính năng khôi phục mật khẩu, quản lý thông tin cá nhân, chuyên môn và chứng chỉ.
- Xem lịch hẹn với khách hàng: Hiển thị lịch đặt chỗ theo ngày, tuần, tháng với đầy đủ thông tin của khách hàng và loại hình huấn luyện.
- Quản lý lịch dạy các lớp tập nhóm: Xem và quản lý thời khóa biểu các lớp tập đã được phân công, điều chỉnh nội dung và yêu cầu đối với học viên.
- Theo dõi tiến trình của khách hàng: Ghi chép và theo dõi sự tiến bộ của từng khách hàng qua các buổi tập, bao gồm các chỉ số đo lường cụ thể.
- Tạo và cập nhật chương trình tập luyện: Thiết kế và điều chỉnh chương trình tập luyện phù hợp cho từng khách hàng dựa trên mục tiêu và khả năng.

#### Yêu Cầu Nâng Cao
- Tạo kế hoạch tập luyện và dinh dưỡng cá nhân hóa: Thiết kế kế hoạch toàn diện kết hợp giữa lịch tập và chế độ dinh dưỡng dựa trên đặc điểm cơ thể và mục tiêu.
- Gửi phản hồi và đánh giá tiến độ cho khách hàng: Tạo báo cáo đánh giá định kỳ, gửi nhận xét và lời khuyên cải thiện thông qua nền tảng.
- Quản lý hồ sơ khách hàng đang huấn luyện: Lưu trữ và truy cập thông tin chi tiết về sức khỏe, tiền sử y tế, kết quả kiểm tra thể lực của khách hàng.
- Đặt mục tiêu và theo dõi tiến độ cho khách hàng: Thiết lập các mục tiêu ngắn, trung và dài hạn, theo dõi và điều chỉnh kịp thời dựa trên kết quả thực tế.
- Chia sẻ bài tập và hướng dẫn trực tuyến: Tải lên video, hình ảnh hướng dẫn tập luyện, chia sẻ tài liệu chuyên môn với khách hàng.
- Nhận thông báo về các cuộc hẹn mới: Nhận thông báo ngay lập tức khi có đặt lịch mới, thay đổi lịch hoặc hủy lịch từ khách hàng.
- Quản lý thời gian rảnh và lịch làm việc: Cập nhật thời gian có thể nhận khách, đánh dấu thời gian không làm việc, điều chỉnh lịch trình linh hoạt.

### 5. Admin (Quản Lý)

#### Yêu Cầu Cơ Bản
- Quản lý toàn bộ hệ thống: Truy cập vào tất cả các tính năng của hệ thống, điều chỉnh cấu hình, theo dõi toàn bộ hoạt động từ giao diện quản trị tập trung.
- Quản lý tài khoản người dùng, nhân viên, huấn luyện viên: Tạo, chỉnh sửa, vô hiệu hóa tài khoản, phục hồi mật khẩu, gán vai trò và phân quyền chi tiết.
- Cấu hình thông tin phòng gym (giờ mở cửa, dịch vụ, v.v.): Thiết lập và cập nhật thông tin cơ bản về phòng gym, điều chỉnh lịch hoạt động, thêm/xóa/sửa dịch vụ.
- Phân quyền cho các tài khoản trong hệ thống: Tạo các nhóm vai trò, thiết lập quyền hạn chi tiết cho từng vai trò, phân quyền đặc biệt cho tài khoản cụ thể.
- Theo dõi số liệu thống kê cơ bản: Xem báo cáo tổng quan về hoạt động hàng ngày, tuần, tháng với các biểu đồ trực quan về lượng khách, doanh thu.
- Quản lý cơ sở vật chất và thiết bị: Theo dõi danh sách thiết bị, lịch bảo trì, tình trạng hoạt động, quản lý không gian và khu vực tập luyện.

#### Yêu Cầu Nâng Cao
- Phân tích dữ liệu và báo cáo thống kê chi tiết: Tạo và xuất báo cáo tùy chỉnh với nhiều tiêu chí và bộ lọc, phân tích xu hướng dài hạn và dự báo tương lai.
- Quản lý marketing và chương trình khuyến mãi: Tạo và quản lý các chiến dịch marketing, ưu đãi, khuyến mãi theo mùa, chương trình giới thiệu, quà tặng thành viên.
- Theo dõi hiệu suất của nhân viên và huấn luyện viên: Đánh giá KPI, báo cáo hiệu suất, phân tích phản hồi của khách hàng về từng nhân viên/huấn luyện viên.
- Quản lý tài chính và doanh thu: Theo dõi các khoản thu chi, báo cáo tài chính, kiểm soát dòng tiền, tạo báo cáo tài chính định kỳ.
- Cấu hình hệ thống thông báo tự động: Thiết lập các quy tắc gửi thông báo, mẫu tin nhắn, lịch gửi thông báo tự động cho từng đối tượng người dùng.
- Sao lưu và khôi phục dữ liệu: Lên lịch sao lưu tự động, kiểm tra tính toàn vẹn dữ liệu, khôi phục dữ liệu từ các bản sao lưu khi cần.
- Quản lý phản hồi và đánh giá từ khách hàng: Xem, phân loại và phản hồi đánh giá của khách hàng, phân tích mức độ hài lòng và xu hướng phản hồi.
- Theo dõi mức độ sử dụng thiết bị và khu vực tập luyện: Phân tích dữ liệu về tần suất sử dụng từng thiết bị/khu vực, xác định nhu cầu bảo trì hoặc mở rộng.

## Yêu Cầu Chức Năng Chung

### Quản Lý Lịch Hẹn
- Hệ thống đặt lịch thời gian thực: Cập nhật và hiển thị trạng thái đặt lịch ngay lập tức, tránh việc đặt trùng thời gian và nguồn lực.
- Kiểm tra trùng lịch tự động: Hệ thống tự động phát hiện và cảnh báo khi có sự trùng lặp về thời gian, huấn luyện viên hoặc không gian.
- Gửi thông báo xác nhận đặt lịch: Người dùng nhận được email/SMS xác nhận ngay sau khi đặt lịch thành công, kèm thông tin chi tiết buổi hẹn.
- Cho phép hủy hoặc thay đổi lịch: Người dùng có thể hủy hoặc điều chỉnh lịch đã đặt trong một khoảng thời gian cho phép trước buổi hẹn.
- Hiển thị trạng thái lịch (chờ xác nhận, đã xác nhận, đã huỷ): Theo dõi trạng thái của mỗi lịch hẹn với mã màu trực quan, kèm theo lịch sử thay đổi.

### Quản Lý Người Dùng
- Đăng ký và xác thực tài khoản: Quy trình đăng ký an toàn với xác thực email/SMS, bao gồm điều khoản sử dụng và chính sách bảo mật.
- Quản lý hồ sơ cá nhân: Người dùng có thể cập nhật thông tin cá nhân, ảnh đại diện, thông tin liên hệ và mật khẩu khi cần thiết.
- Quản lý quyền truy cập: Phân quyền chi tiết cho từng loại tài khoản, kiểm soát khả năng truy cập vào các chức năng của hệ thống.
- Khôi phục mật khẩu: Quy trình khôi phục mật khẩu an toàn thông qua email xác nhận, mã xác thực, hoặc câu hỏi bảo mật.
- Lịch sử hoạt động: Ghi lại và hiển thị tất cả các hoạt động quan trọng của người dùng trên hệ thống để dễ dàng theo dõi.

### Thông Báo và Nhắc Nhở
- Thông báo tự động về lịch hẹn: Hệ thống tự động gửi thông báo khi có lịch hẹn mới, được xác nhận, bị hủy hoặc thay đổi.
- Nhắc nhở trước khi đến giờ hẹn: Gửi nhắc nhở 24 giờ, 2 giờ hoặc 30 phút trước buổi hẹn để đảm bảo người dùng không quên.
- Thông báo khi có thay đổi lịch: Thông báo ngay lập tức cho các bên liên quan khi có bất kỳ thay đổi nào về lịch, khu vực hoặc huấn luyện viên.
- Thông báo về các sự kiện đặc biệt: Gửi thông tin về sự kiện, lớp tập mới, chương trình khuyến mãi hoặc thay đổi giờ hoạt động.

### Báo Cáo và Thống Kê
- Báo cáo số lượt sử dụng dịch vụ: Thống kê chi tiết về số lượt sử dụng từng loại dịch vụ, phân tích theo thời gian và đối tượng người dùng.
- Báo cáo hoạt động của huấn luyện viên: Theo dõi số buổi huấn luyện, tỷ lệ đánh giá, hiệu suất và năng suất của từng huấn luyện viên.
- Báo cáo mức độ hài lòng của khách hàng: Phân tích phản hồi, đánh giá từ khách hàng và tổng hợp các chỉ số hài lòng theo thời gian.
- Thống kê thời gian cao điểm: Xác định các khung giờ, ngày trong tuần, mùa trong năm có lượng người sử dụng cao nhất để tối ưu hóa lịch.

### Bảo Mật
- Xác thực hai yếu tố: Cung cấp tùy chọn bảo mật bổ sung thông qua mã xác thực gửi qua SMS/email hoặc ứng dụng xác thực.
- Mã hóa dữ liệu nhạy cảm: Áp dụng các thuật toán mã hóa mạnh cho dữ liệu cá nhân, thông tin thanh toán và mật khẩu người dùng.
- Quản lý phiên đăng nhập: Theo dõi phiên đăng nhập, tự động đăng xuất sau thời gian không hoạt động, khóa tài khoản sau nhiều lần đăng nhập sai.
- Nhật ký hoạt động hệ thống: Ghi lại đầy đủ các thao tác quan trọng trên hệ thống, phát hiện và cảnh báo các hoạt động bất thường.

## Yêu Cầu Phi Chức Năng

### Hiệu Suất
- Thời gian phản hồi nhanh (dưới 2 giây): Đảm bảo thời gian phản hồi của hệ thống không quá 2 giây cho mọi thao tác thông thường, tạo trải nghiệm mượt mà.
- Khả năng xử lý đồng thời nhiều người dùng: Hệ thống có thể xử lý ít nhất 100 người dùng đồng thời mà không bị suy giảm hiệu suất.
- Tối ưu hóa cho thiết bị di động: Giao diện và tính năng được thiết kế để hoạt động hiệu quả trên thiết bị di động với băng thông và tài nguyên hạn chế.

### Độ Tin Cậy
- Hệ thống hoạt động 24/7: Đảm bảo tính sẵn sàng cao, thời gian ngừng hoạt động không vượt quá 0.1% (khoảng 8.7 giờ/năm).
- Tự động sao lưu dữ liệu: Thực hiện sao lưu dữ liệu tự động hàng ngày với khả năng khôi phục điểm sao lưu (point-in-time recovery).
- Khôi phục sau sự cố: Có quy trình và công cụ để khôi phục hệ thống nhanh chóng sau sự cố, với thời gian khôi phục mục tiêu (RTO) dưới 1 giờ.

### Khả Năng Mở Rộng
- Hỗ trợ thêm chi nhánh phòng gym: Thiết kế cho phép dễ dàng thêm mới các chi nhánh phòng gym với cấu hình riêng và quản lý tập trung.
- Tích hợp với các hệ thống bên thứ ba: Cung cấp API và webhook cho phép kết nối với các ứng dụng theo dõi sức khỏe, hệ thống thanh toán và phần mềm kế toán.
- Khả năng thêm tính năng mới: Kiến trúc module hóa cho phép thêm tính năng mới mà không ảnh hưởng đến các phần khác của hệ thống.

### Sử Dụng
- Giao diện thân thiện với người dùng: Thiết kế trực quan, dễ tiếp cận với các hướng dẫn và trợ giúp ngữ cảnh, tuân thủ các nguyên tắc UX hiện đại.
- Hỗ trợ đa ngôn ngữ: Hỗ trợ ít nhất tiếng Việt và tiếng Anh, có khả năng mở rộng thêm ngôn ngữ khác thông qua tệp ngôn ngữ.
- Hướng dẫn sử dụng trực tuyến: Cung cấp tài liệu hướng dẫn, video tutorial và trợ giúp ngữ cảnh cho từng tính năng của hệ thống.
- Tương thích với các trình duyệt phổ biến: Hoạt động tốt trên các trình duyệt phổ biến như Chrome, Firefox, Safari, Edge với phiên bản được phát hành trong 2 năm gần đây.

## Kiến Trúc Hệ Thống

### Kiến Trúc Tổng Thể
- Kiến trúc Microservice
- API Gateway cho điều phối request
- Service Discovery và Configuration Management
- Event-driven communication giữa các service
- REST API cho giao tiếp giữa client và server
- Cơ sở dữ liệu phân tán (mỗi microservice có DB riêng)

### Microservices
- **Authentication Service**: Quản lý xác thực, đăng nhập, đăng ký
- **User Service**: Quản lý thông tin người dùng, phân quyền
- **Booking Service**: Xử lý đặt lịch, quản lý lịch hẹn
- **Trainer Service**: Quản lý huấn luyện viên và lịch dạy
- **Notification Service**: Gửi thông báo qua email, SMS, push notification
- **Analytics Service**: Xử lý báo cáo và phân tích dữ liệu
- **Equipment Service**: Quản lý thiết bị và cơ sở vật chất
- **Class Management Service**: Quản lý lớp tập nhóm

### Công Nghệ Đề Xuất
- **Front-end**: Reactjs
- **Back-end**: Spring Boot, Spring Cloud
- **API Gateway**: Spring Cloud Gateway
- **Service Discovery**: Eureka/Consul
- **Message Broker**: Kafka/RabbitMQ
- **Database**: 
  - SQL: MySQL/PostgreSQL cho dữ liệu có cấu trúc
  - NoSQL: MongoDB cho dữ liệu linh hoạt
- **Caching**: Redis
- **Authentication**: JWT, OAuth2
- **Notification**: WebSocket, Firebase Cloud Messaging
- **Deployment**: Docker, Kubernetes, AWS/Azure/Google Cloud
- **Monitoring**: Prometheus, Grafana, ELK Stack

## Kế Hoạch Triển Khai

### Phase 1: MVP (Minimum Viable Product)
- Đăng ký và đăng nhập
- Xem thông tin phòng gym
- Đặt lịch cơ bản
- Quản lý tài khoản người dùng

### Phase 2: Enhanced Features
- Quản lý lịch cho huấn luyện viên
- Hệ thống thông báo
- Báo cáo cơ bản
- Dashboard cho admin

### Phase 3: Advanced Features
- Phân tích dữ liệu nâng cao
- Tích hợp với ứng dụng theo dõi sức khỏe
- Kế hoạch tập luyện cá nhân hóa
- Báo cáo và thống kê nâng cao

## Tài Liệu Liên Quan
- Tài liệu API
- Hướng dẫn người dùng
- Quy trình bảo trì hệ thống
- Kế hoạch kiểm thử