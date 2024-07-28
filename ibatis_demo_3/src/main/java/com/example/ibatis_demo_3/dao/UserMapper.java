package com.example.ibatis_demo_3.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.ibatis_demo_3.dao.model.User;

@Mapper
public interface UserMapper {
    
    List<User> getAllUsers();

}
