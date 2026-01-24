package com.example.app_service.dto.rbac;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChannelRolesMapping {
    private String channelId;
    private List<String> roleIds;
}
