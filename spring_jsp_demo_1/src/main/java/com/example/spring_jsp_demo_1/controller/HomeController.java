package com.example.spring_jsp_demo_1.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.spring_jsp_demo_1.dto.Employee;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class HomeController {
    
    @GetMapping(path="/test")
    public String test(HttpServletRequest request) {
        System.out.println("Hit");
        request.setAttribute("data", "Some Data");
         List<Employee> employees = new ArrayList<>();
        employees.add(new Employee("John Doe", 30));
        employees.add(new Employee("Jane Smith", 25));
        employees.add(new Employee("Michael Johnson", 35));

        // Set the list as an attribute in the request
        request.setAttribute("employees", employees);

        return "home";
    }

}
