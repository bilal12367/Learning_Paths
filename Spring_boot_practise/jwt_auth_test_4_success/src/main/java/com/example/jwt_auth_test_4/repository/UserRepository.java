package com.example.jwt_auth_test_4.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jwt_auth_test_4.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    public Optional<User> findByUsername(String userName);

    public boolean existsByUsername(String username);
}
