package com.example.app_service.dto.rbac;


import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class AssociationRbacDto {

    private List<Permission> perms;
    private List<Role> roles;
    private List<User> users;
    private List<RolePermission> rolePermissionMapping;
    private List<UserRole> userRoleMapping;

}
