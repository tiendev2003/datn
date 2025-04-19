```mermaid
erDiagram

    EMPLOYEE ||--o{ EMPLOYEE_COURSE : participates
    COURSE ||--o{ EMPLOYEE_COURSE : has

    LECTURER ||--o{ LECTURER_COURSE : teaches
    COURSE ||--o{ LECTURER_COURSE : has

    EMPLOYEE }o--|| DEPARTMENT : belongs_to

    COURSE }o--|| TRAINING_CENTER : organized_at

    EMPLOYEE {
        string employee_id PK
        string name
        string specialty
        string position
        string department_id FK
    }

    DEPARTMENT {
        string department_id PK
        string name
    }

    COURSE {
        string course_id PK
        string name
        date start_date
        date end_date
        float cost
        string training_center_id FK (nullable)
        string organization_type  // internal, external, linked
    }

    TRAINING_CENTER {
        string training_center_id PK
        string name
        string address
    }

    LECTURER {
        string lecturer_id PK
        string name
        string expertise
    }

    LECTURER_COURSE {
        string lecturer_id FK
        string course_id FK
        float guest_fee
    }

    EMPLOYEE_COURSE {
        string employee_id FK
        string course_id FK
    }

```
