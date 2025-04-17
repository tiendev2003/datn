# Database Schema for Gym Management System

## Overview

This document outlines the database schema for the Gym Management System. The database is designed to support all the features described in the requirements document, including user management, booking, membership management, personal training services, class management, and analytics.

## Database Tables

### 1. User Management

#### 1.1. `users`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| user_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the user |
| password_hash | VARCHAR(255) | NOT NULL | Encrypted password |
| email | VARCHAR(100) | UNIQUE, NOT NULL | User's email address |
| phone_number | VARCHAR(20) | UNIQUE | User's phone number |
| name | VARCHAR(100) | NOT NULL | User's full name |
| date_of_birth | DATE | | User's date of birth |
| gender | ENUM('Male', 'Female', 'Other') | | User's gender |
| address | VARCHAR(255) | | User's address |
| profile_picture | VARCHAR(255) | | Path to the user's profile picture |
| registration_date | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Date when the user registered |
| last_login | DATETIME | | Last login timestamp |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether the user is active or disabled |
| activation_token | VARCHAR(100) | | Token for email verification |
| reset_token | VARCHAR(100) | | Token for password reset |
| preferred_language | VARCHAR(10) | DEFAULT 'vi' | User's preferred language |
| two_factor_enabled | BOOLEAN | DEFAULT FALSE | Whether two-factor authentication is enabled |
| two_factor_secret | VARCHAR(100) | | Secret key for two-factor authentication |

#### 1.2. `roles`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| role_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the role |
| role_name | VARCHAR(50) | UNIQUE, NOT NULL | Name of the role (e.g., Admin, Member, Trainer, Staff) |
| description | VARCHAR(255) | | Description of the role |

#### 1.3. `user_roles`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| user_role_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the user role mapping |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| role_id | INT | FOREIGN KEY (roles.role_id), NOT NULL | Reference to the role |
| assigned_date | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Date when the role was assigned |

#### 1.4. `permissions`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| permission_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the permission |
| permission_name | VARCHAR(50) | UNIQUE, NOT NULL | Name of the permission |
| description | VARCHAR(255) | | Description of the permission |

#### 1.5. `role_permissions`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| role_permission_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the role permission mapping |
| role_id | INT | FOREIGN KEY (roles.role_id), NOT NULL | Reference to the role |
| permission_id | INT | FOREIGN KEY (permissions.permission_id), NOT NULL | Reference to the permission |

#### 1.6. `user_profiles`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| profile_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the profile |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| height | DECIMAL(5,2) | | User's height in cm |
| weight | DECIMAL(5,2) | | User's weight in kg |
| emergency_contact_name | VARCHAR(100) | | Emergency contact name |
| emergency_contact_phone | VARCHAR(20) | | Emergency contact phone number |
| health_conditions | TEXT | | Any health conditions or allergies |
| fitness_goals | TEXT | | User's fitness goals |
| notes | TEXT | | Additional notes |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

### 2. Gym Management

#### 2.1. `gym_branches`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| branch_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the gym branch |
| branch_name | VARCHAR(100) | NOT NULL | Name of the branch |
| address | VARCHAR(255) | NOT NULL | Physical address |
| city | VARCHAR(50) | NOT NULL | City |
| postal_code | VARCHAR(20) | | Postal code |
| phone_number | VARCHAR(20) | NOT NULL | Contact phone number |
| email | VARCHAR(100) | | Contact email |
| manager_id | INT | FOREIGN KEY (users.user_id) | Branch manager (reference to users table) |
| opening_time | TIME | | Opening time |
| closing_time | TIME | | Closing time |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether the branch is active |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 2.2. `gym_areas`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| area_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the gym area |
| branch_id | INT | FOREIGN KEY (gym_branches.branch_id), NOT NULL | Reference to the gym branch |
| area_name | VARCHAR(100) | NOT NULL | Name of the area (e.g., Cardio Zone, Weight Zone) |
| description | TEXT | | Description of the area |
| capacity | INT | | Maximum capacity |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether the area is active or under maintenance |

#### 2.3. `operation_hours`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| operation_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for operation hours |
| branch_id | INT | FOREIGN KEY (gym_branches.branch_id), NOT NULL | Reference to the gym branch |
| day_of_week | ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') | NOT NULL | Day of the week |
| opening_time | TIME | NOT NULL | Opening time for this day |
| closing_time | TIME | NOT NULL | Closing time for this day |
| is_closed | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether the gym is closed on this day |
| special_date | DATE | | For special hours on specific dates (holidays etc.) |

