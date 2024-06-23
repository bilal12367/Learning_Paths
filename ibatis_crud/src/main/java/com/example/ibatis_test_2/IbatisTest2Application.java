package com.example.ibatis_test_2;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.example.ibatis_test_2.dao.User;
import com.example.ibatis_test_2.dao.UserMapper;

@SpringBootApplication
public class IbatisTest2Application {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctxt = SpringApplication.run(IbatisTest2Application.class, args);
		UserMapper mapper = ctxt.getBean(UserMapper.class);
		mapper.addUser();
		List<User> users = mapper.getAllUsers();
		System.out.println("Printing users1: ");
		for (User user : users) {
			System.out.println("User: "+user.toString());
		}
	}

}
