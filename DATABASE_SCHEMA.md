# Database Schema for Gym Management System

## Overview

This document outlines the database schema for the Gym Management System. The database is designed to support all features of the gym management application, including user management, booking, membership management, personal training services, class management, and analytics.

## Database Tables

### 1. User Management

#### 1.1. `users`

| Column Name         | Data Type                       | Constraints                         | Description                                  |
| ------------------- | ------------------------------- | ----------------------------------- | -------------------------------------------- |
| user_id             | BIGINT                          | PRIMARY KEY, AUTO_INCREMENT         | Unique identifier for the user               |
| password_hash       | VARCHAR(255)                    | NOT NULL                            | Encrypted password                           |
| email               | VARCHAR(100)                    | UNIQUE, NOT NULL                    | User's email address                         |
| phone_number        | VARCHAR(20)                     | UNIQUE                              | User's phone number                          |
| name                | VARCHAR(100)                    | NOT NULL                            | User's full name                             |
| date_of_birth       | DATE                            |                                     | User's date of birth                         |
| gender              | ENUM('Male', 'Female', 'Other') |                                     | User's gender                                |
| address             | VARCHAR(255)                    |                                     | User's address                               |
| profile_picture     | VARCHAR(255)                    |                                     | Path to the user's profile picture           |
| profile_image       | VARCHAR(255)                    |                                     | Path to the user's profile image             |
| registration_date   | DATETIME                        | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Date when the user registered                |
| created_at          | DATETIME                        | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Creation timestamp                           |
| updated_at          | DATETIME                        | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Last update timestamp                        |
| last_login          | DATETIME                        |                                     | Last login timestamp                         |
| is_active           | BOOLEAN                         | NOT NULL, DEFAULT TRUE              | Whether the user is active or disabled       |
| is_email_verified   | BOOLEAN                         | NOT NULL, DEFAULT FALSE             | Whether the email is verified                |
| activation_token    | VARCHAR(100)                    |                                     | Token for email verification                 |
| reset_token         | VARCHAR(100)                    |                                     | Token for password reset                     |
| preferred_language  | VARCHAR(10)                     | DEFAULT 'vi'                        | User's preferred language                    |
| two_factor_enabled  | BOOLEAN                         | DEFAULT FALSE                       | Whether two-factor authentication is enabled |
| two_factor_secret   | VARCHAR(100)                    |                                     | Secret key for two-factor authentication     |
| is_deleted          | BOOLEAN                         | NOT NULL, DEFAULT FALSE             | Whether user account is deleted              |
| deletion_date       | DATETIME                        |                                     | Date when the user account was deleted       |
| failed_login_attempts| INTEGER                        | DEFAULT 0                           | Number of failed login attempts              |
| account_locked_until | DATETIME                       |                                     | Time until account is unlocked               |
| last_login_ip       | VARCHAR(50)                     |                                     | IP address of last login                     |
| last_login_device   | VARCHAR(255)                    |                                     | Device used for last login                   |
| last_login_location | VARCHAR(255)                    |                                     | Location of last login                       |
| password_changed_at | DATETIME                        |                                     | Time when password was last changed          |

#### 1.2. `roles`

| Column Name | Data Type    | Constraints                 | Description                                            |
| ----------- | ------------ | --------------------------- | ------------------------------------------------------ |
| role_id     | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the role                         |
| role_name   | VARCHAR(50)  | UNIQUE, NOT NULL            | Name of the role (e.g., ADMIN, MEMBER, TRAINER, STAFF) |
| description | VARCHAR(255) |                             | Description of the role                                |

#### 1.3. `permissions`

| Column Name     | Data Type    | Constraints                 | Description                          |
| --------------- | ------------ | --------------------------- | ------------------------------------ |
| permission_id   | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the permission |
| permission_name | VARCHAR(50)  | UNIQUE, NOT NULL            | Name of the permission               |
| description     | VARCHAR(255) |                             | Description of the permission        |

#### 1.4. `user_roles`

| Column Name   | Data Type | Constraints                                                                  | Description                                 |
| ------------- | --------- | ---------------------------------------------------------------------------- | ------------------------------------------- |
| user_role_id  | BIGINT    | PRIMARY KEY, AUTO_INCREMENT                                                  | Unique identifier for the user role mapping |
| user_id       | BIGINT    | FOREIGN KEY (users.user_id), NOT NULL                                        | Reference to the user                       |
| role_id       | BIGINT    | FOREIGN KEY (roles.role_id), NOT NULL                                        | Reference to the role                       |
| UNIQUE        |           | (user_id, role_id)                                                           | Prevents duplicate user-role assignments    |

#### 1.5. `role_permissions`

| Column Name        | Data Type | Constraints                                       | Description                                       |
| ------------------ | --------- | ------------------------------------------------- | ------------------------------------------------- |
| role_permission_id | BIGINT    | PRIMARY KEY, AUTO_INCREMENT                       | Unique identifier for the role permission mapping |
| role_id            | BIGINT    | FOREIGN KEY (roles.role_id), NOT NULL             | Reference to the role                             |
| permission_id      | BIGINT    | FOREIGN KEY (permissions.permission_id), NOT NULL | Reference to the permission                       |

#### 1.6. `user_profiles`

| Column Name             | Data Type     | Constraints                                                     | Description                        |
| ----------------------- | ------------- | --------------------------------------------------------------- | ---------------------------------- |
| profile_id              | BIGINT        | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the profile  |
| user_id                 | BIGINT        | FOREIGN KEY (users.user_id), NOT NULL                           | Reference to the user              |
| height                  | DECIMAL(5,2)  |                                                                 | User's height in cm                |
| weight                  | DECIMAL(5,2)  |                                                                 | User's weight in kg                |
| emergency_contact_name  | VARCHAR(100)  |                                                                 | Emergency contact name             |
| emergency_contact_phone | VARCHAR(20)   |                                                                 | Emergency contact phone number     |
| health_conditions       | TEXT          |                                                                 | Any health conditions or allergies |
| fitness_goals           | TEXT          |                                                                 | User's fitness goals               |
| notes                   | TEXT          |                                                                 | Additional notes                   |
| name                    | VARCHAR(100)  |                                                                 | User's name in profile             |
| updated_at              | DATETIME      | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp              |

