package com.example.app_service.config;

import java.util.List;
import java.util.Map;

public class PermissionDefaults {
    public static final String GENERAL_ACCESS = "GENERAL_ACCESS";
    public static final String VIEW_CHANNELS = "VIEW_CHANNELS";
    public static final String VIEW_GENERAL_DETAILS = "VIEW_GENERAL_DETAILS";
    public static final String GENERAL_SERVER_ACCESS = "GENERAL_SERVER_ACCESS";
    public static final String MANAGE_USERS = "MANAGE_USERS";
    public static final String MANAGE_CHANNELS = "MANAGE_CHANNELS";
    public static final String MANAGE_SERVER = "MANAGE_SERVER";
    public static final String MANAGE_RESOURCES = "MANAGE_RESOURCES";

    public static final Map<String, List<String>> GENERAL_TEMPLATE = Map.of(
        "MODERATOR", List.of(GENERAL_ACCESS, VIEW_CHANNELS, VIEW_GENERAL_DETAILS, GENERAL_SERVER_ACCESS, MANAGE_SERVER, MANAGE_RESOURCES),
        "ADMIN", List.of(GENERAL_ACCESS, VIEW_CHANNELS, VIEW_GENERAL_DETAILS, GENERAL_SERVER_ACCESS, MANAGE_SERVER, MANAGE_RESOURCES, MANAGE_USERS),
        "GENERAL", List.of(GENERAL_ACCESS, VIEW_CHANNELS, VIEW_GENERAL_DETAILS, GENERAL_SERVER_ACCESS)
    );

}
