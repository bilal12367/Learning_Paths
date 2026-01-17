package com.example.app_service.dto.rbac;

import java.time.LocalDateTime;

import com.example.app_service.dto.enums.BanType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BanUserDTO {
    private String id;
    private String reason;
    private String userId;
    private String serverId;
    private LocalDateTime bannedAt;
    private LocalDateTime expirationDate;
    private BanType banType;
    
    public boolean isBanActive() {
        if (this.banType == BanType.PERMANENT) {
            return true;
        }
        return this.expirationDate.isAfter(LocalDateTime.now());
    }

}