#### 2.4. `holidays`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| holiday_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the holiday |
| branch_id | INT | FOREIGN KEY (gym_branches.branch_id), NOT NULL | Reference to the gym branch |
| holiday_name | VARCHAR(100) | NOT NULL | Name of the holiday |
| holiday_date | DATE | NOT NULL | Date of the holiday |
| is_closed | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether the gym is closed on this holiday |
| alternative_opening_time | TIME | | Alternative opening time if open |
| alternative_closing_time | TIME | | Alternative closing time if open |

### 3. Membership Management

#### 3.1. `membership_types`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| membership_type_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the membership type |
| type_name | VARCHAR(100) | NOT NULL | Name of the membership type |
| description | TEXT | | Description of the membership |
| duration_days | INT | NOT NULL | Duration of the membership in days |
| price | DECIMAL(10,2) | NOT NULL | Price of the membership |
| discount_percentage | DECIMAL(5,2) | DEFAULT 0 | Default discount percentage |
| max_freeze_days | INT | DEFAULT 0 | Maximum number of freeze days allowed |
| guest_passes | INT | DEFAULT 0 | Number of guest passes included |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether this membership type is active |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 3.2. `memberships`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| membership_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the membership |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| membership_type_id | INT | FOREIGN KEY (membership_types.membership_type_id), NOT NULL | Reference to the membership type |
| start_date | DATE | NOT NULL | Start date of the membership |
| end_date | DATE | NOT NULL | End date of the membership |
| membership_status | ENUM('Active', 'Expired', 'Frozen', 'Cancelled') | NOT NULL, DEFAULT 'Active' | Status of the membership |
| payment_status | ENUM('Paid', 'Pending', 'Failed', 'Refunded') | NOT NULL, DEFAULT 'Pending' | Payment status |
| actual_price | DECIMAL(10,2) | NOT NULL | Actual price paid (after discounts) |
| freeze_start_date | DATE | | Start date of membership freeze |
| freeze_end_date | DATE | | End date of membership freeze |
| freeze_days_used | INT | DEFAULT 0 | Number of freeze days used |
| remaining_guest_passes | INT | | Remaining guest passes |
| issued_by | INT | FOREIGN KEY (users.user_id) | Staff who issued the membership |
| notes | TEXT | | Additional notes |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 3.3. `membership_benefits`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| benefit_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the benefit |
| benefit_name | VARCHAR(100) | NOT NULL | Name of the benefit |
| description | TEXT | | Description of the benefit |
| icon | VARCHAR(255) | | Icon representing the benefit |

#### 3.4. `membership_type_benefits`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| type_benefit_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the type-benefit mapping |
| membership_type_id | INT | FOREIGN KEY (membership_types.membership_type_id), NOT NULL | Reference to the membership type |
| benefit_id | INT | FOREIGN KEY (membership_benefits.benefit_id), NOT NULL | Reference to the benefit |

#### 3.5. `membership_renewals`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| renewal_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the renewal |
| membership_id | INT | FOREIGN KEY (memberships.membership_id), NOT NULL | Reference to the membership |
| previous_end_date | DATE | NOT NULL | Previous end date |
| new_end_date | DATE | NOT NULL | New end date after renewal |
| renewal_date | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Date when the renewal was processed |
| renewal_price | DECIMAL(10,2) | NOT NULL | Price paid for the renewal |
| payment_status | ENUM('Paid', 'Pending', 'Failed') | NOT NULL, DEFAULT 'Pending' | Payment status |
| processed_by | INT | FOREIGN KEY (users.user_id) | Staff who processed the renewal |
| notes | TEXT | | Additional notes |

### 4. Personal Training

