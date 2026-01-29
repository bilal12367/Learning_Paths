package com.example.app_service.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.app_service.config.ExternalEnvironmentVariables;
import com.example.app_service.dto.Entity;
import com.example.app_service.dto.ServerDetailsDTO;
import com.example.app_service.dto.rbac.BanUserDTO;
import com.example.app_service.dto.rbac.ChannelRolesMapping;
import com.example.app_service.dto.rbac.RolePermission;
import com.example.app_service.dto.rbac.ServerUserDTO;
import com.example.app_service.models.Channel;
import com.example.app_service.models.EntityMapping;
import com.example.app_service.models.Server;
import com.example.app_service.repository.ChannelRepository;
import com.example.app_service.repository.EntityMappingRepository;
import com.example.app_service.repository.ServerRepository;
import com.fasterxml.jackson.core.JsonProcessingException;



interface ServerManagementServiceInterface {

    String SERVICE_NAME = "ServerManagementService";
    
    org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(SERVICE_NAME);

    public ServerDetailsDTO createServer(Entity entity)  throws JsonProcessingException;
    public ServerDetailsDTO editServerDetails(Server server);
    public List<String> createChannels(List<Entity> entities);
    public List<String> createRoles(List<Entity> entities);
    public List<String> createPermissions(List<Entity> entities);
    public List<String> createResources(List<Entity> entities);

    public List<RolePermission> assignPermissionToRole(String roleId, List<String> permissionIds) throws JsonProcessingException;
    public ChannelRolesMapping assignRolesToChannel(String channelId, List<String> roleIds);
    public ServerUserDTO addUserToServer(String serverId, String userId, List<String> roleIds);
    public BanUserDTO banUserFromServer(String serverId, String userId, String reason, List<String> permissions);
}

@Service
public class ServerManagementService implements ServerManagementServiceInterface {


    @Autowired
    private RestClientService2 restClientService;

    @Autowired
    private ServerRepository serverRepository;

    @Autowired
    private EntityMappingRepository entitymappingRepo;

    @Autowired
    private ChannelRepository ChannelRepository;
    
    @Autowired
    private ExternalEnvironmentVariables variables;

    private List<Entity> createGeneralRoles() throws JsonProcessingException {
        List<Entity> roles = new ArrayList<>();
        roles.add(Entity.builder().type("ROLE").name("GENERAL").description("General User").build());
        roles.add(Entity.builder().type("ROLE").name("ADMIN").description("Admin User").build());
        roles.add(Entity.builder().type("ROLE").name("ROOT").description("Root User").build());

        Map bodyMap = new HashMap();
        bodyMap.put("roles", roles);
        ResponseEntity<List<Entity>> responseEntity = this.restClientService.postForResponse(variables.createRoles(), bodyMap, new ParameterizedTypeReference<List<Entity>>(){});
        List<Entity> createdRoles = (List<Entity>) responseEntity.getBody().stream()
            .map(ent -> {
                ent.setType("ROLE");
                return ent;
            }).toList();

        

        return createdRoles;
        
       
    }

    private List<Entity> createGeneralPermissions() throws JsonProcessingException {
        List<Entity> permissions = new ArrayList<>();
        permissions.add(Entity.builder().type("PERMISSION").name("GENERAL_SERVER_ACCESS").description("General Channels and Resource access of server.").build());
        permissions.add(Entity.builder().type("PERMISSION").name("MANAGE_USERS").description("General Channels and Resource access of server.").build());
        permissions.add(Entity.builder().type("PERMISSION").name("MANAGE_CHANNELS").description("General Channels and Resource access of server.").build());
        permissions.add(Entity.builder().type("PERMISSION").name("MANAGE_SERVER").description("General Channels and Resource access of server.").build());
        permissions.add(Entity.builder().type("PERMISSION").name("MANAGE_ADMIN").description("General Channels and Resource access of server.").build());
        permissions.add(Entity.builder().type("PERMISSION").name("MANAGE_RESOURCES").description("General Channels and Resource access of server.").build());

        
        
        Map bodyMap = new HashMap();
        bodyMap.put("permissions", permissions);
        ResponseEntity<List<Entity>> responseEntity =  this.restClientService.postForResponse(variables.createPermissions(), bodyMap, new ParameterizedTypeReference<List<Entity>>() {});

        return responseEntity.getBody().stream()
                    .map(ent -> {
                        ent.setType("PERMISSION");
                        return ent;
                    })
                    .collect(Collectors.toList());
        
            
        
    }

