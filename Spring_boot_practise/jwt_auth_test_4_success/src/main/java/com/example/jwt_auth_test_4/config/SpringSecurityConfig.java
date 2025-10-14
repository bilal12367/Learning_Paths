package com.example.jwt_auth_test_4.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import com.example.jwt_auth_test_4.models.User;
import com.example.jwt_auth_test_4.repository.UserRepository;

@Configuration
public class SpringSecurityConfig implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // @Bean
    // public UserDetailsService userDetailsService() {
    //     UserDetails adminUserDetails = org.springframework.security.core.userdetails.User.builder()
    //         .username("admin")
    //         .password(passwordEncoder().encode("admin"))
    //         .roles("ADMIN")
    //         .build();
            
    //     UserDetails normalUserDetails = org.springframework.security.core.userdetails.User.builder()
    //         .username("user")
    //         .password(passwordEncoder().encode("user"))
    //         .roles("USER")
    //         .build();
        
    //     // return new InMemoryUserDetailsManager(adminUserDetails, normalUserDetails);
    // }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        User user = userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("User Not Found!!"));
        return org.springframework.security.core.userdetails.User.builder().username(user.getUsername()).password(passwordEncoder().encode(user.getPassword())).roles("USER").build();
    }
}
