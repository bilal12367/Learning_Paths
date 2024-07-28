package com.example.ibatis_test_2.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.example.ibatis_test_2.config.MyBatisUtil;
import com.example.ibatis_test_2.dao.User;

public interface UserMapper {
    
    public List<User> getAllUsers();

}
