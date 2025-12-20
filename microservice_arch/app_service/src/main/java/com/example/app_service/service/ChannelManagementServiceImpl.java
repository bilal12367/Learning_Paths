package com.example.app_service.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.example.app_service.config.ExternalEnvironmentVariables;
import com.example.app_service.dto.rbac.AddRolesToAssociationDto;
import com.example.app_service.dto.rbac.RoleAssociationDto;
import com.example.app_service.errors.EntityNotFound;
import com.example.app_service.models.Channel;
import com.example.app_service.repository.ChannelRepository;
import com.fasterxml.jackson.core.JsonProcessingException;

interface ChannelManagementService {
    /**
     * Creates Channels and Returns channel ids.
     * @param channelNamesList
     * @return - Returns list of string of created channel ids.
     */
    public List<Channel> createChannels(List<String> channelNamesList);

    public Channel editChannelName(String channelId, String channelName) throws EntityNotFound;

    public List<String> getRolesOnChannel(String channelId) throws EntityNotFound, JsonProcessingException;

    /**
     * Adds role to access channels.
     * @param roleId - ID of the role to be added.
     * @param channelIds - List of channel IDs to which the role will be granted access.
     * @param serverId - ID of the server where the channels are hosted.
     * @return - Returns list of string of role association ids.
     * @throws EntityNotFound - If role or channels are not found.
     * @throws JsonProcessingException - If there is an error in processing JSON data.
     */
    public List<String> addRoleToAccessChannels(String roleId, List<String> channelIds, String serverId)  throws EntityNotFound, JsonProcessingException;

    public Channel getChannelById(String channelId);

    public List<Channel> getChannelByIds(List<String> channelIds);

    public boolean isAllowedToAccessChannel(String userId, String channelId);

    
}

@Service
public class ChannelManagementServiceImpl implements ChannelManagementService {

    @Autowired
    private ChannelRepository channelRepository;

    @Autowired
    private ExternalEnvironmentVariables externalEnvironmentVariables;

    @Autowired
    private RestClientService restClientService;

    @Override
    public List<Channel> createChannels(List<String> channelNamesList) {
        List<Channel> channels = channelNamesList.stream().map(
            channelName -> {
                Channel ch = new Channel();
                ch.setChannelName(channelName);
                return ch;
            }
        ).toList();
        channels = this.channelRepository.saveAll(channels);
        return channels;
    }

    @Override
    public Channel editChannelName(String channelId, String channelName) throws EntityNotFound {
        Optional<Channel> optChannel = this.channelRepository.findById(channelId);
        if(optChannel.isEmpty()) {
            throw new EntityNotFound("Channel", channelId);
        }
        Channel channel = optChannel.get();
        channel.setChannelName(channelName);
        return this.channelRepository.save(channel);
    }

    @Override
    public List<String> getRolesOnChannel(String channelId) throws JsonProcessingException {
        Map<String, Object> queries = new HashMap<String, Object>();
        
        queries.put("channelId", channelId);
        // this.restClientService.getForResponse(externalEnvironmentVariables.getRolesOnChannel(), queries);
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<String> addRoleToAccessChannels(String roleId, List<String> channelIds, String serverId) throws JsonProcessingException {
        AddRolesToAssociationDto requestBody = AddRolesToAssociationDto.builder()
            .association_id(roleId)
            .role_ids(channelIds)
            .build();
        List<RoleAssociationDto> accessRolesOnChannel = this.restClientService.postForResponseList(externalEnvironmentVariables.addRolesToChannel(), requestBody,RoleAssociationDto.class);
        return accessRolesOnChannel.stream().map(ra -> ra.getAssociation_id()).toList();
    }

    @Override
    public Channel getChannelById(String channelId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Channel> getChannelByIds(List<String> channelIds) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public boolean isAllowedToAccessChannel(String userId, String channelId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }


}