package com.example.jwt_auth_test_4.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jwt_auth_test_4.models.Customer;

@RestController
@RequestMapping(path = "/api")
public class CustomerController {
    
    @PostMapping("/customer")
    public String createCustomer(@RequestBody Customer customer) {
        System.out.println(customer.toString());
        return "Success Hit With Body";
    }
}
