package com.example.demo;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.catalina.core.ApplicationContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.example.demo.models.Customer;
import com.example.demo.repository.CustomerRepository;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctxt = SpringApplication.run(DemoApplication.class, args);
		CustomerRepository custRepo = ctxt.getBean(CustomerRepository.class);
		List<Customer> customers = custRepo.findByAgeBetweenAndBalanceBetweenAndGenderAndIsActiveAndFirstNameStartingWith(30, 40, 2000, 3000, 'M',true,"Mi");
		for(Customer customer: customers) {
			System.out.println(customer.toString());
		}
	}

}
