package com.example.app_service.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Resource {
    @Id
    @GeneratedValue(strategy=jakarta.persistence.GenerationType.UUID)
    private String id;
    private String name;
    private String description;
    
}
