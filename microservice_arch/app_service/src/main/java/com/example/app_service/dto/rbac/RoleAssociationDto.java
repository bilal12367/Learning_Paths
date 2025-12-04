package com.example.app_service.dto.rbac;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;


@Data
@Builder
@ToString
public class RoleAssociationDto {
    private String id;
    private String association_id;
    private String role_id;

}
