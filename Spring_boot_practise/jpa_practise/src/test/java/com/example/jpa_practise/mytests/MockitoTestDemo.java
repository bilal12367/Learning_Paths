package com.example.jpa_practise.mytests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.jpa_practise.models.Customer;
import com.example.jpa_practise.repository.CustomerRepository;
import com.example.jpa_practise.service.CustomerService;

public class MockitoTestDemo {
    @Autowired
    private CustomerService customerService;

    private CustomerRepository customerRepository;
    @BeforeEach
    public void setup() {
        customerRepository = mock(CustomerRepository.class);
    }

    @Test
    public void testJpa() {
        Customer cus1 = Customer.builder()
                    .customerId(11)
                    .accountBalance(22000.0)
                    .address("address1")
                    .phoneNumber(91)
                    .birthDate(new Date())
                    .customerName("cust1")
                    .gender('M')
                    .build();

        ArrayList<Customer> list = new ArrayList<>();
        list.add(cus1);
        customerService = new CustomerService(customerRepository);
        when(customerRepository.findAll()).thenReturn(list);
        List<Customer> list1 = customerService.getAllCustomers();
        for(Customer cust : list1) {
            System.out.println("Customer:" +cust.toString());
        }
        System.out.println(list1.get(0).toString());
        assertEquals(list1.get(0).getCustomerName(), "cust1");
    }
}
