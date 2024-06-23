package com.example.ibatis_test_2.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.example.ibatis_test_2.config.MyBatisUtil;
import com.example.ibatis_test_2.dao.User;

@Repository
public class UserMapper {
    
    public List<User> getAllUsers() {
        SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
        List<User> usersList = session.selectList("getAllUsers");
        session.commit(); 
        session.close();
        return usersList;
    }

    public int addUser() {
        SqlSession session = MyBatisUtil.getSqlSessionFactory().openSession();
        User user = new User( "angel6","angel6@gmail.com","heaven6");
        int res = session.insert("addUser",user);
        session.commit();
        session.close();
        return res;
    }
}
