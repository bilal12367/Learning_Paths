package com.example.ibatis_demo_3.mytests;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.example.ibatis_demo_3.dao.UserMapper;
import com.example.ibatis_demo_3.dao.model.User;
import com.example.ibatis_demo_3.service.UserService;

public class MyTest {
    
    private UserMapper userMapper;
    private UserService userService;

    @BeforeEach
    public void setup() {
        userService = mock(UserService.class);
    }


    @Test
    public void Test() {
        User user = new User();
        user.setActive(true);
        user.setEmail("bilal@gmail.com");
        user.setUserName("bilal");
        user.setId(10l);
        user.setRole("User");
        List users = Arrays.asList(user);
        when(userMapper.getAllUsers()).thenReturn(users);

    }
}
