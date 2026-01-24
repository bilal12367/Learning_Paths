package com.example.app_service.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.fasterxml.jackson.core.JsonProcessingException;

@SpringBootTest
@ActiveProfiles("test")
public class ServerManagementServiceTest {
    
    @Autowired
    private ServerManagementService serverManagementService;


    @Test
    public void createServer() throws JsonProcessingException {
        
    }
}
