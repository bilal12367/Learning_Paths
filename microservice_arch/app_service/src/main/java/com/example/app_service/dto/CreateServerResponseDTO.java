package com.example.app_service.dto;

import com.example.app_service.dto.rbac.AssociationRbacDto;
import com.example.app_service.models.Server;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CreateServerResponseDTO {
    
    private Server server;
    private AssociationRbacDto rbacDetails;
}
