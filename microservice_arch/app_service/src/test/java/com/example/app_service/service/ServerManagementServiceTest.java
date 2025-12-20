package com.example.app_service.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.example.app_service.dto.CreateServerResponseDTO;
import com.fasterxml.jackson.core.JsonProcessingException;

@SpringBootTest
@ActiveProfiles("test")
public class ServerManagementServiceTest {
    
    @Autowired
    private ServerManagementService serverManagementService;


    @Test
    public void createServer() throws JsonProcessingException {
        try {
        CreateServerResponseDTO dto = serverManagementService.createServer("Test Server", "New Test Server");
        System.out.println("Server created with ID: " + dto.getServer().getId().toString());
        assertNotNull(dto);
        } catch (Exception e) {
            System.out.println("Error Caught in test: "+e.getMessage());
            e.printStackTrace();
        }
    }
}
