package com.example.app_service.dto.rbac;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AssignPermissionsToRole {
    private String roleId;
    private List<String> permissionIds;
}
