package com.example.auth_ms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.auth_ms.models.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>{

    
} 
