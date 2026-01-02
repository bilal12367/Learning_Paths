package com.example.app_service.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Channel {
    
    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column()
    private String channelName;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "server_id")
    private Server server;
}
