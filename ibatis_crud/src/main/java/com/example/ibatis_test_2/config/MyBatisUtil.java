package com.example.ibatis_test_2.config;

import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.context.annotation.Bean;

public class MyBatisUtil {
    private static SqlSessionFactory sessionFactory;

    static {
        Reader reader;
        try {
            reader = Resources.getResourceAsReader("com/example/ibatis_test_2/config/mybatis-config.xml");
            sessionFactory = new SqlSessionFactoryBuilder().build(reader);

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }

    }

    // @Bean
    public static SqlSessionFactory getSqlSessionFactory() {
        return sessionFactory;
    }
}
