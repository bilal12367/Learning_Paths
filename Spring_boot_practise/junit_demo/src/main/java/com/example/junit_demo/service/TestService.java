package com.example.junit_demo.service;

import org.springframework.stereotype.Service;

@Service
public class TestService {
    
    public String testMethod(String id) {
        return "This is Test Message!!";
    }
}
