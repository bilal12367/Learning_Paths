package com.example.jpa_practise.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.jpa_practise.models.Customer;
import com.example.jpa_practise.service.CustomerService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("customers")
public class CustomerController {
    
    @Autowired
    private CustomerService customerService;

    @GetMapping("/get/{customerId}")
    public Customer getProduct(@PathVariable(name = "customerId") long customerId) throws Exception {
        return customerService.getCustomerById(customerId);
    }

    @PostMapping("/save")
    public Customer saveOrUpdateCustomer(@RequestBody Customer customer) {
        //TODO: process POST request
        return customerService.registerOrUpdateCustomer(customer);
    }

    @GetMapping("/get/all")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }
    
    
    
    
}
