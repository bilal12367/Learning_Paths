package com.example.app_service.dto.rbac;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ServerUserDTO {
    private String serverId;
    private String userId;
}
