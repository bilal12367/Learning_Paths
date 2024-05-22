package com.example.jwt_auth_test_3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.jwt_auth_test_3.entity.User;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
}
