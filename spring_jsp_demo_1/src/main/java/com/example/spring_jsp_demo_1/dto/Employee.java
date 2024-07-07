package com.example.spring_jsp_demo_1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class Employee {
    private String name;
    private int age;

}