    private List<Channel> createGeneralChannels() throws JsonProcessingException {
        List<Channel> channels = new ArrayList<>();
        channels.add(Channel.builder().channelName("General").build());
        channels.add(Channel.builder().channelName("Admin").build());
        channels.add(Channel.builder().channelName("Announcement").build());
        channels.add(Channel.builder().channelName("Q&A").build());
        channels.add(Channel.builder().channelName("form-discussion").build());
        channels.add(Channel.builder().channelName("Rules").build());

        List<Channel> createdChannels = this.ChannelRepository.saveAll(channels);
        return createdChannels;
    }

    private List<EntityMapping> mapEntitiesToServer(List<Object> entities, String serverId) {
        List<EntityMapping> entitiesToBeMapped = new ArrayList<>();
        entities.forEach((Object entity) -> {
            String entityId = null;
            if (entity instanceof Channel) {
                entityId = ((Channel) entity).getId();
                entitiesToBeMapped.add(EntityMapping.builder().type("CHANNEL").entity_id(entityId).association_id(serverId).build());
            } else if(entity instanceof Entity) {
                entityId = ((Entity) entity).getId();
                entitiesToBeMapped.add(EntityMapping.builder().type(((Entity) entity).getType()).entity_id(entityId).association_id(serverId).build());
            }
        });
        List<EntityMapping> entitiesMapped = this.entitymappingRepo.saveAll(entitiesToBeMapped);
        return entitiesMapped;
    }

    @Override
    public ServerDetailsDTO createServer(Entity entity) throws JsonProcessingException {
        Server server = this.serverRepository.save(
            Server.builder()
                .name(entity.getName())
                .description(entity.getDescription())
                .build());
        String serverId = server.getId();
        List<Object> entitiesToBeMapped = Stream.of(this.createGeneralRoles(), this.createGeneralPermissions(), this.createGeneralChannels())
                .flatMap(List::stream)
                .collect(Collectors.toList());

        List<EntityMapping> entitiesMapped = this.mapEntitiesToServer(entitiesToBeMapped , serverId);
        // return ServerDetailsDTO.builder().server(server).roleIds(roles).build();
        entitiesMapped.forEach(ent -> {
            if (ent instanceof EntityMapping && ((EntityMapping) ent).getType() == "ROLE" && ((EntityMapping) ent).get) {

            }
        });
        return ServerDetailsDTO.builder()
                    .server(server)
                    .channelIds(entitiesToBeMapped.stream().filter(ent -> ent instanceof Channel).map(ent -> ((Channel) ent).getId()).toList())
                    .roleIds(entitiesToBeMapped.stream().filter(ent -> ent instanceof Entity && ((Entity) ent).getType().equalsIgnoreCase("ROLE")).map(ent -> ((Entity) ent).getId()).toList())
                    .permissionIds(entitiesToBeMapped.stream().filter(ent -> ent instanceof Entity && ((Entity) ent).getType().equalsIgnoreCase("PERMISSION")).map(ent -> ((Entity) ent).getId()).toList())
                    .build();
        // throw new UnsupportedOperationException("Not supported yet.");
    }
    
    @Override
    public List<RolePermission> assignPermissionToRole(String roleId, List<String> permissionIds) throws JsonProcessingException {
        Map reqBody = new HashMap();
        reqBody.put("roleId", roleId);
        reqBody.put("permissionIds", permissionIds);
        ResponseEntity<List<RolePermission>> responseEntity = this.restClientService.postForResponse(this.variables.assignPermissionToRoles(), reqBody, new ParameterizedTypeReference<List<RolePermission>>() {});
        List<RolePermission> rolePermissions = responseEntity.getBody();
        return rolePermissions;
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