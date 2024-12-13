package com.example.demo_jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo_jpa.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
