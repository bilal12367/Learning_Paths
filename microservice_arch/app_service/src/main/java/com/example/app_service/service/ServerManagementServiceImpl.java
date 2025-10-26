package com.example.app_service.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app_service.config.ExternalEnvironmentVariables;
import com.example.app_service.dto.CreateServerResponseDTO;
import com.example.app_service.dto.ServerToAssociationDto;
import com.example.app_service.dto.rbac.AssociationRbacDto;
import com.example.app_service.models.Server;
import com.example.app_service.repository.ServerRepository;

@Service
public class ServerManagementServiceImpl implements ServerManagementService {

    @Autowired
    private RestClientService restClientService;

    @Autowired
    private ServerRepository serverRepository;

    private ExternalEnvironmentVariables environmentVariables;

    public ServerManagementServiceImpl(RestClientService restClientService, ServerRepository serverRepository, ExternalEnvironmentVariables environmentVariables) {
        super();
        this.restClientService = restClientService;
        this.serverRepository = serverRepository;
        this.environmentVariables = environmentVariables;

    }

    @Override
    public AssociationRbacDto addGeneralRolesAndPermissions(String serverId) {
        AssociationRbacDto response = restClientService.postForResponse(
            environmentVariables.getRbacServiceUrl()+"/generalSetupToAssociation", 
            ServerToAssociationDto.builder().associationId(serverId).build(), 
            AssociationRbacDto.class 
        );
        System.out.println(response.toString());
        return response;
    }

    @Override
    public List<String> addRolesToServer(String serverId, List<String> roleIds) {
        // TODO Auto-generated method stub
        restClientService.postForResponse(
            environmentVariables.getRbacServiceUrl() + "/addRolesToAssociation", null, null);
        throw new UnsupportedOperationException("Unimplemented method 'addRolesToServer'");
    }

    @Override
    public CreateServerResponseDTO createServer(String serverName, String description) {
        
        Server createdServer = this.serverRepository.save(Server.builder().name(serverName).description(description).build());
        AssociationRbacDto dto = this.addGeneralRolesAndPermissions(createdServer.getId().toString());
        return CreateServerResponseDTO.builder()
                .server(createdServer)
                .rbacDetails(dto)
                .build();
        
    }

    @Override
    public List<String> addChannels(String serverId, List<String> channelIds) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addChannels'");
    }
        
}
