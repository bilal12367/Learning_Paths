create DATABASE IF not exists auth;
create DATABASE IF not exists background_tasks_db;

create DATABASE if not exists test;
create DATABASE if not exists app;

use auth;

CREATE TABLE IF NOT EXISTS permissions (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    association_id VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    association_id VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS role_permissions (
    id INT PRIMARY KEY,
    roleId INT NOT NULL,
    association_id VARCHAR(50) NOT NULL,
    permissionId INT NOT NULL,
    FOREIGN KEY (roleId) REFERENCES roles(id),
    FOREIGN KEY (permissionId) REFERENCES permissions(id)
);
insert into permissions (id, name, description, association_id) VALUES(1, 'GENERAL_ACCESS', 'General Access permission', 'global');
insert into permissions (id, name, description, association_id) VALUES(2, 'MANAGE_USERS', 'Admin Access to manage general users', 'global');
insert into permissions (id, name, description, association_id) VALUES(3, 'MANAGE_ROLES', 'Admin Access to manage roles of general users ', 'global');
insert into permissions (id, name, description, association_id) VALUES(4, 'MANAGE_PERMISSIONS', 'Root level Access to define permissions', 'global');

insert into roles (id, name, description, association_id) VALUES(1, 'USER', 'General User', 'global');
insert into roles (id, name, description, association_id) VALUES(2, 'ADMIN', 'Admin', 'global');
insert into roles (id, name, description, association_id) VALUES(3, 'ROOT', 'Root User has all access', 'global');


insert into role_permissions(id, roleId, `association_id`, permissionId) VALUES(1, 1, 'global', 1);
insert into role_permissions(id, roleId, `association_id`, permissionId) VALUES(2, 2, 'global', 1);
insert into role_permissions(id, roleId, `association_id`, permissionId) VALUES(3, 2, 'global', 2);
insert into role_permissions(id, roleId, `association_id`, permissionId) VALUES(4, 3, 'global', 1);
insert into role_permissions(id, roleId, `association_id`, permissionId) VALUES(5, 3, 'global', 2);
insert into role_permissions(id, roleId, `association_id`, permissionId) VALUES(6, 3, 'global', 3);
insert into role_permissions(id, roleId, `association_id`, permissionId) VALUES(7, 3, 'global', 4);

