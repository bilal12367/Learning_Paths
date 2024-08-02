package com.example.ibatis_demo_3;

import java.util.List;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.example.ibatis_demo_3.dao.UserMapper;
import com.example.ibatis_demo_3.dao.model.User;

@SpringBootApplication
public class IbatisDemo3Application {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctxt = SpringApplication.run(IbatisDemo3Application.class, args);
		UserMapper mapper = ctxt.getBean(UserMapper.class);
		List<User> users = mapper.getAllUsers();
		for(User user: users) {
			System.out.println(user.toString());
		}
	}

}
