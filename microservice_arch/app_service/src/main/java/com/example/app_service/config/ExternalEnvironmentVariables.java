package com.example.app_service.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@ConfigurationProperties()
@Data
public class ExternalEnvironmentVariables {
    @Value("${external.services.auth_service}")
    private String authServiceUrl;

    @Value("${external.services.email_service}")
    private String emailServiceUrl;

    @Value("${external.services.websocket_service}")
    private String websocketServiceUrl;

    @Value("${external.services.app_service}")
    private String appServiceUrl;


    public String getRbacServiceUrl() {
        return authServiceUrl + "/rbac";
    }

    public String getRolesOnChannel() {
        return this.getRbacServiceUrl() + "/getRolesAllowedOnChannel";
    }
    public String addRolesToChannel() {
        return this.getRbacServiceUrl() + "/addAccessRolesToAssociation";
    }

    public String createRoles() {
        return this.getRbacServiceUrl() + "/createRoles";
    }

    public String createPermissions() {
        return this.getRbacServiceUrl() + "/createPermissions";
    }

    public String getRoles() {
        return this.getRbacServiceUrl() + "/getRoles";
    }

    public String getPermissions() {
        return this.getRbacServiceUrl() + "/getPermissions";
    }
}
