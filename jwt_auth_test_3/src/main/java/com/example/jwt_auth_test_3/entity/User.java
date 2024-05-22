package com.example.jwt_auth_test_3.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 5, message = "Username Should be atleast 5 characters.")
    @NotNull(message = "Username Should be provided.")
    private String userName;

    public User(
            @Size(min = 5, message = "Username Should be atleast 5 characters.") @NotNull(message = "Username Should be provided.") String userName,
            @Email(message = "Please Provide Valid Email.") String email,
            @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$", message = "Password must be strong") String password,
            @NotNull(message = "Gender must be provided.") char gender) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.gender = gender;
    }

    @Email(message = "Please Provide Valid Email.")
    private String email;

    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$", message = "Password must be strong")
    private String password;

    @NotNull(message = "Gender must be provided.")
    private char gender;

    
}
