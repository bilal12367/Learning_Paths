package com.example.app_service.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.example.app_service.AppServiceApplication;
import com.example.app_service.dto.CreateServerResponseDTO;
import com.example.app_service.service.ServerManagementService;

@SpringBootTest
@ActiveProfiles("test")
public class ServerManagementServiceTest {
    
    @Autowired
    private ServerManagementService serverManagementService;


    @Test
    public void createServer() {
        CreateServerResponseDTO dto = serverManagementService.createServer("Test Server", "New Test Server");
        System.out.println("Server created with ID: " + dto.getServer().getId().toString());
        
    }
}
