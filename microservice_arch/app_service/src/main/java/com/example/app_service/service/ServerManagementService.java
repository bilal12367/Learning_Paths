package com.example.app_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app_service.dto.Entity;
import com.example.app_service.dto.ServerDetailsDTO;
import com.example.app_service.dto.rbac.BanUserDTO;
import com.example.app_service.dto.rbac.ChannelRolesMapping;
import com.example.app_service.dto.rbac.RolePermission;
import com.example.app_service.dto.rbac.ServerUserDTO;
import com.example.app_service.models.Server;
import com.example.app_service.repository.ServerRepository;



@Service
interface ServerManagementServiceInterface {

    String SERVICE_NAME = "ServerManagementService";
    
    org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(SERVICE_NAME);

    public ServerDetailsDTO createServer(Entity entity);
    public ServerDetailsDTO editServerDetails(Server server);
    public List<String> createChannels(List<Entity> entities);
    public List<String> createRoles(List<Entity> entities);
    public List<String> createPermissions(List<Entity> entities);
    public List<String> createResources(List<Entity> entities);

    public RolePermission assignPermissionToRole(String roleId, List<String> permissionIds);
    public ChannelRolesMapping assignRolesToChannel(String channelId, List<String> roleIds);
    public ServerUserDTO addUserToServer(String serverId, String userId, List<String> roleIds);
    public BanUserDTO banUserFromServer(String serverId, String userId, String reason, List<String> permissions);
}


public class ServerManagementService implements ServerManagementServiceInterface {


    @Autowired
    private RestClientService restClientService;

    @Autowired
    private ServerRepository serverRepository;
    

    @Override
    public ServerDetailsDTO createServer(Entity entity) {
        Server server = this.serverRepository.save(
            Server.builder()
                .name(entity.getName())
                .description(entity.getDescription())
                .build());
        server.getId();

        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public ServerDetailsDTO editServerDetails(Server server) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<String> createChannels(List<Entity> entities) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<String> createRoles(List<Entity> entities) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<String> createPermissions(List<Entity> entities) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<String> createResources(List<Entity> entities) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public RolePermission assignPermissionToRole(String roleId, List<String> permissionIds) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public ChannelRolesMapping assignRolesToChannel(String channelId, List<String> roleIds) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public ServerUserDTO addUserToServer(String serverId, String userId, List<String> roleIds) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public BanUserDTO banUserFromServer(String serverId, String userId, String reason, List<String> permissions) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    // Service methods would be implemented here
}