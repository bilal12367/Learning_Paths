package com.example.jpa_practise;

import java.util.Date;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ConfigurableApplicationContext;

import com.example.jpa_practise.models.Customer;
import com.example.jpa_practise.repository.CustomerRepository;

@SpringBootApplication
@EnableCaching
public class JpaPractiseApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctxt = SpringApplication.run(JpaPractiseApplication.class, args);
		CustomerRepository customerRepository = ctxt.getBean(CustomerRepository.class);
		List<Customer> customers = customerRepository.findByCriteria(2000, 7000, 'M', true, "Mi");
		for(Customer customer: customers) {
			System.out.println(customer.toString());
		}
	}

}
