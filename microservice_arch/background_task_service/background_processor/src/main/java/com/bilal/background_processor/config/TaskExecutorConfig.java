package com.bilal.background_processor.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
public class TaskExecutorConfig {

    @Bean(name = "taskExecutor")
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);       // Number of core threads
        executor.setMaxPoolSize(10);       // Max threads
        executor.setQueueCapacity(50);     // Task queue before rejecting
        executor.setThreadNamePrefix("TaskExecutor-");
        executor.initialize();
        return executor;
    }
}
