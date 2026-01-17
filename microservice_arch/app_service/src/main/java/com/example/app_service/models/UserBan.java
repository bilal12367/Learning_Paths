package com.example.app_service.models;

import java.time.LocalDateTime;
import java.util.List;

import com.example.app_service.dto.enums.BanType;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;




@Entity
public class UserBan {
    
    @Id
    @GeneratedValue (strategy=jakarta.persistence.GenerationType.UUID)
    private String id;

    @Column
    private String userId;
    
    @Column
    private String serverId;
    @Column
    private String reason;
    
    @Column
    private LocalDateTime expirationDate;

    @Enumerated(EnumType.ORDINAL)
    private BanType banType;

    @Column
    private LocalDateTime bannedAt;

    @Column
    private LocalDateTime banExpirationDate;

    @Column
    private List<String> permissions;
    
}
