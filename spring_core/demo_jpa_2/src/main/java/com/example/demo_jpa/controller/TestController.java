package com.example.demo_jpa.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo_jpa.models.User;
import com.example.demo_jpa.repository.UserRepository;

@RestController
public class TestController {
	
	@Autowired
	private UserRepository userRepository;

	@RequestMapping(path="/test", method = RequestMethod.GET)
	@ResponseBody
	public User test() {
		return new User(1l, "bilal","test@gmail.com");
	}
	
	@RequestMapping(path="/testMvc", method= RequestMethod.GET)
	public ModelAndView testMvc() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("home");
		mv.addObject("message","Message from controller");
		return mv;
	}
	
	@RequestMapping(path = "/testJpa", method = RequestMethod.POST)
	public User addUser(@RequestBody User user) throws Exception {
		User savedUser = userRepository.save(user);
		Optional<User> optUser = userRepository.findById(savedUser.getId());
		if(!optUser.isPresent()) throw new Exception("User Not Saved!");	
		return optUser.get();		
	}
}
