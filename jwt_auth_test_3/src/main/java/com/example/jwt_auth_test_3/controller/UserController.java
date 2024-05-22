package com.example.jwt_auth_test_3.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jwt_auth_test_3.entity.User;

@RestController
@RequestMapping(path = "api")
public class UserController {
    


    @GetMapping("/users/all")
    public ResponseEntity<List<User>> getAllUsers() {
        System.out.println("Get All Users hit");
        String userName = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("Retrieved value from context "+ userName);
        return ResponseEntity.ok(List.of());
    }
}
