package com.bilal.background_processor.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bilal.background_processor.DTO.TaskStatusEnum;
import com.bilal.background_processor.entities.Task;

@Repository()
public interface TaskRepository extends JpaRepository<Task, String> {
    public List<Task> findByStatusOrderByCreatedAtDesc(TaskStatusEnum status);
}