#### 4.1. `trainer_profiles`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| trainer_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the trainer |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| specialization | VARCHAR(255) | | Trainer's specialization |
| certification | TEXT | | Certifications held |
| experience_years | INT | | Years of experience |
| biography | TEXT | | Trainer's biography |
| hourly_rate | DECIMAL(10,2) | | Hourly rate for private sessions |
| available_hours_per_week | INT | | Available hours per week |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether the trainer is active |
| rating | DECIMAL(3,2) | | Average rating |
| profile_image | VARCHAR(255) | | Path to the trainer's profile image |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 4.2. `pt_packages`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| package_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the PT package |
| package_name | VARCHAR(100) | NOT NULL | Name of the package |
| description | TEXT | | Description of the package |
| number_of_sessions | INT | NOT NULL | Number of sessions included |
| validity_days | INT | NOT NULL | Validity period in days |
| price | DECIMAL(10,2) | NOT NULL | Price of the package |
| discount_percentage | DECIMAL(5,2) | DEFAULT 0 | Default discount percentage |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether the package is active |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 4.3. `user_pt_packages`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| user_package_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the user-package mapping |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| package_id | INT | FOREIGN KEY (pt_packages.package_id), NOT NULL | Reference to the PT package |
| trainer_id | INT | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL | Reference to the trainer |
| start_date | DATE | NOT NULL | Start date |
| end_date | DATE | NOT NULL | End date |
| sessions_remaining | INT | NOT NULL | Number of sessions remaining |
| package_status | ENUM('Active', 'Completed', 'Expired', 'Cancelled') | NOT NULL, DEFAULT 'Active' | Status of the package |
| payment_status | ENUM('Paid', 'Pending', 'Failed', 'Refunded') | NOT NULL, DEFAULT 'Pending' | Payment status |
| actual_price | DECIMAL(10,2) | NOT NULL | Actual price paid (after discounts) |
| notes | TEXT | | Additional notes |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 4.4. `trainer_availability`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| availability_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the availability |
| trainer_id | INT | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL | Reference to the trainer |
| day_of_week | ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') | NOT NULL | Day of the week |
| start_time | TIME | NOT NULL | Start time |
| end_time | TIME | NOT NULL | End time |
| is_available | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether the trainer is available during this slot |
| specific_date | DATE | | For one-time availability settings |

#### 4.5. `trainer_unavailability`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| unavailability_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the unavailability |
| trainer_id | INT | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL | Reference to the trainer |
| start_datetime | DATETIME | NOT NULL | Start date and time |
| end_datetime | DATETIME | NOT NULL | End date and time |
| reason | VARCHAR(255) | | Reason for unavailability |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

#### 4.6. `fitness_assessments`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| assessment_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the assessment |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| trainer_id | INT | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL | Reference to the trainer |
| assessment_date | DATE | NOT NULL | Date of the assessment |
| weight | DECIMAL(5,2) | | Weight in kg |
| body_fat_percentage | DECIMAL(5,2) | | Body fat percentage |
| muscle_mass | DECIMAL(5,2) | | Muscle mass in kg |
| bmi | DECIMAL(5,2) | | Body Mass Index |
| chest_measurement | DECIMAL(5,2) | | Chest measurement in cm |
| waist_measurement | DECIMAL(5,2) | | Waist measurement in cm |
| hip_measurement | DECIMAL(5,2) | | Hip measurement in cm |
| arm_measurement | DECIMAL(5,2) | | Arm measurement in cm |
| thigh_measurement | DECIMAL(5,2) | | Thigh measurement in cm |
| cardiovascular_fitness | VARCHAR(50) | | Cardiovascular fitness level |
| flexibility | VARCHAR(50) | | Flexibility level |
| strength | VARCHAR(50) | | Strength level |
| notes | TEXT | | Additional notes |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

#### 4.7. `fitness_goals`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| goal_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the goal |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| trainer_id | INT | FOREIGN KEY (trainer_profiles.trainer_id) | Reference to the trainer |
| goal_type | ENUM('Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility', 'Overall Fitness', 'Other') | NOT NULL | Type of goal |
| goal_description | TEXT | NOT NULL | Description of the goal |
| target_value | DECIMAL(10,2) | | Target value (e.g., weight) |
| current_value | DECIMAL(10,2) | | Current value |
| unit | VARCHAR(20) | | Unit of measurement |
| start_date | DATE | NOT NULL | Start date |
| target_date | DATE | | Target completion date |
| status | ENUM('Not Started', 'In Progress', 'Achieved', 'Abandoned') | NOT NULL, DEFAULT 'Not Started' | Status of the goal |
| completion_date | DATE | | Actual completion date |
| notes | TEXT | | Additional notes |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 4.8. `workout_plans`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| plan_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the workout plan |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| trainer_id | INT | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL | Reference to the trainer |
| plan_name | VARCHAR(100) | NOT NULL | Name of the workout plan |
| description | TEXT | | Description of the plan |
| start_date | DATE | NOT NULL | Start date |
| end_date | DATE | | End date |
| plan_status | ENUM('Active', 'Completed', 'Abandoned') | NOT NULL, DEFAULT 'Active' | Status of the plan |
| notes | TEXT | | Additional notes |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 4.9. `workout_days`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| day_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the workout day |
| plan_id | INT | FOREIGN KEY (workout_plans.plan_id), NOT NULL | Reference to the workout plan |
| day_number | INT | NOT NULL | Day number in the plan |
| day_name | VARCHAR(50) | | Name for this day (e.g., "Leg Day") |
| notes | TEXT | | Additional notes |

