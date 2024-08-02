package com.example.jpa_practise.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.example.jpa_practise.models.Customer;
import com.example.jpa_practise.repository.CustomerRepository;

@Service
public class CustomerService {
    


    @Autowired
    private CustomerRepository customerRepository;

    
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Cacheable(key = "#customer.customerId", value="productsCache")
    @CacheEvict(value = "productsCache",allEntries = true)
    public Customer registerOrUpdateCustomer(Customer customer)  {
        System.out.println("Operating on db for save or update");
        return customerRepository.save(customer);
    }

    @Cacheable(key = "#customerId", value="productsCache")
    public Customer getCustomerById(long customerId) throws Exception {
        System.out.println("Operating on db get by id");
        Optional<Customer> optCustomer = customerRepository.findById(customerId);
        if(!optCustomer.isPresent()) 
            throw new Exception("Product Doesn't Exists");
        
        return optCustomer.get();
    }


    @Cacheable(value = "productsCache",sync = true)
    public List<Customer> getAllCustomers() {
        System.out.println("Operating on db get all");
        return customerRepository.findAll();
    }
}
