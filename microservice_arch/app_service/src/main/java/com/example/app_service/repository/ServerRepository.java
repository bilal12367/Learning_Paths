package com.example.app_service.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.app_service.models.Server;

@Repository
public interface ServerRepository extends JpaRepository<Server, UUID> {
    
}