### 2. Security Management

#### 2.1. `login_attempts`

| Column Name       | Data Type                                | Constraints                         | Description                                    |
| ----------------- | ---------------------------------------- | ----------------------------------- | ---------------------------------------------- |
| id                | BIGINT                                   | PRIMARY KEY, AUTO_INCREMENT         | Unique identifier for the login attempt        |
| user_id           | BIGINT                                   | FOREIGN KEY (users.user_id)         | Reference to the user                          |
| attempt_time      | DATETIME                                 | NOT NULL                            | Time of the login attempt                      |
| ip_address        | VARCHAR(50)                              |                                     | IP address used for login attempt              |
| user_agent        | VARCHAR(255)                             |                                     | User agent information                         |
| device_info       | VARCHAR(255)                             |                                     | Device information                             |
| location          | VARCHAR(255)                             |                                     | Location information                           |
| status            | ENUM('SUCCESS', 'FAILURE', 'BLOCKED')    | NOT NULL                            | Status of the login attempt                    |
| is_suspicious     | BOOLEAN                                  |                                     | Whether the login attempt is suspicious        |

#### 2.2. `security_notifications`

| Column Name       | Data Type                                                                           | Constraints                         | Description                                    |
| ----------------- | ----------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------- |
| id                | BIGINT                                   | PRIMARY KEY, AUTO_INCREMENT               | Unique identifier for the notification          |
| user_id           | BIGINT                                   | FOREIGN KEY (users.user_id)               | Reference to the user                          |
| created_at        | DATETIME                                 | NOT NULL                                  | Time the notification was created              |
| notification_type | ENUM('NEW_LOGIN', 'PASSWORD_CHANGED', 'EMAIL_CHANGED', 'TWO_FACTOR_ENABLED', 'TWO_FACTOR_DISABLED', 'PROFILE_UPDATED', 'SUSPICIOUS_ACTIVITY', 'ACCOUNT_LOCKED', 'ACCOUNT_UNLOCKED') | NOT NULL | Type of security notification |
| message           | VARCHAR(255)                             | NOT NULL                                  | Message content of the notification            |
| details           | TEXT                                     |                                           | Additional details                             |
| is_read           | BOOLEAN                                  | NOT NULL, DEFAULT FALSE                   | Whether the notification has been read         |
| read_at           | DATETIME                                 |                                           | Time the notification was read                 |
| ip_address        | VARCHAR(50)                              |                                           | IP address related to the notification         |
| location          | VARCHAR(255)                             |                                           | Location related to the notification           |
| device_info       | VARCHAR(255)                             |                                           | Device information                             |

#### 2.3. `email_verifications`

| Column Name | Data Type    | Constraints                         | Description                                    |
| ----------- | ------------ | ----------------------------------- | ---------------------------------------------- |
| id          | BIGINT       | PRIMARY KEY, AUTO_INCREMENT         | Unique identifier for the verification entry   |
| token       | VARCHAR(255) | NOT NULL, UNIQUE                    | Verification token                             |
| user_id     | BIGINT       | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user                        |
| expiry_date | DATETIME     | NOT NULL                            | Expiration time of the token                   |

### 3. Membership Management

#### 3.1. `membership_types`

| Column Name         | Data Type     | Constraints                                                     | Description                               |
| ------------------- | ------------- | --------------------------------------------------------------- | ----------------------------------------- |
| membership_type_id  | BIGINT        | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the membership type |
| type_name           | VARCHAR(100)  | NOT NULL                                                        | Name of the membership type               |
| description         | TEXT          |                                                                 | Description of the membership             |
| duration_days       | INTEGER       | NOT NULL                                                        | Duration of the membership in days        |
| price               | DECIMAL(10,2) | NOT NULL                                                        | Price of the membership                   |
| max_freeze_days     | INTEGER       | DEFAULT 0                                                       | Maximum number of freeze days allowed     |
| guest_passes        | INTEGER       | DEFAULT 0                                                       | Number of guest passes included           |
| is_active           | BOOLEAN       | NOT NULL, DEFAULT TRUE                                          | Whether this membership type is active    |
| created_at          | DATETIME      | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                        |
| updated_at          | DATETIME      | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp                     |

#### 3.2. `memberships`

| Column Name            | Data Type                                        | Constraints                                                     | Description                          |
| ---------------------- | ------------------------------------------------ | --------------------------------------------------------------- | ------------------------------------ |
| membership_id          | BIGINT                                           | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the membership |
| user_id                | BIGINT                                           | FOREIGN KEY (users.user_id), NOT NULL                           | Reference to the user                |
| membership_type_id     | BIGINT                                           | FOREIGN KEY (membership_types.membership_type_id), NOT NULL     | Reference to the membership type     |
| start_date             | DATE                                             | NOT NULL                                                        | Start date of the membership         |
| end_date               | DATE                                             | NOT NULL                                                        | End date of the membership           |
| membership_status      | ENUM('Active', 'Expired', 'Frozen', 'Cancelled') | NOT NULL, DEFAULT 'Active'                                      | Status of the membership             |
| payment_status         | ENUM('Paid', 'Pending', 'Failed', 'Refunded')    | NOT NULL, DEFAULT 'Pending'                                     | Payment status                       |
| actual_price           | DECIMAL(10,2)                                    | NOT NULL                                                        | Actual price paid (after discounts)  |
| freeze_start_date      | DATE                                             |                                                                 | Start date of membership freeze      |
| freeze_end_date        | DATE                                             |                                                                 | End date of membership freeze        |
| freeze_days_used       | INTEGER                                          | DEFAULT 0                                                       | Number of freeze days used           |
| remaining_guest_passes | INTEGER                                          |                                                                 | Remaining guest passes               |
| issued_by              | BIGINT                                           | FOREIGN KEY (users.user_id)                                     | Staff who issued the membership      |
| notes                  | TEXT                                             |                                                                 | Additional notes                     |
| created_at             | DATETIME                                         | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                   |
| updated_at             | DATETIME                                         | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp                |

### 4. Personal Training

#### 4.1. `trainer_profiles`

