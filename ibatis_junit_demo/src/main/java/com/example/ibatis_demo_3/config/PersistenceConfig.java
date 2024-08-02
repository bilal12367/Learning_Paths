package com.example.ibatis_demo_3.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
@MapperScan("com.baeldung.mybatis")
public class PersistenceConfig {

    // Three Beans are needed.
    // 1. Datasource for db config
    // 2. SqlSessionFactory bean for db operations.
    // 3. Mapper Config which maps the xml and interface files.

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource source = new DriverManagerDataSource();
        source.setDriverClassName("com.mysql.cj.jdbc.Driver");
        source.setUrl("jdbc:mysql://localhost:3306/dev");
        source.setPassword("root");
        source.setUsername("root");
        return source;
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory() throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource());
        factoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:/com/example/ibatis_demo_3/dao/*.xml"));
        // factoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mappers/*.xml"));
        return factoryBean.getObject();
    }

    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() {
        MapperScannerConfigurer configurer = new MapperScannerConfigurer();
        configurer.setBasePackage("com.example.ibatis_demo_3.dao"); // Change to your mapper package
        return configurer;
    }
}