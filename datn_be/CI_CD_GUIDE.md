# Hướng dẫn CI/CD cho Dự án Gym Management Backend

Dự án này sử dụng GitHub Actions để thiết lập quy trình CI/CD tự động (Continuous Integration và Continuous Deployment).

## Quy trình CI/CD

Quy trình CI/CD của dự án bao gồm các bước sau:

1. **Build và Test**: Khi có push hoặc pull request vào các nhánh chính (main, master, develop)
2. **Build Docker Image**: Nếu build và test thành công, và là push vào nhánh main/master
3. **Push Docker Image**: Đẩy image lên Docker Hub
4. **Deploy**: Triển khai ứng dụng lên máy chủ production

## Cài đặt GitHub Secrets

Để quy trình CI/CD hoạt động, bạn cần thêm các secrets sau vào GitHub repository:

### Docker Hub Credentials
- `DOCKER_HUB_USERNAME`: Username Docker Hub của bạn
- `DOCKER_HUB_TOKEN`: Access token cho Docker Hub (không sử dụng mật khẩu trực tiếp)

### Production Server Details
- `PRODUCTION_SERVER_HOST`: Địa chỉ IP hoặc hostname của máy chủ production
- `PRODUCTION_SERVER_USERNAME`: Username SSH để kết nối đến máy chủ
- `PRODUCTION_SERVER_KEY`: Private SSH key để kết nối đến máy chủ
- `PRODUCTION_SERVER_PASSPHRASE`: Passphrase của SSH key (nếu có)

## Hướng dẫn thêm Secrets vào GitHub

1. Đi đến repository của bạn trên GitHub
2. Vào tab "Settings"
3. Chọn "Secrets and variables" > "Actions"
4. Nhấp vào "New repository secret"
5. Thêm từng secret với tên và giá trị tương ứng

## Các nhánh trong quy trình CI/CD

- **develop**: Dùng cho phát triển, sẽ chỉ build và test
- **main/master**: Dùng cho production, sẽ build, test, đóng gói và triển khai

## Hướng dẫn tạo Docker Hub Access Token

1. Đăng nhập vào [Docker Hub](https://hub.docker.com/)
2. Vào Account Settings > Security
3. Nhấp vào "New Access Token"
4. Đặt tên và chọn quyền (ít nhất là "Read & Write")
5. Sao chép token được tạo (token chỉ hiển thị một lần)

## Workflow file

Workflow được cấu hình trong file `.github/workflows/ci-cd.yml`. File này định nghĩa các jobs sẽ chạy và điều kiện kích hoạt.

## Môi trường Development vs Production

- **Development**: Sử dụng nhánh `develop` và cấu hình local
- **Production**: Sử dụng nhánh `main` hoặc `master` và các biến môi trường từ máy chủ

## Lưu ý về bảo mật

- Không commit các thông tin nhạy cảm (mật khẩu, tokens) vào repository
- Luôn sử dụng GitHub Secrets cho thông tin nhạy cảm
- Bảo vệ nhánh `main`/`master` bằng cách yêu cầu code reviews trước khi merge

## Các vấn đề phổ biến và cách giải quyết

1. **Tests fail**: Kiểm tra logs và sửa lỗi trong code
2. **Docker build fail**: Kiểm tra Dockerfile và cấu hình Docker
3. **Deployment fail**: Kiểm tra kết nối SSH và cấu hình máy chủ