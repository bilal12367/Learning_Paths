package com.example.junit_demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.junit_demo.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    public boolean existsByEmail(String email);
}
