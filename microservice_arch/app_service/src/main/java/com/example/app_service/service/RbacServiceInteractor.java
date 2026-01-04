package com.example.app_service.service;

import java.util.List;

import com.example.app_service.dto.rbac.Permission;
import com.example.app_service.dto.rbac.Role;
import com.example.app_service.dto.rbac.RolePermission;
import com.example.app_service.models.Channel;



interface RbacServiceInteractorInterface {
    public List<Role> getGeneralRolesList();
    public List<Permission> getGeneralPermissionsList();
    // public List<Channel> getGeneralChannelsList();
    public List<Role> createRoles(List<String> names);
    public List<Permission> createPermissions(List<String> names);
    public List<RolePermission> assignPermissionsToRole(String roleId, List<String> permissionIds);
    public List<RolePermission> getPermissionsByRoleId(String roleId);
    public List<RolePermission> removePermissionsFromRole(String roleId, List<String> permissionIds);
    public boolean deleteRoleById(String roleId);
    public boolean deletePermissionById(String permissionId);
    
}


public class RbacServiceInteractor implements RbacServiceInteractorInterface {

    @Override
    public List<Role> getGeneralRolesList() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Permission> getGeneralPermissionsList() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Channel> getGeneralChannelsList() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Role> createRoles(List<String> names) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Permission> createPermissions(List<String> names) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<RolePermission> assignPermissionsToRole(String roleId, List<String> permissionIds) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<RolePermission> getPermissionsByRoleId(String roleId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<RolePermission> removePermissionsFromRole(String roleId, List<String> permissionIds) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public boolean deleteRoleById(String roleId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public boolean deletePermissionById(String permissionId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
}