| Column Name              | Data Type     | Constraints                                                     | Description                         |
| ------------------------ | ------------- | --------------------------------------------------------------- | ----------------------------------- |
| trainer_id               | BIGINT        | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the trainer   |
| user_id                  | BIGINT        | FOREIGN KEY (users.user_id), NOT NULL                           | Reference to the user               |
| specialization           | VARCHAR(255)  |                                                                 | Trainer's specialization            |
| certification            | TEXT          |                                                                 | Certifications held                 |
| experience_years         | INTEGER       |                                                                 | Years of experience                 |
| biography                | TEXT          |                                                                 | Trainer's biography                 |
| hourly_rate              | DECIMAL(10,2) |                                                                 | Hourly rate for private sessions    |
| available_hours_per_week | INTEGER       |                                                                 | Available hours per week            |
| is_active                | BOOLEAN       | NOT NULL, DEFAULT TRUE                                          | Whether the trainer is active       |
| rating                   | DECIMAL(3,2)  |                                                                 | Average rating                      |
| profile_image            | VARCHAR(255)  |                                                                 | Path to the trainer's profile image |
| created_at               | DATETIME      | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                  |
| updated_at               | DATETIME      | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp               |

#### 4.2. `pt_packages`

| Column Name         | Data Type     | Constraints                                                     | Description                          |
| ------------------- | ------------- | --------------------------------------------------------------- | ------------------------------------ |
| package_id          | BIGINT        | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the PT package |
| package_name        | VARCHAR(100)  | NOT NULL                                                        | Name of the package                  |
| description         | TEXT          |                                                                 | Description of the package           |
| number_of_sessions  | INTEGER       | NOT NULL                                                        | Number of sessions included          |
| validity_days       | INTEGER       | NOT NULL                                                        | Validity period in days              |
| price               | DECIMAL(10,2) | NOT NULL                                                        | Price of the package                 |
| discount_percentage | DECIMAL(5,2)  | DEFAULT 0                                                       | Default discount percentage          |
| is_active           | BOOLEAN       | NOT NULL, DEFAULT TRUE                                          | Whether the package is active        |
| created_at          | DATETIME      | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                   |
| updated_at          | DATETIME      | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp                |

#### 4.3. `user_pt_packages`

| Column Name        | Data Type                                           | Constraints                                                     | Description                                    |
| ------------------ | --------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------- |
| user_package_id    | BIGINT                                              | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the user-package mapping |
| user_id            | BIGINT                                              | FOREIGN KEY (users.user_id), NOT NULL                           | Reference to the user                          |
| package_id         | BIGINT                                              | FOREIGN KEY (pt_packages.package_id), NOT NULL                  | Reference to the PT package                    |
| trainer_id         | BIGINT                                              | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL             | Reference to the trainer                       |
| start_date         | DATE                                                | NOT NULL                                                        | Start date                                     |
| end_date           | DATE                                                | NOT NULL                                                        | End date                                       |
| sessions_remaining | INTEGER                                             | NOT NULL                                                        | Number of sessions remaining                   |
| package_status     | ENUM('ACTIVE', 'COMPLETED', 'EXPIRED', 'CANCELLED') | NOT NULL, DEFAULT 'ACTIVE'                                      | Status of the package                          |
| payment_status     | ENUM('PAID', 'PENDING', 'FAILED', 'REFUNDED')       | NOT NULL, DEFAULT 'PENDING'                                     | Payment status                                 |
| actual_price       | DECIMAL(10,2)                                       | NOT NULL                                                        | Actual price paid (after discounts)            |
| notes              | TEXT                                                |                                                                 | Additional notes                               |
| created_at         | DATETIME                                            | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                             |
| updated_at         | DATETIME                                            | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp                          |

#### 4.4. `trainer_availability`

| Column Name     | Data Type                                                                          | Constraints                                                     | Description                                       |
| --------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------- |
| availability_id | BIGINT                                                                             | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the availability            |
| trainer_id      | BIGINT                                                                             | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL             | Reference to the trainer                          |
| day_of_week     | ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') | NOT NULL                                                        | Day of the week                                   |
| start_time      | TIME                                                                               | NOT NULL                                                        | Start time                                        |
| end_time        | TIME                                                                               | NOT NULL                                                        | End time                                          |
| is_available    | BOOLEAN                                                                            | NOT NULL, DEFAULT TRUE                                          | Whether the trainer is available during this slot |
| specific_date   | DATE                                                                               |                                                                 | For one-time availability settings                |

#### 4.5. `trainer_unavailability`

| Column Name       | Data Type    | Constraints                                                     | Description                              |
| ----------------- | ------------ | --------------------------------------------------------------- | ---------------------------------------- |
| unavailability_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the unavailability |
| trainer_id        | BIGINT       | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL             | Reference to the trainer                 |
| start_datetime    | DATETIME     | NOT NULL                                                        | Start date and time                      |
| end_datetime      | DATETIME     | NOT NULL                                                        | End date and time                        |
| reason            | VARCHAR(255) |                                                                 | Reason for unavailability                |
| created_at        | DATETIME     | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                       |

#### 4.6. `fitness_assessments`

| Column Name            | Data Type     | Constraints                                                     | Description                          |
| ---------------------- | ------------- | --------------------------------------------------------------- | ------------------------------------ |
| assessment_id          | BIGINT        | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the assessment |
| user_id                | BIGINT        | FOREIGN KEY (users.user_id), NOT NULL                           | Reference to the user                |
| trainer_id             | BIGINT        | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL             | Reference to the trainer             |
| assessment_date        | DATE          | NOT NULL                                                        | Date of the assessment               |
| weight                 | DECIMAL(5,2)  |                                                                 | Weight in kg                         |
| body_fat_percentage    | DECIMAL(5,2)  |                                                                 | Body fat percentage                  |
| muscle_mass            | DECIMAL(5,2)  |                                                                 | Muscle mass in kg                    |
| bmi                    | DECIMAL(5,2)  |                                                                 | Body Mass Index                      |
| chest_measurement      | DECIMAL(5,2)  |                                                                 | Chest measurement in cm              |
| waist_measurement      | DECIMAL(5,2)  |                                                                 | Waist measurement in cm              |
| hip_measurement        | DECIMAL(5,2)  |                                                                 | Hip measurement in cm                |
| arm_measurement        | DECIMAL(5,2)  |                                                                 | Arm measurement in cm                |
| thigh_measurement      | DECIMAL(5,2)  |                                                                 | Thigh measurement in cm              |
| cardiovascular_fitness | VARCHAR(50)   |                                                                 | Cardiovascular fitness level         |
| flexibility            | VARCHAR(50)   |                                                                 | Flexibility level                    |
| strength               | VARCHAR(50)   |                                                                 | Strength level                       |
| notes                  | TEXT          |                                                                 | Additional notes                     |
| created_at             | DATETIME      | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                   |