#### 4.10. `workout_exercises`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| workout_exercise_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the workout exercise |
| day_id | INT | FOREIGN KEY (workout_days.day_id), NOT NULL | Reference to the workout day |
| exercise_id | INT | FOREIGN KEY (exercises.exercise_id), NOT NULL | Reference to the exercise |
| sets | INT | | Number of sets |
| reps | VARCHAR(50) | | Number of repetitions (can be a range) |
| weight | VARCHAR(50) | | Weight to use (can be a range or "bodyweight") |
| rest_time | INT | | Rest time between sets in seconds |
| notes | TEXT | | Additional notes |
| order_in_workout | INT | | Order of the exercise in the workout |

#### 4.11. `exercises`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| exercise_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the exercise |
| exercise_name | VARCHAR(100) | NOT NULL | Name of the exercise |
| description | TEXT | | Description of the exercise |
| muscle_group | VARCHAR(100) | | Primary muscle group targeted |
| secondary_muscle_groups | VARCHAR(255) | | Secondary muscle groups targeted |
| difficulty_level | ENUM('Beginner', 'Intermediate', 'Advanced') | NOT NULL | Difficulty level |
| video_url | VARCHAR(255) | | URL to a demonstration video |
| image_url | VARCHAR(255) | | URL to an image |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

### 5. Booking Management

#### 5.1. `bookings`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| booking_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the booking |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| booking_type | ENUM('Gym Session', 'PT Session', 'Class') | NOT NULL | Type of booking |
| branch_id | INT | FOREIGN KEY (gym_branches.branch_id), NOT NULL | Reference to the gym branch |
| area_id | INT | FOREIGN KEY (gym_areas.area_id) | Reference to the gym area (if applicable) |
| start_datetime | DATETIME | NOT NULL | Start date and time |
| end_datetime | DATETIME | NOT NULL | End date and time |
| trainer_id | INT | FOREIGN KEY (trainer_profiles.trainer_id) | Reference to the trainer (for PT sessions) |
| class_schedule_id | INT | FOREIGN KEY (class_schedules.schedule_id) | Reference to the class schedule (for classes) |
| status | ENUM('Booked', 'Checked In', 'Completed', 'Cancelled', 'No Show') | NOT NULL, DEFAULT 'Booked' | Status of the booking |
| cancellation_reason | VARCHAR(255) | | Reason for cancellation |
| notes | TEXT | | Additional notes |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 5.2. `pt_sessions`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| session_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the PT session |
| booking_id | INT | FOREIGN KEY (bookings.booking_id), NOT NULL | Reference to the booking |
| user_package_id | INT | FOREIGN KEY (user_pt_packages.user_package_id), NOT NULL | Reference to the user's PT package |
| session_number | INT | | Session number within the package |
| session_focus | VARCHAR(255) | | Focus area for this session |
| session_notes | TEXT | | Notes for this session |
| feedback | TEXT | | Trainer's feedback after the session |
| rating | INT | | User's rating (1-5) |
| user_comments | TEXT | | User's comments after the session |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 5.3. `check_in_out`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| check_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the check |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| branch_id | INT | FOREIGN KEY (gym_branches.branch_id), NOT NULL | Reference to the gym branch |
| booking_id | INT | FOREIGN KEY (bookings.booking_id) | Reference to the booking (if applicable) |
| check_in_time | DATETIME | NOT NULL | Check-in time |
| check_out_time | DATETIME | | Check-out time |
| check_in_method | ENUM('QR Code', 'Card', 'Manual', 'Biometric') | NOT NULL | Method used for check-in |
| processed_by | INT | FOREIGN KEY (users.user_id) | Staff who processed the check-in |
| notes | TEXT | | Additional notes |

