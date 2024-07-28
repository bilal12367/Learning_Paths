package com.example.ibatis_demo_3.dao.model;

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
    private String userName;
    private String email;
    private String role;
    private boolean active;
    
    
}
