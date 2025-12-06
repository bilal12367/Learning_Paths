package com.example.app_service.dto.rbac;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Builder
@ToString
@Data
public class Role {
    private String id;
    private String name;
    private String description;
    private String association_id;
}
