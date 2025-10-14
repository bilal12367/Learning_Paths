package com.example.hibernate_and_jpa_learning.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.persistence.GenerationType;

@Entity
@Data()
@AllArgsConstructor
public class User {
    
    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column()
    private String name;

    @Column(unique = true)
    private String email;
    
    @Column()
    private int age;
}
