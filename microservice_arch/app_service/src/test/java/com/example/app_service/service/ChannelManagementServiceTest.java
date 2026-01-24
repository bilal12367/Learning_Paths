package com.example.app_service.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.example.app_service.config.ExternalEnvironmentVariables;
import com.example.app_service.errors.EntityNotFound;
import com.fasterxml.jackson.core.JsonProcessingException;

@SpringBootTest
@ActiveProfiles("test")
public class ChannelManagementServiceTest {
    
    // @Autowired
    // private ChannelManagementService channelManagementService;

    @Autowired
    private RestClientService restClientService;

    @Autowired
    ExternalEnvironmentVariables externalEnvironmentVariables;

    @Test
    public void addRolesOnChannel() throws JsonProcessingException, EntityNotFound {
        
    }  
}
