package com.example.jwt_auth_test_4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.example.jwt_auth_test_4.models.User;
import com.example.jwt_auth_test_4.repository.UserRepository;

@SpringBootApplication
public class JwtAuthTest4Application {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctxt = SpringApplication.run(JwtAuthTest4Application.class, args);
		UserRepository userRepository = ctxt.getBean(UserRepository.class);
		
		if(!userRepository.existsByUsername("user1")) {
			// userRepository.save(new User("user","user",20,"sk.bilal.md@gmail.com","USER"));
			// userRepository.save(new User("admin","admin",20,"admin@gmail.com","ADMIN"));
			userRepository.save(new User("user1","user1",20,"user1@gmail.com","USER"));
		}
	}

}
