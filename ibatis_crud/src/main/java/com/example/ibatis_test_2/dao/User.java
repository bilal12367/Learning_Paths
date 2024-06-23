package com.example.ibatis_test_2.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private Long id;
    private String username;
    private String email;
    private String address;
    public User(String username, String email, String address) {
        this.username = username;
        this.email = email;
        this.address = address;
    }
    
}
