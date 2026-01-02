package com.example.app_service.errors;

public class EntityNotFound extends Exception {
    public EntityNotFound(String entityName, String keyName, String id) {
        super("Entity Not Found: "+entityName+" for key: "+keyName+" = "+id.toString());
    }
    
    public EntityNotFound(String entityName, String keyName) {
        super("Entity Not Found: "+entityName+" for key: "+keyName);
    }
}
