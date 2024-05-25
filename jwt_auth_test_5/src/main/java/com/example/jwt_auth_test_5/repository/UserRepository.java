package com.example.jwt_auth_test_5.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jwt_auth_test_5.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    public Optional<User> findByEmail(String email); 
}
