package com.example.app_service.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.example.app_service.config.ExternalEnvironmentVariables;
import com.example.app_service.dto.rbac.Role;
import com.example.app_service.errors.EntityNotFound;
import com.fasterxml.jackson.core.JsonProcessingException;

@SpringBootTest
@ActiveProfiles("test")
public class ChannelManagementServiceTest {
    
    @Autowired
    private ChannelManagementService channelManagementService;

    @Autowired
    private RestClientService restClientService;

    @Autowired
    ExternalEnvironmentVariables externalEnvironmentVariables;

    @Test
    public void addRolesOnChannel() throws JsonProcessingException, EntityNotFound {
        this.channelManagementService.addRoleToAccessChannels("4", null, null);
        // String url = externalEnvironmentVariables.addRolesToChannel();
        
        // Map<String, Object> requestBody = new HashMap<>();
        // requestBody.put("association_id", "123");
        // String[] roleIds = {"1", "2"};
        // requestBody.put("roleIds", roleIds);
        // List<RoleAssociationDto> roleAssociations = this.restClientService.postForResponse(url, requestBody);
        // roleAssociations.forEach((roleAssociation) -> {System.out.println(roleAssociation.toString());});
    }    

    @Test
    public void getRolesOnChannel() throws JsonProcessingException {
        // String url = externalEnvironmentVariables.getRolesOnChannel();
        // Map<String, Object> queriesHashMap = new HashMap<>();
        // queriesHashMap.put("associationId", "123");
        // List<Role> roles = this.restClientService.getForResponse(url, queriesHashMap);
        // roles.forEach((role) -> {System.out.println(role.toString());});
        // assertEquals(roles.size(), 0);
    }
}
