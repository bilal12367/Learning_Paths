package com.example.hibernate_and_jpa_learning.tester;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.example.hibernate_and_jpa_learning.models.User;

@Component
public class StartupExecutor implements ApplicationRunner {
    private final SessionFactory sessionFactory;

    public StartupExecutor(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // TODO Auto-generated method stub
        try (Session session = sessionFactory.openSession()) {
            Transaction tx = session.beginTransaction();

            // Example: Your Hibernate practice code here
            // For example, save an entity:
            // MyEntity entity = new MyEntity();
            // entity.setName("Hello Hibernate");
            // session.save(entity);

            User user = new User(null, "bilal", "test1@gmail.com", 20);
            session.save(user);
            User savedUser = (User) session.createQuery("FROM User where email=:email").setParameter("email", user.getEmail()).getSingleResultOrNull();
            System.out.println(savedUser.toString());
            
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    
}
