-- V24__insert_fake_bookings_and_related.sql

-- Users
INSERT INTO users (password_hash, email, name, date_of_birth, gender, address, registration_date, is_active) VALUES
('pwdhash1','user1@example.com','John Doe','1990-01-01','Male','123 Main St',NOW(),TRUE),
('pwdhash2','user2@example.com','Jane Smith','1985-05-20','Female','456 Oak Ave',NOW(),TRUE),
('pwdhash3','trainer1@example.com','Mike Trainer','1980-03-15','Male','789 Pine Rd',NOW(),TRUE);

-- Trainer Profiles
INSERT INTO trainer_profiles (user_id, specialization, certification, experience_years, biography, hourly_rate, available_hours_per_week, is_active, rating, created_at, updated_at) VALUES
(3,'Strength Training','Certified PT','10','Experienced trainer',50.00,30,TRUE,4.8,NOW(),NOW());

-- Assign PT Package to User1
INSERT INTO user_pt_packages (user_id, package_id, trainer_id, start_date, end_date, sessions_remaining, package_status, payment_status, actual_price, created_at, updated_at) VALUES
(1,2,3,CURDATE(), DATE_ADD(CURDATE(), INTERVAL 60 DAY),20,'Active','Paid',900.00,NOW(),NOW());

-- Class Types and Schedules
INSERT INTO class_types (type_name, description, intensity_level, duration_minutes, created_at, updated_at) VALUES
('Yoga','Yoga class for flexibility','Low',60,NOW(),NOW());
INSERT INTO class_schedules (class_type_id, trainer_id, start_datetime, end_datetime) VALUES
(LAST_INSERT_ID(),3,NOW() + INTERVAL 1 DAY, NOW() + INTERVAL 1 DAY + INTERVAL 1 HOUR);

-- Bookings: Gym, PT, Class
INSERT INTO bookings (user_id, booking_type, start_datetime, end_datetime, trainer_id, class_schedule_id, status, created_at, updated_at) VALUES
(1,'Gym Session', NOW(), NOW() + INTERVAL 1 HOUR, NULL, NULL,'Booked',NOW(),NOW()),
(1,'PT Session', NOW() + INTERVAL 2 DAY, NOW() + INTERVAL 2 DAY + INTERVAL 1 HOUR,3,NULL,'Booked',NOW(),NOW()),
(2,'Class', NOW() + INTERVAL 1 DAY, NOW() + INTERVAL 1 DAY + INTERVAL 1 HOUR,NULL, LAST_INSERT_ID(),'Booked',NOW(),NOW()),
(1,'Gym Session', NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY + INTERVAL 1 HOUR,NULL,NULL,'Completed',NOW(),NOW()),
(2,'PT Session', NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY + INTERVAL 1 HOUR,3,NULL,'Cancelled',NOW(),NOW());

-- PT Sessions
INSERT INTO pt_sessions (booking_id, user_package_id, session_number, session_focus, created_at, updated_at) VALUES
((SELECT booking_id FROM bookings WHERE booking_type='PT Session' AND status='Booked' LIMIT 1),(SELECT user_package_id FROM user_pt_packages WHERE user_id=1 LIMIT 1),1,'Full Body',NOW(),NOW());

-- Class Bookings
INSERT INTO class_bookings (booking_id, schedule_id, attendance_status, booking_time) VALUES
((SELECT booking_id FROM bookings WHERE booking_type='Class' LIMIT 1),(SELECT schedule_id FROM class_schedules LIMIT 1),'Booked',NOW());

-- Check-ins
INSERT INTO check_in_out (user_id, booking_id, check_in_time, check_in_method, processed_by) VALUES
(1,(SELECT booking_id FROM bookings WHERE booking_type='Gym Session' AND status='Booked' LIMIT 1),NOW(),'Manual',1);