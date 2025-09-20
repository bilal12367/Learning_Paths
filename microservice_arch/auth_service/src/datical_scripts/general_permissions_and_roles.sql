


insert into permissions (id, name, description, serverId) VALUES(1, 'GENERAL_ACCESS', 'General Access permission', 'global');
insert into permissions (id, name, description, serverId) VALUES(2, 'MANAGE_USERS', 'Admin Access to manage general users', 'global');
insert into permissions (id, name, description, serverId) VALUES(3, 'MANAGE_ROLES', 'Admin Access to manage roles of general users ', 'global');
insert into permissions (id, name, description, serverId) VALUES(4, 'MANAGE_PERMISSIONS', 'Root level Access to define permissions', 'global');

insert into roles (id, name, description, serverId) VALUES(1, 'USER', 'General User', 'global');
insert into roles (id, name, description, serverId) VALUES(2, 'ADMIN', 'Admin', 'global');
insert into roles (id, name, description, serverId) VALUES(3, 'ROOT', 'Root User has all access', 'global');


insert into role_permissions(id, roleId, `serverId`, permissionId) VALUES(1, 1, 'global', 1);
insert into role_permissions(id, roleId, `serverId`, permissionId) VALUES(2, 2, 'global', 1);
insert into role_permissions(id, roleId, `serverId`, permissionId) VALUES(3, 2, 'global', 2);
insert into role_permissions(id, roleId, `serverId`, permissionId) VALUES(4, 3, 'global', 1);
insert into role_permissions(id, roleId, `serverId`, permissionId) VALUES(5, 3, 'global', 2);
insert into role_permissions(id, roleId, `serverId`, permissionId) VALUES(6, 3, 'global', 3);
insert into role_permissions(id, roleId, `serverId`, permissionId) VALUES(7, 3, 'global', 4);

