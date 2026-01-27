package com.example.app_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.app_service.models.EntityMapping;

@Repository
public interface EntityMappingRepository extends JpaRepository<EntityMapping, String> { }