### 6. Class Management

#### 6.1. `class_types`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| class_type_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the class type |
| type_name | VARCHAR(100) | NOT NULL | Name of the class type |
| description | TEXT | | Description of the class type |
| intensity_level | ENUM('Low', 'Medium', 'High') | NOT NULL | Intensity level |
| duration_minutes | INT | NOT NULL | Standard duration in minutes |
| image_url | VARCHAR(255) | | URL to an image |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 6.2. `class_schedules`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| schedule_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the class schedule |
| class_type_id | INT | FOREIGN KEY (class_types.class_type_id), NOT NULL | Reference to the class type |
| branch_id | INT | FOREIGN KEY (gym_branches.branch_id), NOT NULL | Reference to the gym branch |
| area_id | INT | FOREIGN KEY (gym_areas.area_id), NOT NULL | Reference to the gym area |
| trainer_id | INT | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL | Reference to the trainer |
| start_datetime | DATETIME | NOT NULL | Start date and time |
| end_datetime | DATETIME | NOT NULL | End date and time |
| capacity | INT | NOT NULL | Maximum capacity |
| current_bookings | INT | NOT NULL, DEFAULT 0 | Current number of bookings |
| is_recurring | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether this is a recurring class |
| recurrence_pattern | VARCHAR(50) | | Pattern for recurring classes (e.g., "WEEKLY") |
| day_of_week | ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') | | Day of the week for recurring classes |
| status | ENUM('Scheduled', 'Cancelled', 'Completed') | NOT NULL, DEFAULT 'Scheduled' | Status of the class |
| notes | TEXT | | Additional notes |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 6.3. `class_bookings`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| class_booking_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the class booking |
| booking_id | INT | FOREIGN KEY (bookings.booking_id), NOT NULL | Reference to the booking |
| schedule_id | INT | FOREIGN KEY (class_schedules.schedule_id), NOT NULL | Reference to the class schedule |
| attendance_status | ENUM('Booked', 'Attended', 'No Show', 'Cancelled') | NOT NULL, DEFAULT 'Booked' | Attendance status |
| booking_time | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Time when the booking was made |
| notes | TEXT | | Additional notes |

### 7. Notification System

#### 7.1. `notification_settings`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| setting_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the setting |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| email_notifications | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether to send email notifications |
| sms_notifications | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether to send SMS notifications |
| push_notifications | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether to send push notifications |
| booking_reminders | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether to send booking reminders |
| class_notifications | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether to send class notifications |
| marketing_notifications | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether to send marketing notifications |
| reminder_time | INT | DEFAULT 60 | Time before appointment to send reminder (minutes) |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 7.2. `notifications`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| notification_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the notification |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| notification_type | ENUM('Booking', 'Reminder', 'System', 'Marketing', 'Payment', 'Membership') | NOT NULL | Type of notification |
| title | VARCHAR(255) | NOT NULL | Title of the notification |
| message | TEXT | NOT NULL | Content of the notification |
| related_entity_type | VARCHAR(50) | | Type of related entity |
| related_entity_id | INT | | ID of the related entity |
| is_read | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether the notification has been read |
| delivery_channel | ENUM('App', 'Email', 'SMS', 'Push') | NOT NULL | Delivery channel |
| send_time | DATETIME | NOT NULL | Time when the notification should be sent |
| sent_time | DATETIME | | Time when the notification was actually sent |
| status | ENUM('Pending', 'Sent', 'Failed', 'Cancelled') | NOT NULL, DEFAULT 'Pending' | Status of the notification |
| error_message | TEXT | | Error message if sending failed |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

### 8. Payment System

#### 8.1. `payment_methods`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| method_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the payment method |
| method_name | VARCHAR(100) | NOT NULL | Name of the payment method |
| description | TEXT | | Description of the payment method |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether the payment method is active |

