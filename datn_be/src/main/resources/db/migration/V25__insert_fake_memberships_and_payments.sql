-- V25__insert_fake_memberships_and_payments.sql

-- Membership Types
INSERT INTO membership_types (type_name, description, duration_days, price, discount_percentage, max_freeze_days, guest_passes, is_active, created_at, updated_at) VALUES
('Monthly Membership','Access to all gym facilities for 30 days',30,100.00,0,7,1,TRUE,NOW(),NOW()),
('Annual Membership','Unlimited access for 365 days',365,1000.00,10,30,5,TRUE,NOW(),NOW());

-- Membership Benefits
INSERT INTO membership_benefits (benefit_name, description, icon) VALUES
('Free Towel','Complimentary towel service','towel-icon.png'),
('Pool Access','Unlimited swimming pool access','pool-icon.png');

-- Map Benefits to Types
INSERT INTO membership_type_benefits (membership_type_id, benefit_id) VALUES
(1,1),(1,2),(2,1),(2,2);

-- User Memberships
INSERT INTO memberships (user_id, membership_type_id, start_date, end_date, membership_status, payment_status, actual_price, freeze_days_used, remaining_guest_passes, issued_by, created_at, updated_at) VALUES
(1,1,CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY),'Active','Paid',100.00,0,1,3,NOW(),NOW()),
(2,2,CURDATE(), DATE_ADD(CURDATE(), INTERVAL 365 DAY),'Active','Paid',900.00,0,5,3,NOW(),NOW());

-- Membership Renewal
INSERT INTO membership_renewals (membership_id, previous_end_date, new_end_date, renewal_date, renewal_price, payment_status, processed_by, notes) VALUES
(1, DATE_ADD(CURDATE(), INTERVAL -30 DAY), DATE_ADD(CURDATE(), INTERVAL 30 DAY), NOW(), 100.00, 'Paid', 3, 'Auto-renewal');

-- Payment Methods
INSERT INTO payment_methods (method_name, description, is_active) VALUES
('Credit Card','Visa/MasterCard payment',TRUE),
('Cash','Pay by cash at front desk',TRUE);

-- User Payment Methods
INSERT INTO user_payment_methods (user_id, method_id, card_last_four, card_expiry, card_type, billing_address, is_default, token, created_at, updated_at) VALUES
(1,1,'1234','12/2025','Visa','123 Main St',TRUE,'tok_visa_123',NOW(),NOW());

-- Invoices and Items
INSERT INTO invoices (user_id, invoice_number, issue_date, due_date, amount, tax_amount, discount_amount, final_amount, status, created_by, created_at, updated_at) VALUES
(1,'INV-1001',CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY),100.00,0.00,0.00,100.00,'Issued',3,NOW(),NOW()),
(2,'INV-1002',CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY),900.00,0.00,100.00,800.00,'Issued',3,NOW(),NOW());

INSERT INTO invoice_items (invoice_id, item_type, description, quantity, unit_price, tax_percentage, discount_percentage, total_amount) VALUES
((SELECT invoice_id FROM invoices WHERE invoice_number='INV-1001'), 'Membership','Monthly Membership',1,100.00,0.00,0.00,100.00),
((SELECT invoice_id FROM invoices WHERE invoice_number='INV-1002'), 'Membership','Annual Membership',1,1000.00,0.00,10.00,900.00);

-- Payments
INSERT INTO payments (invoice_id, user_id, payment_date, amount, payment_method_id, transaction_id, payment_status, processed_by, notes, created_at, updated_at) VALUES
((SELECT invoice_id FROM invoices WHERE invoice_number='INV-1001'),1,NOW(),100.00,1,'txn_001','Completed',3,NULL,NOW(),NOW()),
((SELECT invoice_id FROM invoices WHERE invoice_number='INV-1002'),2,NOW(),800.00,1,'txn_002','Completed',3,NULL,NOW(),NOW());

-- Refunds
INSERT INTO refunds (payment_id, refund_date, amount, refund_reason, transaction_id, refund_status, processed_by, notes, created_at) VALUES
((SELECT payment_id FROM payments WHERE transaction_id='txn_002'), NOW(),100.00,'Promotional refund','rfnd_001','Completed',3,'Applied promo refund',NOW());