package com.example.jwt_auth_test_2.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jwt_auth_test_2.models.User;

public interface UserRepository extends JpaRepository<User, Long> {

    public Optional<User> findByEmail(String email);
    
}
