package com.example.app_service.dto.rbac;

import java.util.List;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;


@Builder
@Data
@ToString
public class AddRolesToAssociationDto {
    private String association_id;
    private List<String> role_ids;
}
