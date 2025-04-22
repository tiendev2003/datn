-- Create the gym_config table to store gym information and settings
CREATE TABLE IF NOT EXISTS gym_config (
    config_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    gym_name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Opening hours for each day of the week
    monday_open TIME,
    monday_close TIME,
    tuesday_open TIME,
    tuesday_close TIME,
    wednesday_open TIME,
    wednesday_close TIME,
    thursday_open TIME,
    thursday_close TIME,
    friday_open TIME,
    friday_close TIME,
    saturday_open TIME,
    saturday_close TIME,
    sunday_open TIME,
    sunday_close TIME,
    
    -- Services, facilities, and social media links (stored as JSON)
    services TEXT,
    facilities TEXT,
    social_media_links TEXT,
    
    -- Logo and banner images
    logo_url VARCHAR(255),
    banner_url VARCHAR(255),
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT,
    updated_by BIGINT,
    
    -- Foreign key constraints
    CONSTRAINT fk_gym_config_created_by FOREIGN KEY (created_by) REFERENCES users(user_id),
    CONSTRAINT fk_gym_config_updated_by FOREIGN KEY (updated_by) REFERENCES users(user_id)
);

-- Insert default initial configuration with sample data
INSERT INTO gym_config (
    gym_name, address, phone_number, email, description,
    monday_open, monday_close, tuesday_open, tuesday_close, 
    wednesday_open, wednesday_close, thursday_open, thursday_close,
    friday_open, friday_close, saturday_open, saturday_close,
    sunday_open, sunday_close,
    services, facilities, social_media_links
) VALUES (
    'Tien Gym Center', 
    '123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM', 
    '0987654321', 
    'info@tiengym.com',
    'Phòng tập hiện đại với các thiết bị cao cấp và đội ngũ huấn luyện viên chuyên nghiệp.',
    '06:00:00', '22:00:00', '06:00:00', '22:00:00',
    '06:00:00', '22:00:00', '06:00:00', '22:00:00',
    '06:00:00', '22:00:00', '08:00:00', '20:00:00',
    '08:00:00', '18:00:00',
    '{"personal_training":"Huấn luyện cá nhân","group_classes":"Lớp tập nhóm","nutrition_counseling":"Tư vấn dinh dưỡng","body_analysis":"Phân tích chỉ số cơ thể"}',
    '{"cardio_zone":"Khu vực cardio","weight_zone":"Khu vực tập tạ","functional_zone":"Khu vực tập chức năng","shower":"Phòng tắm","sauna":"Phòng xông hơi"}',
    '{"facebook":"https://facebook.com/tiengym","instagram":"https://instagram.com/tiengym","youtube":"https://youtube.com/tiengym"}'
);