package com.example.jpa_practise.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.jpa_practise.models.Customer;

public interface CustomerRepository  extends JpaRepository<Customer,Long>, CustomCustomerRepository{
    public List<Customer> findByAccountBalanceBetweenAndGenderAndIsActiveAndCustomerNameStartsWith(double lowBal,double highBal,char gender, boolean isActive, String startsString);
    
    @Query("select c from Customer c where c.accountBalance between ?1 and ?2 and c.gender=?3 and c.isActive=?4 and c.customerName like ?5%")
    public List<Customer> findByQuery1(double lowBal,double highBal,char gender, boolean isActive, String startsString);
}   