#### 4.7. `trainer_ratings`

| Column Name | Data Type    | Constraints                                                     | Description                           |
| ----------- | ------------ | --------------------------------------------------------------- | ------------------------------------- |
| rating_id   | BIGINT       | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the rating      |
| user_id     | BIGINT       | FOREIGN KEY (users.user_id), NOT NULL                           | Reference to the user giving rating   |
| trainer_id  | BIGINT       | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL             | Reference to the trainer being rated  |
| session_id  | BIGINT       | FOREIGN KEY (pt_sessions.session_id)                            | Reference to the PT session           |
| rating      | INTEGER      | NOT NULL                                                        | Rating value (typically 1-5)          |
| review_text | TEXT         |                                                                 | Text review                           |
| is_anonymous| BOOLEAN      | NOT NULL, DEFAULT FALSE                                         | Whether the review is anonymous       |
| is_verified | BOOLEAN      | NOT NULL, DEFAULT FALSE                                         | Whether the review is verified        |
| created_at  | DATETIME     | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                    |

#### 4.8. `workout_plans`

| Column Name | Data Type                                | Constraints                                                     | Description                            |
| ----------- | ---------------------------------------- | --------------------------------------------------------------- | -------------------------------------- |
| plan_id     | BIGINT                                   | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the workout plan |
| user_id     | BIGINT                                   | FOREIGN KEY (users.user_id), NOT NULL                           | Reference to the user                  |
| trainer_id  | BIGINT                                   | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL             | Reference to the trainer               |
| plan_name   | VARCHAR(100)                             | NOT NULL                                                        | Name of the workout plan               |
| description | TEXT                                     |                                                                 | Description of the plan                |
| start_date  | DATE                                     | NOT NULL                                                        | Start date                             |
| end_date    | DATE                                     |                                                                 | End date                               |
| plan_status | ENUM('ACTIVE', 'COMPLETED', 'ABANDONED') | NOT NULL, DEFAULT 'ACTIVE'                                      | Status of the plan                     |
| notes       | TEXT                                     |                                                                 | Additional notes                       |
| created_at  | DATETIME                                 | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                     |
| updated_at  | DATETIME                                 | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp                  |

#### 4.9. `workout_sessions`

| Column Name      | Data Type                                  | Constraints                                     | Description                            |
| ---------------- | ------------------------------------------ | ----------------------------------------------- | -------------------------------------- |
| session_id       | BIGINT                                     | PRIMARY KEY, AUTO_INCREMENT                     | Unique identifier for the workout session |
| plan_id          | BIGINT                                     | FOREIGN KEY (workout_plans.plan_id), NOT NULL   | Reference to the workout plan          |
| session_name     | VARCHAR(100)                               | NOT NULL                                        | Name of the session                    |
| description      | TEXT                                       |                                                 | Description of the session             |
| day_of_week      | ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') |       | Day of week for the session            |
| scheduled_date   | DATE                                       |                                                 | Scheduled date for the session         |
| completed_date   | DATE                                       |                                                 | Date when session was completed        |
| session_status   | ENUM('PLANNED', 'COMPLETED', 'SKIPPED')    | NOT NULL, DEFAULT 'PLANNED'                    | Status of the session                  |
| notes            | TEXT                                       |                                                 | Additional notes                       |

#### 4.10. `workout_exercises`

| Column Name         | Data Type    | Constraints                                              | Description                                    |
| ------------------- | ------------ | -------------------------------------------------------- | ---------------------------------------------- |
| workout_exercise_id | BIGINT       | PRIMARY KEY, AUTO_INCREMENT                              | Unique identifier for the workout exercise     |
| session_id          | BIGINT       | FOREIGN KEY (workout_sessions.session_id), NOT NULL      | Reference to the workout session               |
| exercise_id         | BIGINT       | FOREIGN KEY (exercises.exercise_id), NOT NULL            | Reference to the exercise                      |
| sequence_number     | INTEGER      | NOT NULL                                                 | Order of exercise in workout                   |
| sets                | INTEGER      |                                                          | Number of sets                                 |
| reps                | VARCHAR(50)  |                                                          | Number of repetitions (can be a range)         |
| weight              | VARCHAR(50)  |                                                          | Weight to use (can be a range or "bodyweight") |
| duration            | VARCHAR(50)  |                                                          | Duration of the exercise                       |
| rest_period         | VARCHAR(50)  |                                                          | Rest period between sets                       |
| notes               | TEXT         |                                                          | Additional notes                               |
| actual_sets_completed | INTEGER    |                                                          | Actual number of sets completed                |

#### 4.11. `exercises`

| Column Name      | Data Type                                         | Constraints                  | Description                        |
| ---------------- | ------------------------------------------------- | ---------------------------- | ---------------------------------- |
| exercise_id      | BIGINT                                            | PRIMARY KEY, AUTO_INCREMENT  | Unique identifier for the exercise |
| exercise_name    | VARCHAR(100)                                      | NOT NULL                     | Name of the exercise               |
| description      | TEXT                                              |                              | Description of the exercise        |
| category         | ENUM('STRENGTH', 'CARDIO', 'FLEXIBILITY', 'BALANCE', 'FUNCTIONAL') | NOT NULL | Category of exercise               |
| difficulty_level | ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED')      | NOT NULL                     | Difficulty level                   |
| instructions     | TEXT                                              |                              | Exercise instructions              |
| demo_video_url   | VARCHAR(255)                                      |                              | URL to a demonstration video       |
| image_url        | VARCHAR(255)                                      |                              | URL to an image                    |
| target_muscles   | VARCHAR(255)                                      |                              | Targeted muscle groups             |
| is_active        | BOOLEAN                                           | NOT NULL, DEFAULT TRUE       | Whether the exercise is active     |

### 5. Booking Management

