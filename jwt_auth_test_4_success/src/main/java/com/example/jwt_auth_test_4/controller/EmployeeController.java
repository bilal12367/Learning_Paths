package com.example.jwt_auth_test_4.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api")
public class EmployeeController {
    
    @GetMapping(path="/employees")
    public List<String> getEmployees() {
        List<String> list = new ArrayList<>();
        list.add("Emp1");
        list.add("Emp2");
        list.add("Emp3");
        return list;
    }
}
