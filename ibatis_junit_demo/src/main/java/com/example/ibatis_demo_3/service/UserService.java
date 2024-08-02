package com.example.ibatis_demo_3.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ibatis_demo_3.dao.UserMapper;
import com.example.ibatis_demo_3.dao.model.User;

@Service
public class UserService {
    
    @Autowired
    private UserMapper userMapper;

    public List<User> getAllUsers() {
        return userMapper.getAllUsers();
    }
}
