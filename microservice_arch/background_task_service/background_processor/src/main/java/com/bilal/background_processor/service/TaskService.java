package com.bilal.background_processor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.bilal.background_processor.DTO.TaskStatusEnum;
import com.bilal.background_processor.entities.Task;
import com.bilal.background_processor.repo.TaskRepository;

@Service
public class TaskService {
    // Run method every second
    @Autowired
    private TaskRepository taskRepository;

    private List<Task> getPendingTasks() {
        return taskRepository.findByStatusOrderByCreatedAtDesc(TaskStatusEnum.PENDING);
    }


    @Scheduled(cron = "* */5 * * * *")
    @Async("taskExecutor")
    public void processTask() {
        System.out.println("Scheduler Started ... ");
        List<Task> tasks = getPendingTasks();
        System.out.println("Found " + tasks.size() + " pending tasks.");
        for (Task task : tasks) {
            try {
                // Simulate task processing
                System.out.println("Processing task: " + task.getTaskId());
                Thread.sleep(5000); // Simulate time-consuming task
                task.setStatus(TaskStatusEnum.COMPLETED);
                task.setResult("Completed Result!!");
            } catch (InterruptedException e) {
                task.setStatus(TaskStatusEnum.FAILED);
            } finally {
                taskRepository.save(task);
            }
        }
    }
}