#### 5.1. `bookings`

| Column Name     | Data Type                                               | Constraints                                             | Description                                   |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------- |
| booking_id      | BIGINT                                                  | PRIMARY KEY, AUTO_INCREMENT                             | Unique identifier for the booking             |
| user_id         | BIGINT                                                  | FOREIGN KEY (users.user_id), NOT NULL                   | Reference to the user                         |
| booking_type    | ENUM('GYM_SESSION', 'PT_SESSION', 'CLASS')              | NOT NULL                                                | Type of booking                               |
| start_datetime  | DATETIME                                                | NOT NULL                                                | Start date and time                           |
| end_datetime    | DATETIME                                                | NOT NULL                                                | End date and time                             |
| trainer_id      | BIGINT                                                  | FOREIGN KEY (trainer_profiles.trainer_id)               | Reference to the trainer (for PT sessions)    |
| class_schedule_id | BIGINT                                                | FOREIGN KEY (class_schedules.schedule_id)               | Reference to the class schedule (for classes) |
| status          | ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW') | NOT NULL, DEFAULT 'PENDING'               | Status of the booking                         |
| notes           | TEXT                                                    |                                                         | Additional notes                              |
| created_at      | DATETIME                                                | NOT NULL, DEFAULT CURRENT_TIMESTAMP                     | Creation timestamp                            |
| updated_at      | DATETIME                                                | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp                         |
| location        | VARCHAR(255)                                            |                                                         | Location of the booking                       |

#### 5.2. `pt_sessions`

| Column Name     | Data Type    | Constraints                                                     | Description                          |
| --------------- | ------------ | --------------------------------------------------------------- | ------------------------------------ |
| session_id      | BIGINT       | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the PT session |
| booking_id      | BIGINT       | FOREIGN KEY (bookings.booking_id), NOT NULL                     | Reference to the booking             |
| user_package_id | BIGINT       | FOREIGN KEY (user_pt_packages.user_package_id), NOT NULL        | Reference to the user's PT package   |
| session_number  | INTEGER      |                                                                 | Session number within the package    |
| session_focus   | VARCHAR(255) |                                                                 | Focus area for this session          |
| session_notes   | TEXT         |                                                                 | Notes for this session               |
| feedback        | TEXT         |                                                                 | Trainer's feedback after the session |
| rating          | INTEGER      |                                                                 | User's rating (1-5)                  |
| user_comments   | TEXT         |                                                                 | User's comments after the session    |
| created_at      | DATETIME     | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                   |
| updated_at      | DATETIME     | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp                |

#### 5.3. `attendance_logs`

| Column Name      | Data Type | Constraints                               | Description                              |
| ---------------- | --------- | ----------------------------------------- | ---------------------------------------- |
| log_id           | BIGINT    | PRIMARY KEY, AUTO_INCREMENT               | Unique identifier for the log            |
| user_id          | BIGINT    | FOREIGN KEY (users.user_id), NOT NULL     | Reference to the user                    |
| location         | VARCHAR(255) | NOT NULL                               | Location of check-in                     |
| check_in_time    | DATETIME  | NOT NULL                                  | Check-in time                            |
| check_out_time   | DATETIME  |                                           | Check-out time                           |
| duration_minutes | INTEGER   |                                           | Duration of stay in minutes              |
| booking_id       | BIGINT    | FOREIGN KEY (bookings.booking_id)         | Reference to the booking (if applicable) |
| created_at       | DATETIME  | NOT NULL, DEFAULT CURRENT_TIMESTAMP       | Creation timestamp                       |

### 6. Class Management

#### 6.1. `class_types`

| Column Name      | Data Type    | Constraints                                                     | Description                          |
| ---------------- | ------------ | --------------------------------------------------------------- | ------------------------------------ |
| class_type_id    | BIGINT       | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the class type |
| type_name        | VARCHAR(100) | NOT NULL                                                        | Name of the class type               |
| description      | VARCHAR(1000)|                                                                 | Description of the class type        |
| duration_minutes | INTEGER      | NOT NULL                                                        | Standard duration in minutes         |
| max_capacity     | INTEGER      | NOT NULL                                                        | Maximum capacity of the class        |
| intensity        | VARCHAR(50)  |                                                                 | Intensity level                      |
| image_url        | VARCHAR(255) |                                                                 | URL to an image                      |
| is_active        | BOOLEAN      | NOT NULL, DEFAULT TRUE                                          | Whether the class type is active     |
| created_at       | DATETIME     | NOT NULL                                                        | Creation timestamp                   |
| updated_at       | DATETIME     |                                                                 | Last update timestamp                |

#### 6.2. `class_schedules`

| Column Name          | Data Type                                     | Constraints                                 | Description                              |
| -------------------- | --------------------------------------------- | ------------------------------------------- | ---------------------------------------- |
| schedule_id          | BIGINT                                        | PRIMARY KEY, AUTO_INCREMENT                 | Unique identifier for the class schedule |
| class_type_id        | BIGINT                                        | FOREIGN KEY (class_types.class_type_id), NOT NULL | Reference to the class type        |
| trainer_id           | BIGINT                                        | FOREIGN KEY (trainer_profiles.trainer_id), NOT NULL | Reference to the trainer           |
| start_time           | DATETIME                                      | NOT NULL                                    | Start date and time                      |
| end_time             | DATETIME                                      | NOT NULL                                    | End date and time                        |
| status               | ENUM('SCHEDULED', 'CANCELLED', 'COMPLETED')   | NOT NULL, DEFAULT 'SCHEDULED'              | Status of the class                      |
| max_attendees        | INTEGER                                       |                                             | Maximum number of attendees              |
| notes                | TEXT                                          |                                             | Additional notes                         |
| cancellation_reason  | VARCHAR(255)                                  |                                             | Reason for cancellation                  |
| created_at           | DATETIME                                      | NOT NULL                                    | Creation timestamp                       |
| updated_at           | DATETIME                                      |                                             | Last update timestamp                    |

#### 6.3. `class_bookings`

