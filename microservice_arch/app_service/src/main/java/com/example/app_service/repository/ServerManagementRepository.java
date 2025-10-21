package com.example.app_service.repository;

import java.util.List;

import com.example.app_service.models.Server;

/**
 * Interface to create servermanagement repository.
 */
public interface ServerManagementRepository {
    /**
     * Adds permissions to the server.
     * @param serverId - Id of the server to attach Permissions
     * @param permissions - List of Ids of permissions to be attached
     * @return List<String> - Returns a list of string of permission ids,  of the server id has after addition.
     */
    public List<String> addPermissionsToServer(String serverId,List<String> permissions);

    /**
     * Adds roles to the server.
     * @param serverId - Id of the server to attach Permissions
     * @param roleIds - List of Ids of roles to be attached
     * @return List<String> - Returns a list of string of role ids, of the server id has after addition.
     */
    public List<String> addRolesToServer(String serverId, List<String> roleIds);

    /**
     * Creates the basic server.
     * @param serverName - Name of the server
     * @param description - Description of the server
     * @return Server - Returns the server of the entity.
     */
    public Server createServer(String serverName, String description);

    /**
     * Adds the channels to the server.
     * @param serverId - Server Id
     * @param channelIds - List of the channel Ids
     * @return - Returns updated list of channel ids of the server.
     */
    public List<String> addChannels(String serverId, List<String> channelIds);

    
}