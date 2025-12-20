package com.example.app_service.dto.rbac;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Permission {
    private String id;
    private String name;
    private String association_id;
}