| Column Name       | Data Type                                    | Constraints                                         | Description                             |
| ----------------- | -------------------------------------------- | --------------------------------------------------- | --------------------------------------- |
| booking_id        | BIGINT                                       | PRIMARY KEY, AUTO_INCREMENT                         | Unique identifier for the class booking |
| user_id           | BIGINT                                       | FOREIGN KEY (users.user_id), NOT NULL               | Reference to the user                   |
| schedule_id       | BIGINT                                       | FOREIGN KEY (class_schedules.schedule_id), NOT NULL | Reference to the class schedule         |
| booking_time      | DATETIME                                     | NOT NULL                                            | Time when the booking was made          |
| status            | ENUM('CONFIRMED', 'CANCELLED', 'ATTENDED')   | NOT NULL, DEFAULT 'CONFIRMED'                       | Status of the booking                   |
| attended          | BOOLEAN                                      | DEFAULT FALSE                                        | Whether the user attended               |
| cancellation_reason | VARCHAR(255)                               |                                                     | Reason for cancellation                 |
| cancellation_time | DATETIME                                     |                                                     | Time of cancellation                    |

#### 6.4. `class_ratings`

| Column Name    | Data Type    | Constraints                                     | Description                            |
| -------------- | ------------ | ----------------------------------------------- | -------------------------------------- |
| rating_id      | BIGINT       | PRIMARY KEY, AUTO_INCREMENT                     | Unique identifier for the rating       |
| user_id        | BIGINT       | FOREIGN KEY (users.user_id), NOT NULL           | Reference to the user                  |
| schedule_id    | BIGINT       | FOREIGN KEY (class_schedules.schedule_id), NOT NULL | Reference to the class schedule   |
| booking_id     | BIGINT       | FOREIGN KEY (bookings.booking_id)               | Reference to the booking               |
| rating         | INTEGER      | NOT NULL                                        | Rating value (typically 1-5)           |
| review_text    | TEXT         |                                                 | Text review                            |
| is_anonymous   | BOOLEAN      | NOT NULL, DEFAULT FALSE                         | Whether the review is anonymous        |
| created_at     | DATETIME     | NOT NULL, DEFAULT CURRENT_TIMESTAMP             | Creation timestamp                     |

### 7. Notification System

#### 7.1. `notification_settings`

| Column Name             | Data Type | Constraints                                                     | Description                                        |
| ----------------------- | --------- | --------------------------------------------------------------- | -------------------------------------------------- |
| setting_id              | BIGINT    | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the setting                  |
| user_id                 | BIGINT    | FOREIGN KEY (users.user_id), NOT NULL                           | Reference to the user                              |
| email_notifications     | BOOLEAN   | NOT NULL, DEFAULT TRUE                                          | Whether to send email notifications                |
| sms_notifications       | BOOLEAN   | NOT NULL, DEFAULT FALSE                                         | Whether to send SMS notifications                  |
| push_notifications      | BOOLEAN   | NOT NULL, DEFAULT TRUE                                          | Whether to send push notifications                 |
| booking_reminders       | BOOLEAN   | NOT NULL, DEFAULT TRUE                                          | Whether to send booking reminders                  |
| class_notifications     | BOOLEAN   | NOT NULL, DEFAULT TRUE                                          | Whether to send class notifications                |
| marketing_notifications | BOOLEAN   | NOT NULL, DEFAULT TRUE                                          | Whether to send marketing notifications            |
| reminder_time           | INTEGER   | DEFAULT 60                                                      | Time before appointment to send reminder (minutes) |

#### 7.2. `notifications`

| Column Name     | Data Type                                           | Constraints                         | Description                               |
| --------------- | --------------------------------------------------- | ----------------------------------- | ----------------------------------------- |
| notification_id | BIGINT                                              | PRIMARY KEY, AUTO_INCREMENT         | Unique identifier for the notification    |
| user_id         | BIGINT                                              | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user                   |
| notification_type | ENUM('MEMBERSHIP', 'BOOKING', 'REMINDER', 'ANNOUNCEMENT', 'PROMOTION', 'PT_SESSION', 'CLASS', 'PAYMENT', 'SYSTEM') | NOT NULL | Type of notification |
| title           | VARCHAR(255)                                        | NOT NULL                            | Title of the notification                 |
| message         | TEXT                                                | NOT NULL                            | Content of the notification               |
| link            | VARCHAR(255)                                        |                                     | Related link                              |
| is_read         | BOOLEAN                                             | NOT NULL, DEFAULT FALSE             | Whether the notification has been read    |
| is_deleted      | BOOLEAN                                             | NOT NULL, DEFAULT FALSE             | Whether the notification has been deleted |
| sent_at         | DATETIME                                            | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Time when the notification was sent       |
| read_at         | DATETIME                                            |                                     | Time when the notification was read       |

### 8. Payment System

#### 8.1. `payment_methods`

| Column Name | Data Type    | Constraints                 | Description                              |
| ----------- | ------------ | --------------------------- | ---------------------------------------- |
| method_id   | BIGINT       | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for the payment method |
| method_name | VARCHAR(100) | NOT NULL                    | Name of the payment method               |
| description | TEXT         |                             | Description of the payment method        |
| is_active   | BOOLEAN      | NOT NULL, DEFAULT TRUE      | Whether the payment method is active     |

#### 8.2. `user_payment_methods`

| Column Name     | Data Type    | Constraints                                                     | Description                                   |
| --------------- | ------------ | --------------------------------------------------------------- | --------------------------------------------- |
| user_method_id  | BIGINT       | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the user payment method |
| user_id         | BIGINT       | FOREIGN KEY (users.user_id), NOT NULL                           | Reference to the user                         |
| method_id       | BIGINT       | FOREIGN KEY (payment_methods.method_id), NOT NULL               | Reference to the payment method               |
| card_last_four  | VARCHAR(4)   |                                                                 | Last four digits of the card                  |
| card_expiry     | VARCHAR(7)   |                                                                 | Card expiry date (MM/YYYY)                    |
| card_type       | VARCHAR(50)  |                                                                 | Type of card                                  |
| billing_address | TEXT         |                                                                 | Billing address                               |
| is_default      | BOOLEAN      | NOT NULL, DEFAULT FALSE                                         | Whether this is the default payment method    |
| token           | VARCHAR(255) |                                                                 | Payment provider token                        |
| created_at      | DATETIME     | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                            |
| updated_at      | DATETIME     | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp                         |

#### 8.3. `invoices`

