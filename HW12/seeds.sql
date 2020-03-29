INSERT INTO department (name) 
VALUES("Front-House"), ("Back-House"), ("Management");

INSERT INTO role (title, salary, title_id)
VALUES ("cashier", 25000, 1), ("server", 50000, 2), ("host", 20000, 3),("cook", 35000, 4);

INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id)
VALUES("John", "Doe", 2, null), ("Casey", "Brick", 3, 2);