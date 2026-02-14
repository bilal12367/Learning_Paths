package com.example.app_service.service;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.HttpClientErrorException;

import com.example.app_service.dto.Entity;
import com.example.app_service.dto.ServerDetailsDTO;
import com.example.app_service.dto.rbac.RolePermission;
import com.fasterxml.jackson.core.JsonProcessingException;

@SpringBootTest
@ActiveProfiles("test")
public class ServerManagementServiceTest {
    
    @Autowired
    private ServerManagementService serverManagementService;


    @Test
    public void createServer() throws JsonProcessingException {
        try {
            ServerDetailsDTO serverDetails = this.serverManagementService.createServer(Entity.builder().name("test server 1").description("Test Server").build());
            assertNotNull(serverDetails.getId());
            assertTrue(serverDetails.getRoleIds().size() > 0);
            
        } catch (HttpClientErrorException e) {
            HttpStatusCode status = e.getStatusCode();
            if (status.is4xxClientError()) {
                System.out.println("4xx error: " + status);
            } else if (status.is5xxServerError()) {
                System.out.println("5xx error: " + status);
            }
            System.out.println(e);
            
        } catch (Exception e) {
            System.out.println("Exception Caught");
            System.out.println(e);
        }
    }

    @Test
    public void assignPermissionsToRole() throws JsonProcessingException{
        try {
            List<RolePermission> rolePermissions = this.serverManagementService.assignPermissionToRole("47", List.of("1", "2", "3"));
            assertTrue(rolePermissions.size() > 0);
        }catch(HttpClientErrorException e){
            HttpStatusCode status = e.getStatusCode();
            if(status.is4xxClientError()){
                System.out.println("4xx error: " + status);
            }else if(status.is5xxServerError()){
                System.out.println("5xx error: " + status);
            }
            System.out.println(e);
        } catch(Exception e){
            System.out.println("Exception Caught");
            System.out.println(e);
        }
    }
}
