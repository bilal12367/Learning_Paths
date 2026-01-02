package com.example.auth_ms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.auth_ms.dto.RegisterDTO;
import com.example.auth_ms.models.UserEntity;
import com.example.auth_ms.repository.UserRepository;

@Service()
public class UserService {
    
    @Autowired()
    private UserRepository repository;

    public UserEntity registerUser(RegisterDTO registerDTO) {
        UserEntity user = new UserEntity();
        user.setEmail(registerDTO.email);
        user.setFull_name(registerDTO.full_name);
        user.setUsername(registerDTO.user_name);
        user.setPassword(registerDTO.password);
        return repository.save(user);
    }

    
}
