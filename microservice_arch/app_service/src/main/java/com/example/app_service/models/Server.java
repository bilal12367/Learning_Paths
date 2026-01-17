package com.example.app_service.models;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

@Entity()
@Table(name = "servers")
@Builder
@Data
public class Server {

    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column
    private String name;

    @Column
    private String description;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "channel_ids")
    private List<Channel> channels;

    // @OneToMany(fetch = FetchType.LAZY)
    // @JoinColumn(name = "roles")
    private List<String> roles;

    private List<String> permissions;

    private List<String> resources;

    private List<String> userIds;

    



}