#### 8.2. `user_payment_methods`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| user_method_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the user payment method |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| method_id | INT | FOREIGN KEY (payment_methods.method_id), NOT NULL | Reference to the payment method |
| card_last_four | VARCHAR(4) | | Last four digits of the card |
| card_expiry | VARCHAR(7) | | Card expiry date (MM/YYYY) |
| card_type | VARCHAR(50) | | Type of card |
| billing_address | TEXT | | Billing address |
| is_default | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether this is the default payment method |
| token | VARCHAR(255) | | Payment provider token |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 8.3. `invoices`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| invoice_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the invoice |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| invoice_number | VARCHAR(50) | UNIQUE, NOT NULL | Invoice number |
| issue_date | DATE | NOT NULL | Issue date |
| due_date | DATE | NOT NULL | Due date |
| amount | DECIMAL(10,2) | NOT NULL | Total amount |
| tax_amount | DECIMAL(10,2) | NOT NULL, DEFAULT 0 | Tax amount |
| discount_amount | DECIMAL(10,2) | NOT NULL, DEFAULT 0 | Discount amount |
| final_amount | DECIMAL(10,2) | NOT NULL | Final amount after tax and discounts |
| status | ENUM('Draft', 'Issued', 'Paid', 'Partially Paid', 'Overdue', 'Cancelled', 'Refunded') | NOT NULL, DEFAULT 'Draft' | Status of the invoice |
| notes | TEXT | | Additional notes |
| created_by | INT | FOREIGN KEY (users.user_id), NOT NULL | Staff who created the invoice |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 8.4. `invoice_items`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| item_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the invoice item |
| invoice_id | INT | FOREIGN KEY (invoices.invoice_id), NOT NULL | Reference to the invoice |
| item_type | ENUM('Membership', 'PT Package', 'Class', 'Product', 'Service', 'Other') | NOT NULL | Type of item |
| description | VARCHAR(255) | NOT NULL | Description of the item |
| quantity | INT | NOT NULL | Quantity |
| unit_price | DECIMAL(10,2) | NOT NULL | Price per unit |
| tax_percentage | DECIMAL(5,2) | NOT NULL, DEFAULT 0 | Tax percentage |
| discount_percentage | DECIMAL(5,2) | NOT NULL, DEFAULT 0 | Discount percentage |
| total_amount | DECIMAL(10,2) | NOT NULL | Total amount for this item |
| related_entity_type | VARCHAR(50) | | Type of related entity |
| related_entity_id | INT | | ID of the related entity |

#### 8.5. `payments`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| payment_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the payment |
| invoice_id | INT | FOREIGN KEY (invoices.invoice_id), NOT NULL | Reference to the invoice |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| payment_date | DATETIME | NOT NULL | Date and time of the payment |
| amount | DECIMAL(10,2) | NOT NULL | Payment amount |
| payment_method_id | INT | FOREIGN KEY (payment_methods.method_id), NOT NULL | Reference to the payment method |
| transaction_id | VARCHAR(100) | | Transaction ID from payment processor |
| payment_status | ENUM('Pending', 'Completed', 'Failed', 'Refunded', 'Partially Refunded') | NOT NULL, DEFAULT 'Pending' | Status of the payment |
| processed_by | INT | FOREIGN KEY (users.user_id) | Staff who processed the payment |
| notes | TEXT | | Additional notes |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

#### 8.6. `refunds`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| refund_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the refund |
| payment_id | INT | FOREIGN KEY (payments.payment_id), NOT NULL | Reference to the payment |
| refund_date | DATETIME | NOT NULL | Date and time of the refund |
| amount | DECIMAL(10,2) | NOT NULL | Refund amount |
| refund_reason | TEXT | NOT NULL | Reason for the refund |
| transaction_id | VARCHAR(100) | | Transaction ID from payment processor |
| refund_status | ENUM('Pending', 'Completed', 'Failed') | NOT NULL, DEFAULT 'Pending' | Status of the refund |
| processed_by | INT | FOREIGN KEY (users.user_id), NOT NULL | Staff who processed the refund |
| notes | TEXT | | Additional notes |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

### 9. Feedback and Rating

