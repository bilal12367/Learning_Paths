package com.example.app_service.service;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app_service.config.ExternalEnvironmentVariables;
import com.example.app_service.dto.CreateServerResponseDTO;
import com.example.app_service.dto.ServerToAssociationDto;
import com.example.app_service.dto.rbac.AssociationRbacDto;
import com.example.app_service.dto.rbac.Permission;
import com.example.app_service.dto.rbac.Role;
import com.example.app_service.errors.EntityNotFound;
import com.example.app_service.models.Channel;
import com.example.app_service.models.Server;
import com.example.app_service.repository.ServerRepository;
import com.fasterxml.jackson.core.JsonProcessingException;

@Service
public class ServerManagementServiceImpl implements ServerManagementService {

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
        Map<String, Object> rolesAndPermissions = Map.of(
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
        
        List<Role> createdRoles = this.restClientService.postForResponse(
            environmentVariables.createRoles(),
            roles
        );

        createdRoles.forEach((role) -> {
            List<String> permissions = rolesAndPermissions.get(role.getName());
            try {
                List<Permission> createdPermissions = this.restClientService.postForResponse(
                    environmentVariables.createPermissions(),
                    permissions
                );
                
            } catch (JsonProcessingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        });
        // AssociationRbacDto response = restClientService.postForResponse(
        //     environmentVariables.getRbacServiceUrl()+"/generalSetupToAssociation", 
        //     ServerToAssociationDto.builder().associationId(serverId).build(), 
        //     AssociationRbacDto.class 
        // );
        // System.out.println(response.toString());
        // return response;
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
