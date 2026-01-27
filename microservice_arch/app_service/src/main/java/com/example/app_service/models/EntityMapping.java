package com.example.app_service.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;


@Entity
@Builder
public class EntityMapping {
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private String id;

    @Column()
    private String type;

    @Column()
    private String entity_id;

    @Column()
    private String association_id;
}