#### 9.1. `user_feedback`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| feedback_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the feedback |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| feedback_type | ENUM('General', 'Trainer', 'Class', 'Facility', 'Service') | NOT NULL | Type of feedback |
| related_entity_type | VARCHAR(50) | | Type of related entity |
| related_entity_id | INT | | ID of the related entity |
| rating | INT | | Rating (1-5) |
| feedback_text | TEXT | | Feedback text |
| is_anonymous | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether the feedback is anonymous |
| status | ENUM('Submitted', 'Under Review', 'Resolved', 'Closed') | NOT NULL, DEFAULT 'Submitted' | Status of the feedback |
| response | TEXT | | Response to the feedback |
| responded_by | INT | FOREIGN KEY (users.user_id) | Staff who responded to the feedback |
| response_date | DATETIME | | Date and time of the response |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 9.2. `trainer_ratings`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| rating_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the rating |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| trainer_id | INT | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL | Reference to the trainer |
| session_id | INT | FOREIGN KEY (pt_sessions.session_id) | Reference to the PT session |
| rating | INT | NOT NULL | Rating (1-5) |
| review_text | TEXT | | Review text |
| is_anonymous | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether the review is anonymous |
| is_verified | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether the review is from a verified session |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

#### 9.3. `class_ratings`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| rating_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the rating |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| schedule_id | INT | FOREIGN KEY (class_schedules.schedule_id), NOT NULL | Reference to the class schedule |
| booking_id | INT | FOREIGN KEY (bookings.booking_id) | Reference to the booking |
| rating | INT | NOT NULL | Rating (1-5) |
| review_text | TEXT | | Review text |
| is_anonymous | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether the review is anonymous |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

### 10. Marketing and Promotions

#### 10.1. `promotions`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| promotion_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the promotion |
| promotion_name | VARCHAR(100) | NOT NULL | Name of the promotion |
| description | TEXT | | Description of the promotion |
| discount_type | ENUM('Percentage', 'Fixed Amount', 'Free Item') | NOT NULL | Type of discount |
| discount_value | DECIMAL(10,2) | NOT NULL | Value of the discount |
| start_date | DATE | NOT NULL | Start date |
| end_date | DATE | NOT NULL | End date |
| applicable_to | ENUM('All', 'Membership', 'PT Package', 'Class', 'Product') | NOT NULL | What the promotion applies to |
| min_purchase_amount | DECIMAL(10,2) | | Minimum purchase amount required |
| usage_limit | INT | | Maximum number of times the promotion can be used |
| current_usage | INT | NOT NULL, DEFAULT 0 | Current number of times the promotion has been used |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether the promotion is active |
| promo_code | VARCHAR(50) | UNIQUE | Promotional code |
| created_by | INT | FOREIGN KEY (users.user_id), NOT NULL | Staff who created the promotion |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 10.2. `promotion_usage`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| usage_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the promotion usage |
| promotion_id | INT | FOREIGN KEY (promotions.promotion_id), NOT NULL | Reference to the promotion |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| invoice_id | INT | FOREIGN KEY (invoices.invoice_id) | Reference to the invoice |
| used_date | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Date and time when the promotion was used |
| discount_amount | DECIMAL(10,2) | NOT NULL | Amount of discount applied |
| notes | TEXT | | Additional notes |

#### 10.3. `referrals`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| referral_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the referral |
| referrer_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the referring user |
| referred_id | INT | FOREIGN KEY (users.user_id) | Reference to the referred user |
| referral_code | VARCHAR(50) | NOT NULL | Unique referral code |
| referral_date | DATETIME | | Date and time when the referral was made |
| signup_date | DATETIME | | Date and time when the referred user signed up |
| status | ENUM('Pending', 'Registered', 'Converted', 'Expired') | NOT NULL, DEFAULT 'Pending' | Status of the referral |
| reward_status | ENUM('Pending', 'Issued', 'Claimed') | | Status of the reward |
| reward_details | TEXT | | Details of the reward |
| notes | TEXT | | Additional notes |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

### 11. Analytics and Reporting

#### 11.1. `attendance_logs`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| log_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the attendance log |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| branch_id | INT | FOREIGN KEY (gym_branches.branch_id), NOT NULL | Reference to the gym branch |
| check_in_time | DATETIME | NOT NULL | Check-in time |
| check_out_time | DATETIME | | Check-out time |
| duration_minutes | INT | | Duration of the visit in minutes |
| booking_id | INT | FOREIGN KEY (bookings.booking_id) | Reference to the booking (if applicable) |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

