-- V26__insert_fake_remaining_data.sql

-- Trainer Availability
INSERT INTO trainer_availability (trainer_id, day_of_week, start_time, end_time, is_available) VALUES
(3,'Monday','08:00:00','12:00:00',TRUE),
(3,'Wednesday','14:00:00','18:00:00',TRUE),
(3,'Friday','10:00:00','14:00:00',TRUE);

-- Trainer Unavailability
INSERT INTO trainer_unavailability (trainer_id, start_datetime, end_datetime, reason, created_at) VALUES
(3, NOW() + INTERVAL 5 DAY, NOW() + INTERVAL 7 DAY, 'Conference', NOW());

-- Fitness Assessments
INSERT INTO fitness_assessments (user_id, trainer_id, assessment_date, weight, body_fat_percentage, muscle_mass, bmi, chest_measurement, waist_measurement, hip_measurement, arm_measurement, thigh_measurement, cardiovascular_fitness, flexibility, strength, created_at) VALUES
(1,3, CURDATE() - INTERVAL 10 DAY, 70.0, 18.5, 30.0, 23.5, 95.0, 80.0, 100.0, 35.0, 55.0, 'Good', 'Average', 'Strong', NOW());

-- Fitness Goals
INSERT INTO fitness_goals (user_id, trainer_id, goal_type, goal_description, target_value, current_value, unit, start_date, target_date, status, created_at) VALUES
(1,3,'Weight Loss','Lose 5kg','65.0','70.0','kg', CURDATE() - INTERVAL 10 DAY, CURDATE() + INTERVAL 50 DAY,'In Progress',NOW());

-- Workout Plans
INSERT INTO workout_plans (user_id, trainer_id, plan_name, description, start_date, end_date, plan_status, created_at) VALUES
(1,3,'Summer Shred','4-week fat loss program',CURDATE() - INTERVAL 7 DAY, CURDATE() + INTERVAL 21 DAY,'Active',NOW());

-- Workout Days and Exercises
INSERT INTO workout_days (plan_id, day_number, day_name) VALUES
((SELECT plan_id FROM workout_plans WHERE plan_name='Summer Shred'),1,'Leg Day'),
((SELECT plan_id FROM workout_plans WHERE plan_name='Summer Shred'),2,'Upper Body');

-- Exercises Catalog
INSERT INTO exercises (exercise_name, description, muscle_group, secondary_muscle_groups, difficulty_level, created_at, updated_at) VALUES
('Squat','Barbell squat exercise','Legs','Glutes', 'Intermediate', NOW(),NOW()),
('Bench Press','Barbell bench press','Chest','Triceps', 'Intermediate', NOW(),NOW());

-- Workout Exercises
INSERT INTO workout_exercises (day_id, exercise_id, sets, reps, weight, rest_time, order_in_workout) VALUES
((SELECT day_id FROM workout_days WHERE day_name='Leg Day'), (SELECT exercise_id FROM exercises WHERE exercise_name='Squat'),4,'8-10','80kg',90,1),
((SELECT day_id FROM workout_days WHERE day_name='Upper Body'), (SELECT exercise_id FROM exercises WHERE exercise_name='Bench Press'),4,'8-10','60kg',90,1);

-- Notification Settings
INSERT INTO notification_settings (user_id, email_notifications, sms_notifications, push_notifications, booking_reminders, class_notifications, marketing_notifications, reminder_time, updated_at) VALUES
(1,TRUE,FALSE,TRUE,TRUE,TRUE,FALSE,30,NOW());

-- Notifications
INSERT INTO notifications (user_id, notification_type, title, message, delivery_channel, send_time, status, created_at) VALUES
(1,'Reminder','Upcoming PT Session','Your PT session starts in 2 hours','App', NOW() + INTERVAL 2 HOUR,'Pending',NOW());

-- User Feedback
INSERT INTO user_feedback (user_id, feedback_type, related_entity_type, related_entity_id, rating, feedback_text, is_anonymous, created_at) VALUES
(1,'Trainer','trainer_profiles',3,5,'Great session, very helpful!',FALSE,NOW());

-- Trainer Ratings
INSERT INTO trainer_ratings (user_id, trainer_id, session_id, rating, review_text, is_verified, created_at) VALUES
(1,3,(SELECT session_id FROM pt_sessions LIMIT 1),5,'Excellent technique instruction',TRUE,NOW());

-- Class Ratings
INSERT INTO class_ratings (user_id, schedule_id, booking_id, rating, review_text, created_at) VALUES
(2,(SELECT schedule_id FROM class_schedules LIMIT 1),(SELECT booking_id FROM bookings WHERE booking_type='Class' LIMIT 1),4,'Enjoyed the class!',NOW());

-- Promotions and Usage
INSERT INTO promotions (promotion_name, description, discount_type, discount_value, start_date, end_date, applicable_to, is_active, created_at, updated_at) VALUES
('Spring Sale','10% off all memberships','Percentage',10.00,CURDATE() - INTERVAL 15 DAY,CURDATE() + INTERVAL 15 DAY,'Membership',TRUE,NOW(),NOW());
INSERT INTO promotion_usage (promotion_id, user_id, invoice_id, used_date, discount_amount) VALUES
((SELECT promotion_id FROM promotions WHERE promotion_name='Spring Sale'),1,(SELECT invoice_id FROM invoices WHERE invoice_number='INV-1001'),NOW(),10.00);

-- Referrals
INSERT INTO referrals (referrer_id, referred_id, referral_code, referral_date, signup_date, status, reward_status, created_at) VALUES
(1,2,'REF123',NOW(),NOW(),'Converted','Issued',NOW());

-- Attendance Logs
INSERT INTO attendance_logs (user_id, check_in_time, check_out_time, duration_minutes, booking_id, created_at) VALUES
(1,NOW() - INTERVAL 1 HOUR,NOW(),60,(SELECT booking_id FROM bookings WHERE status='Completed' LIMIT 1),NOW());

-- User Activity Metrics
INSERT INTO user_activity_metrics (user_id, activity_date, visit_count, total_duration_minutes, class_attendances, pt_sessions, last_updated) VALUES
(1,CURDATE(),2,120,1,1,NOW());

-- System Metrics
INSERT INTO system_metrics (metric_date, total_visitors, new_members, total_bookings, class_bookings) VALUES
(CURDATE(),150,5,20,8);