| Column Name     | Data Type                                                                             | Constraints                                                     | Description                          |
| --------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------ |
| invoice_id      | BIGINT                                                                                | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the invoice    |
| user_id         | BIGINT                                                                                | FOREIGN KEY (users.user_id), NOT NULL                           | Reference to the user                |
| invoice_number  | VARCHAR(50)                                                                           | UNIQUE, NOT NULL                                                | Invoice number                       |
| issue_date      | DATE                                                                                  | NOT NULL                                                        | Issue date                           |
| due_date        | DATE                                                                                  | NOT NULL                                                        | Due date                             |
| amount          | DECIMAL(10,2)                                                                         | NOT NULL                                                        | Total amount                         |
| tax_amount      | DECIMAL(10,2)                                                                         | NOT NULL, DEFAULT 0                                             | Tax amount                           |
| discount_amount | DECIMAL(10,2)                                                                         | NOT NULL, DEFAULT 0                                             | Discount amount                      |
| final_amount    | DECIMAL(10,2)                                                                         | NOT NULL                                                        | Final amount after tax and discounts |
| status          | ENUM('DRAFT', 'ISSUED', 'PAID', 'PARTIALLY_PAID', 'OVERDUE', 'CANCELLED', 'REFUNDED') | NOT NULL, DEFAULT 'DRAFT'                                       | Status of the invoice                |
| notes           | TEXT                                                                                  |                                                                 | Additional notes                     |
| created_by      | BIGINT                                                                                | FOREIGN KEY (users.user_id), NOT NULL                           | Staff who created the invoice        |
| created_at      | DATETIME                                                                              | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                   |
| updated_at      | DATETIME                                                                              | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp                |

#### 8.4. `payments`

