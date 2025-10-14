package com.example.junit_demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.junit_demo.entity.User;
import com.example.junit_demo.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestService testService;
    

    public User createUser(User user) throws Exception {
        if(userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("User Already Exists");
        }
        return userRepository.save(user);
    }

    public User getUser(String id)  throws Exception {
        Optional<User> optUser = this.userRepository.findById(Long.parseLong(id));
        if(!optUser.isPresent()) {
            throw new Exception("User Doesn't Exists");
        }
        return optUser.get();
    }
    public String testUserService(String id) {
        return testService.testMethod(id);
    }
}
