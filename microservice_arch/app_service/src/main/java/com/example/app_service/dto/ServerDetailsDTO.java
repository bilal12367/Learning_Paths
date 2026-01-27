package com.example.app_service.dto;

import java.util.List;

import com.example.app_service.models.Server;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ServerDetailsDTO {
    private String id;
    private Server server;
    private List<String> roleIds;
    private List<String> permissionIds;
    private List<String> channelIds;
    private List<String> resourceIds;
    
    
}
