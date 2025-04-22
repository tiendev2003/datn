-- V23__insert_fake_pt_packages.sql
INSERT INTO
    pt_packages (
        package_name,
        description,
        number_of_sessions,
        validity_days,
        price,
        discount_percentage,
        is_active,
        created_at,
        updated_at
    )
VALUES (
        'Basic PT Package',
        'Provides 10 personal training sessions valid over 30 days.',
        10,
        30,
        500.00,
        0.00,
        TRUE,
        NOW(),
        NOW()
    ),
    (
        'Standard PT Package',
        'Includes 20 personal training sessions valid over 60 days with 10% discount.',
        20,
        60,
        900.00,
        10.00,
        TRUE,
        NOW(),
        NOW()
    ),
    (
        'Premium PT Package',
        '30 sessions over 90 days with 15% discount and priority scheduling.',
        30,
        90,
        1200.00,
        15.00,
        TRUE,
        NOW(),
        NOW()
    ),
    (
        'Ultimate PT Package',
        '50 sessions over 180 days with 20% discount and free nutrition plan.',
        50,
        180,
        1800.00,
        20.00,
        TRUE,
        NOW(),
        NOW()
    ),
    (
        'Starter PT Package',
        '5 sessions over 15 days for beginners.',
        5,
        15,
        250.00,
        0.00,
        FALSE,
        NOW(),
        NOW()
    );