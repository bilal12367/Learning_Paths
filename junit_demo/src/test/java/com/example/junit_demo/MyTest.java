package com.example.junit_demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.junit_demo.service.TestService;
import com.example.junit_demo.service.UserService;

public class MyTest {
    // @Mock
    @Mock
    private TestService testService;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void test() {
        String str = "This is not from service this is mock data";
        String str2 = "This is Test Message!!";
        when(testService.testMethod("123")).thenReturn(str);
        String res = this.userService.testUserService("123");

        System.out.println("Result: "+res);
        assertEquals(str, res);
    }
}
