package com.example.app_service.repository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.app_service.models.Server;
import com.example.app_service.service.RestClientService;


public class ServerManagementRepositoryImpl implements ServerManagementRepository {

    @Autowired
    private RestClientService restClientService;

    @Override
    public List<String> addPermissionsToServer(String serverId, List<String> permissions) {
        
        restClientService.postForResponse(serverId, null, null);
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addPermissionsToServer'");
    }

    @Override
    public List<String> addRolesToServer(String serverId, List<String> roleIds) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addRolesToServer'");
    }

    @Override
    public Server createServer(String serverName, String description) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createServer'");
    }

    @Override
    public List<String> addChannels(String serverId, List<String> channelIds) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addChannels'");
    }
        
}
