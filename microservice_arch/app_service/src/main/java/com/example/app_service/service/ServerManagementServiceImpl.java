package com.example.app_service.service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app_service.config.ExternalEnvironmentVariables;
import com.example.app_service.dto.CreateServerResponseDTO;
import com.example.app_service.dto.ServerToAssociationDto;
import com.example.app_service.dto.rbac.AssociationRbacDto;
import com.example.app_service.errors.EntityNotFound;
import com.example.app_service.models.Channel;
import com.example.app_service.models.Server;
import com.example.app_service.repository.ChannelRepository;
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

    public ServerManagementServiceImpl(RestClientService restClientService, ServerRepository serverRepository, ExternalEnvironmentVariables environmentVariables) {
        super();
        this.restClientService = restClientService;
        this.serverRepository = serverRepository;
        this.environmentVariables = environmentVariables;

    }

    @Override
    public AssociationRbacDto addGeneralRolesAndPermissions(String serverId) throws JsonProcessingException {
        AssociationRbacDto response = restClientService.postForResponse(
            environmentVariables.getRbacServiceUrl()+"/generalSetupToAssociation", 
            ServerToAssociationDto.builder().associationId(serverId).build(), 
            AssociationRbacDto.class 
        );
        System.out.println(response.toString());
        return response;
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
        this.channelManagementService.create
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
