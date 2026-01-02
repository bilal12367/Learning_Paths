package com.example.app_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.app_service.dto.CreateServerResponseDTO;
import com.example.app_service.dto.rbac.AssociationRbacDto;
import com.example.app_service.errors.EntityNotFound;
import com.example.app_service.models.Server;
import com.fasterxml.jackson.core.JsonProcessingException;

/**
 * Interface to create servermanagement service.
 */
@Service
public interface ServerManagementService {
    /**
     * Adds permissions to the server.
     * @param serverId - Id of the server to attach Permissions
     * @param permissions - List of Ids of permissions to be attached
     * @return List<String> - Returns a list of string of permission ids,  of the server id has after addition.
     */
    public AssociationRbacDto addGeneralRolesAndPermissions(String serverId) throws JsonProcessingException;

    /**
     * Adds roles to the server.
     * @param serverId - Id of the server to attach Permissions
     * @param roleIds - List of Ids of roles to be attached
     * @return List<String> - Returns a list of string of role ids, of the server id has after addition.
     */
    public List<String> addRolesToServer(String serverId, List<String> roleIds) throws JsonProcessingException;

    /**
     * Creates the basic server.
     * @param serverName - Name of the server
     * @param description - Description of the server
     * @return Server - Returns the server of the entity.
     */
    public CreateServerResponseDTO createServer(String serverName, String description)throws JsonProcessingException;

    /**
     * Adds the channels to the server.
     * @param serverId - Server Id
     * @param channelIds - List of the channel Ids
     * @return - Returns updated list of channel ids of the server.
     */
    public List<String> addChannels(String serverId, List<String> channelIds) throws  EntityNotFound;

    /**
     * Creates channels for the server.
     * @param serverId - Id of the server
     * @param channelNames - Channel Names to be created.
     * @param roleIds - Roles to have access over the channels.
     * @return
     */
    public Server createChannels(String serverId, List<String> channelNames, List<String> roleIds) throws EntityNotFound;
    
}