package com.example.app_service.dto.rbac;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    private String id;
    private String name;
    private String description;
    private String association_id;
}
