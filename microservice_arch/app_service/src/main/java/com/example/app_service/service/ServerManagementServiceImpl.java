package com.example.app_service.service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app_service.config.ExternalEnvironmentVariables;
import com.example.app_service.dto.CreateServerResponseDTO;
import com.example.app_service.dto.rbac.AssignPermissionsToRole;
import com.example.app_service.dto.rbac.AssociationRbacDto;
import com.example.app_service.dto.rbac.Permission;
import com.example.app_service.dto.rbac.Role;
import com.example.app_service.dto.rbac.RolePermission;
import com.example.app_service.errors.EntityNotFound;
import com.example.app_service.models.Channel;
import com.example.app_service.models.Server;
import com.example.app_service.repository.ServerRepository;
import com.fasterxml.jackson.core.JsonProcessingException;

@Service
public class ServerManagementServiceImpl implements ServerManagementService {

    private static final Logger logger = LoggerFactory.getLogger(ServerManagementService.class);
    @Autowired
    private RestClientService restClientService;

    @Autowired
    private ServerRepository serverRepository;

    @Autowired
    private ChannelManagementService channelManagementService;

    private ExternalEnvironmentVariables environmentVariables;

    private Map<String, List<String>> getGeneralRolesAndPermissions() {
        List<String> generalPermissions = List.of( 
            "GENERAL_ACCESS",
            "VIEW_CHANNELS",
            "VIEW_GENERAL_DETAILS"
        );
        List<String> moderatorPermissions = List.of(
            "MANAGE_CHANNEL_DETAILS",
            "MODERATE_CONTENT",
            "MANAGE_MEMBERS",
            "DELETE_MESSAGES",
            "BAN_MEMBERS",
            "KICK_MEMBERS"
        );
        List<String> adminPermissions = List.of(
            "MANAGE_SERVER",
            "MANAGE_ROLES",
            "MANAGE_USERS",
            "REMOVE_BANS",
            "VIEW_AUDIT_LOGS",
            "CONFIGURE_SETTINGS"
        );
        Map<String, List<String>> rolesAndPermissions = Map.of(
            "General", generalPermissions,
            "MODERATOR", moderatorPermissions,
            "ADMIN", adminPermissions
        );
        return rolesAndPermissions;
    }


    public ServerManagementServiceImpl(RestClientService restClientService, ServerRepository serverRepository, ExternalEnvironmentVariables environmentVariables) {
        super();
        this.restClientService = restClientService;
        this.serverRepository = serverRepository;
        this.environmentVariables = environmentVariables;

    }

    @Override
    public AssociationRbacDto addGeneralRolesAndPermissions(String serverId) throws JsonProcessingException {
        Map<String, List<String>> rolesAndPermissions = this.getGeneralRolesAndPermissions();

        Set<String> roles = rolesAndPermissions.keySet();
        List<Role> rolesDto = roles.stream().map((role) -> Role.builder().name(role).description(role).build()).toList();
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("roles", rolesDto);
        List<Role> createdRoles = this.restClientService.postForResponseList(
            environmentVariables.createRoles(),
            requestBody,
            Role.class
        );
        AssociationRbacDto asrbacDto = new AssociationRbacDto();
        asrbacDto.setRoles(createdRoles);
        String result = createdRoles.get(0).toString();
        

        createdRoles.forEach((role) -> {
            List<String> permissions = rolesAndPermissions.get(role.getName());
            try {
                Map<String, Object> permissionRequestBody = new HashMap<>();
                List<Permission> permissionEntities = permissions
                    .stream()
                    .map((perm) -> Permission.builder().name(perm).build())
                    .toList();
                requestBody.put("permissions", permissionEntities);
                List<Permission> createdPermissions = this.restClientService.postForResponseList(
                    environmentVariables.createPermissions(),
                    requestBody,
                    Permission.class
                );
                List<Permission> oldPerms = asrbacDto.getPerms();
                oldPerms.addAll(createdPermissions);
                asrbacDto.setPerms(oldPerms);
                

                List<RolePermission> rolePermissions = this.restClientService.postForResponseList(environmentVariables.assignPermissionToRoles(), 
                    AssignPermissionsToRole.builder()
                        .roleId(role.getId())
                        .permissionIds(
                            createdPermissions
                            .stream()
                            .map(Permission::getId)
                            .collect(Collectors.toList())
                        ),
                    RolePermission.class
                );
                List<RolePermission> updatedMappings = asrbacDto.getRolePermissionMapping();
                updatedMappings.addAll(rolePermissions);
                asrbacDto.setRolePermissionMapping(updatedMappings);

                
            } catch (JsonProcessingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        });

        return asrbacDto;
        // AssociationRbacDto response = restClientService.postForResponse(
        //     environmentVariables.getRbacServiceUrl()+"/generalSetupToAssociation", 
        //     ServerToAssociationDto.builder().associationId(serverId).build(), 
        //     AssociationRbacDto.class 
        // );
        // System.out.println(response.toString());
        // return response;
    }

    private void builder() {
        // TODO
    }

    @Override
    public List<String> addRolesToServer(String serverId, List<String> roleIds) throws JsonProcessingException {
        // TODO Auto-generated method stub
        restClientService.postForResponse(
            environmentVariables.getRbacServiceUrl() + "/addRolesToAssociation", null, null);
        throw new UnsupportedOperationException("Unimplemented method 'addRolesToServer'");
    }

    @Override
    public CreateServerResponseDTO createServer(String serverName, String description) throws JsonProcessingException {
        
        Server createdServer = this.serverRepository.save(Server.builder().name(serverName).description(description).build());
        this.logger.debug("Server Created with ID: "+createdServer.getId());

        AssociationRbacDto dto = this.addGeneralRolesAndPermissions(createdServer.getId().toString());
        
        return CreateServerResponseDTO.builder()
                .server(createdServer)
                .rbacDetails(dto)
                .build();
        
    }



    @Override
    public List<String> addChannels(String serverId, List<String> channelIds) throws EntityNotFound {
        Optional<Server> optServer =  this.serverRepository.findById(UUID.fromString(serverId));
        if(optServer.isPresent()) {
            throw new EntityNotFound(Server.class.getSimpleName(), "id", serverId);
        }
        Server server = optServer.get();
        
        

        List<Channel> channels = server.getChannels();
        channelIds.forEach(cid -> channels.add(new Channel()));
        server.setChannels(channels);
        this.serverRepository.save(server);
        return channelIds;
    }

    @Override
    public Server createChannels(String serverId, List<String> channelNames, List<String> roleIds) throws EntityNotFound {
        Optional<Server> optServer =  this.serverRepository.findById(UUID.fromString(serverId));
        if(optServer.isPresent()) {
            throw new EntityNotFound(Server.class.getSimpleName(), "id", serverId);
        }
        
        throw new UnsupportedOperationException("Not supported yet.");
    }


        
}