#### 11.2. `user_activity_metrics`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| metric_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the metric |
| user_id | INT | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user |
| activity_date | DATE | NOT NULL | Date of the activity |
| visit_count | INT | NOT NULL, DEFAULT 0 | Number of visits on this date |
| total_duration_minutes | INT | NOT NULL, DEFAULT 0 | Total duration of visits in minutes |
| class_attendances | INT | NOT NULL, DEFAULT 0 | Number of classes attended |
| pt_sessions | INT | NOT NULL, DEFAULT 0 | Number of PT sessions |
| areas_used | TEXT | | Areas used (comma-separated IDs) |
| last_updated | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

#### 11.3. `system_metrics`
| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| metric_id | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the metric |
| branch_id | INT | FOREIGN KEY (gym_branches.branch_id), NOT NULL | Reference to the gym branch |
| metric_date | DATE | NOT NULL | Date of the metric |
| total_visitors | INT | NOT NULL, DEFAULT 0 | Total number of visitors |
| new_members | INT | NOT NULL, DEFAULT 0 | Number of new members |
| total_bookings | INT | NOT NULL, DEFAULT 0 | Total number of bookings |
| class_bookings | INT | NOT NULL, DEFAULT 0 | Number of class bookings |
| pt_bookings | INT | NOT NULL, DEFAULT 0 | Number of PT bookings |
| membership_sales | DECIMAL(10,2) | NOT NULL, DEFAULT 0 | Total membership sales |
| pt_package_sales | DECIMAL(10,2) | NOT NULL, DEFAULT 0 | Total PT package sales |
| peak_hour_start | TIME | | Start of the peak hour |
| peak_hour_visitors | INT | | Number of visitors during peak hour |
| last_updated | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

## Database Relationships

### One-to-One Relationships
- Each `user` has one `user_profile`
- Each `trainer` has one `trainer_profile` linked to a `user`
- Each `booking` has at most one `pt_session`

### One-to-Many Relationships
- Each `user` can have multiple `memberships`
- Each `user` can have multiple `bookings`
- Each `user` can have multiple `user_pt_packages`
- Each `user` can make multiple `payments`
- Each `membership_type` can have multiple `memberships`
- Each `trainer` can have multiple `workout_plans`
- Each `trainer` can have multiple `class_schedules`
- Each `pt_package` can have multiple `user_pt_packages`
- Each `gym_branch` can have multiple `gym_areas`
- Each `gym_branch` can have multiple `operation_hours`
- Each `class_type` can have multiple `class_schedules`

### Many-to-Many Relationships
- `users` and `roles` through `user_roles`
- `roles` and `permissions` through `role_permissions`
- `membership_types` and `membership_benefits` through `membership_type_benefits`

## Indexing Strategy

### Primary Indexes
All tables have primary key indexes on their ID fields.

### Foreign Key Indexes
All foreign key columns should be indexed.

### Additional Indexes
- `users`: Indexes on `email`, `phone_number`
- `bookings`: Indexes on `user_id`, `start_datetime`, `end_datetime`, `status`
- `memberships`: Indexes on `user_id`, `membership_status`, `end_date`
- `trainer_availability`: Composite index on `trainer_id` and `day_of_week`
- `class_schedules`: Indexes on `start_datetime`, `end_datetime`, `trainer_id`, `status`
- `payments`: Indexes on `user_id`, `invoice_id`, `payment_date`
- `attendance_logs`: Indexes on `user_id`, `check_in_time`, `branch_id`

## Database Views

Several views can be created to simplify common queries:

1. `active_memberships_view`: Shows all active memberships with member details
2. `upcoming_classes_view`: Shows all upcoming classes with available spots
3. `trainer_schedule_view`: Shows trainers' schedules including classes and PT sessions
4. `revenue_summary_view`: Shows revenue breakdown by type, branch, and date
5. `member_attendance_view`: Shows attendance patterns by member

## Initial Data

The database should be initialized with:

1. Default roles (Admin, Staff, Trainer, Member, Guest)
2. Basic permissions
3. Sample membership types
4. Essential PT packages
5. Common class types
7. System configuration settings

## Data Maintenance and Backup

- Regular backup schedule (daily incremental, weekly full)
- Data retention policies for logs and metrics (aggregation after certain period)
- Regular index maintenance and optimization
- Periodic review of database performance

## Security Considerations

- Encryption of sensitive data (personal information, payment details)
- Row-level security for accessing user data
- Password hashing and salting
- Audit logs for sensitive operations
- Connection encryption (TLS/SSL)