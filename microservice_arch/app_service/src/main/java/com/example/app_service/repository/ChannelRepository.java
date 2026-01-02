package com.example.app_service.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.app_service.models.Channel;

public interface ChannelRepository extends JpaRepository<Channel, String> {
    
}
