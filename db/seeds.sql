INSERT INTO department (name) 
VALUES ('sales'),
 ('human resources'), 
 ('finance');

INSERT INTO role (title, salary, department_id) 
VALUES ('sales team lead', 80000, 1),
('sales person', 60000, 1),
('hr manager', 90000, 2),
('benefits administrator', 70000, 2),
('lead analyst', 120000, 3),
('analyst', 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Heesu', 'Ahn', 1, NULL),
('Jane', 'Doe', 2, 1),
('William', 'Holloway', 3, NULL),
('Jonathon', 'Rigsby', 4, 3),
('Eleanor', 'Davis', 5, NULL),
('Helen', 'Smith', 6, 5);
