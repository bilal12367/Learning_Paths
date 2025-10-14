package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long>{
    
    public List<Customer> findByAgeBetweenAndBalanceBetweenAndGenderAndIsActiveAndFirstNameStartingWith(int low, int high, double balLow, double balHigh, char gender, boolean isActive, String firstName);
    
}
