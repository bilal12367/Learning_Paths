package com.example;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.example.dto.Student;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
        ApplicationContext context = 
                new ClassPathXmlApplicationContext("config.xml");
        Student stud = context.getBean(Student.class);
        
        System.out.println(stud.toString());
    }
}