| Column Name     | Data Type                                                          | Constraints                              | Description                           |
| --------------- | ------------------------------------------------------------------ | ---------------------------------------- | ------------------------------------- |
| payment_id      | BIGINT                                                             | PRIMARY KEY, AUTO_INCREMENT              | Unique identifier for the payment     |
| user_id         | BIGINT                                                             | FOREIGN KEY (users.user_id), NOT NULL    | Reference to the user                 |
| payment_type    | ENUM('MEMBERSHIP', 'PT_PACKAGE', 'PRODUCT', 'SERVICE', 'REFUND', 'OTHER') | NOT NULL                         | Type of payment                       |
| reference_id    | BIGINT                                                             |                                          | Reference to related entity           |
| amount          | DECIMAL(10,2)                                                      | NOT NULL                                 | Payment amount                        |
| currency        | VARCHAR(3)                                                         | NOT NULL, DEFAULT 'VND'                  | Currency code                         |
| payment_date    | DATETIME                                                           | NOT NULL                                 | Date and time of the payment          |
| payment_status  | ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED')    | NOT NULL                                 | Status of the payment                 |
| payment_method  | ENUM('CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'E_WALLET', 'OTHER') | NOT NULL                | Payment method used                   |
| transaction_id  | VARCHAR(100)                                                       |                                          | Transaction ID from payment processor |
| payment_details | TEXT                                                               |                                          | Additional payment details            |
| processed_by    | BIGINT                                                             | FOREIGN KEY (users.user_id)              | Staff who processed the payment       |
| notes           | TEXT                                                               |                                          | Additional notes                      |
| created_at      | DATETIME                                                           | NOT NULL, DEFAULT CURRENT_TIMESTAMP      | Creation timestamp                    |
| updated_at      | DATETIME                                                           | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

### 9. System Management

#### 9.1. `operation_hours`

| Column Name  | Data Type                                                                          | Constraints                 | Description                              |
| ------------ | ---------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------- |
| operation_id | BIGINT                                                                             | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for operation hours    |
| location     | VARCHAR(255)                                                                       | NOT NULL                    | Location identifier                      |
| day_of_week  | ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') | NOT NULL                    | Day of week                              |
| opening_time | TIME                                                                               | NOT NULL                    | Opening time                             |
| closing_time | TIME                                                                               | NOT NULL                    | Closing time                             |
| is_closed    | BOOLEAN                                                                            | NOT NULL, DEFAULT FALSE     | Whether location is closed on this day   |
| special_date | DATE                                                                               |                             | Special date for one-time schedule       |

#### 9.2. `system_metrics`

| Column Name        | Data Type     | Constraints                         | Description                              |
| ------------------ | ------------- | ----------------------------------- | ---------------------------------------- |
| metric_id          | BIGINT        | PRIMARY KEY, AUTO_INCREMENT         | Unique identifier for the metric         |
| location           | VARCHAR(255)  | NOT NULL                            | Location identifier                      |
| metric_date        | DATE          | NOT NULL                            | Date of the metric                       |
| total_visitors     | INTEGER       | NOT NULL, DEFAULT 0                 | Total number of visitors                 |
| new_members        | INTEGER       | NOT NULL, DEFAULT 0                 | Number of new members                    |
| total_bookings     | INTEGER       | NOT NULL, DEFAULT 0                 | Total number of bookings                 |
| class_bookings     | INTEGER       | NOT NULL, DEFAULT 0                 | Number of class bookings                 |
| pt_bookings        | INTEGER       | NOT NULL, DEFAULT 0                 | Number of personal training bookings     |
| membership_sales   | DECIMAL(10,2) | NOT NULL, DEFAULT 0                 | Sales from memberships                   |
| pt_package_sales   | DECIMAL(10,2) | NOT NULL, DEFAULT 0                 | Sales from personal training packages    |
| other_sales        | DECIMAL(10,2) | NOT NULL, DEFAULT 0                 | Sales from other sources                 |
| total_revenue      | DECIMAL(10,2) | NOT NULL, DEFAULT 0                 | Total revenue                            |
| updated_at         | DATETIME      | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Last update timestamp                    |

#### 9.3. `announcements`

| Column Name       | Data Type                                                                                   | Constraints                                                     | Description                          |
| ----------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------ |
| announcement_id   | BIGINT                                                                                      | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for announcement   |
| title             | VARCHAR(255)                                                                                | NOT NULL                                                        | Title of the announcement            |
| content           | TEXT                                                                                        | NOT NULL                                                        | Content of the announcement          |
| announcement_type | ENUM('GENERAL', 'MAINTENANCE', 'EVENT', 'PROMOTION', 'HOLIDAY', 'EMERGENCY', 'POLICY_CHANGE') | NOT NULL                                                    | Type of announcement                 |
| start_date        | DATETIME                                                                                    | NOT NULL                                                        | Start date of the announcement       |
| end_date          | DATETIME                                                                                    |                                                                 | End date of the announcement         |
| is_active         | BOOLEAN                                                                                     | NOT NULL, DEFAULT TRUE                                          | Whether announcement is active       |
| created_by        | BIGINT                                                                                      | FOREIGN KEY (users.user_id), NOT NULL                           | User who created the announcement    |
| created_at        | DATETIME                                                                                    | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                   |
| updated_at        | DATETIME                                                                                    | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp                |

#### 9.4. `activity_logs`

| Column Name    | Data Type                                                                                                 | Constraints                         | Description                          |
| -------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------ |
| log_id         | BIGINT                                                                                                    | PRIMARY KEY, AUTO_INCREMENT         | Unique identifier for the log        |
| user_id        | BIGINT                                                                                                    | FOREIGN KEY (users.user_id), NOT NULL | Reference to the user              |
| activity_type  | ENUM('LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'VIEW', 'EXPORT', 'IMPORT', 'PAYMENT', 'BOOKING', 'CHECK_IN', 'CHECK_OUT', 'OTHER') | NOT NULL | Type of activity |
| description    | VARCHAR(255)                                                                                              | NOT NULL                            | Description of the activity          |
| entity_type    | VARCHAR(50)                                                                                               |                                     | Type of related entity               |
| entity_id      | BIGINT                                                                                                    |                                     | ID of related entity                 |
| ip_address     | VARCHAR(50)                                                                                               |                                     | IP address                           |
| user_agent     | VARCHAR(255)                                                                                              |                                     | User agent information               |
| activity_time  | DATETIME                                                                                                  | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Time of the activity                 |

#### 9.5. `user_activity_metrics`

| Column Name | Data Type | Constraints                                                     | Description                               |
| ----------- | --------- | --------------------------------------------------------------- | ----------------------------------------- |
| metric_id   | BIGINT    | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the activity metric |
| user_id     | BIGINT    | FOREIGN KEY (users.user_id), NOT NULL                           | Reference to the user                    |
| metric_date | DATE      | NOT NULL                                                        | Date of the metric                       |
| visits      | INTEGER   | DEFAULT 0                                                       | Number of visits                         |
| workouts    | INTEGER   | DEFAULT 0                                                       | Number of workouts                       |
| classes     | INTEGER   | DEFAULT 0                                                       | Number of classes attended               |
| pt_sessions | INTEGER   | DEFAULT 0                                                       | Number of PT sessions attended           |
| duration    | INTEGER   | DEFAULT 0                                                       | Total duration in minutes                |
| created_at  | DATETIME  | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                       |
| updated_at  | DATETIME  | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp                    |

#### 9.6. `feedback`

| Column Name    | Data Type                                          | Constraints                                 | Description                               |
| -------------- | -------------------------------------------------- | ------------------------------------------- | ----------------------------------------- |
| feedback_id    | BIGINT                                             | PRIMARY KEY, AUTO_INCREMENT                 | Unique identifier for the feedback        |
| user_id        | BIGINT                                             | FOREIGN KEY (users.user_id), NOT NULL       | Reference to the user                    |
| feedback_type  | ENUM('GENERAL', 'CLASS', 'TRAINER', 'STAFF', 'OTHER') | NOT NULL                                | Type of feedback                          |
| subject        | VARCHAR(255)                                       | NOT NULL                                    | Subject of the feedback                   |
| message        | TEXT                                               | NOT NULL                                    | Feedback content                          |
| rating         | INTEGER                                            |                                             | Rating value (typically 1-5)              |
| trainer_id     | BIGINT                                             | FOREIGN KEY (trainer_profiles.trainer_id)   | Reference to the trainer (if applicable)  |
| class_id       | BIGINT                                             | FOREIGN KEY (class_schedules.schedule_id)   | Reference to the class (if applicable)    |
| is_anonymous   | BOOLEAN                                            | NOT NULL, DEFAULT FALSE                     | Whether the feedback is anonymous         |
| status         | ENUM('PENDING', 'RESPONDED', 'RESOLVED', 'CLOSED') | NOT NULL, DEFAULT 'PENDING'                | Status of the feedback                    |
| response       | TEXT                                               |                                             | Response to the feedback                  |
| responded_by   | BIGINT                                             | FOREIGN KEY (users.user_id)                 | User who responded to the feedback        |
| response_date  | DATETIME                                           |                                             | Date and time of the response             |
| created_at     | DATETIME                                           | NOT NULL, DEFAULT CURRENT_TIMESTAMP         | Creation timestamp                        |

#### 9.7. `referrals`

| Column Name    | Data Type                                     | Constraints                                                     | Description                             |
| -------------- | --------------------------------------------- | --------------------------------------------------------------- | --------------------------------------- |
| referral_id    | BIGINT                                        | PRIMARY KEY, AUTO_INCREMENT                                     | Unique identifier for the referral      |
| referrer_id    | BIGINT                                        | FOREIGN KEY (users.user_id), NOT NULL                           | User who made the referral              |
| referred_id    | BIGINT                                        | FOREIGN KEY (users.user_id)                                     | User who was referred                   |
| referral_code  | VARCHAR(50)                                   | NOT NULL                                                        | Referral code                           |
| referral_date  | DATETIME                                      |                                                                 | Date the referral was made              |
| signup_date    | DATETIME                                      |                                                                 | Date the referred person signed up      |
| status         | ENUM('PENDING', 'REGISTERED', 'CONVERTED', 'EXPIRED') | NOT NULL, DEFAULT 'PENDING'                            | Status of the referral                  |
| reward_status  | ENUM('PENDING', 'ISSUED', 'CLAIMED')          |                                                                 | Status of the reward                    |
| reward_details | VARCHAR(255)                                  |                                                                 | Details about the reward                |
| notes          | TEXT                                          |                                                                 | Additional notes                        |
| created_at     | DATETIME                                      | NOT NULL, DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp                      |
| updated_at     | DATETIME                                      | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp                   |
