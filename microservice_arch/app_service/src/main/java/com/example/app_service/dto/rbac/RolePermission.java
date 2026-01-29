package com.example.app_service.dto.rbac;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RolePermission {
    private String id;
    private String roleId;
    private String permissionId;
    private String associationId;
}
