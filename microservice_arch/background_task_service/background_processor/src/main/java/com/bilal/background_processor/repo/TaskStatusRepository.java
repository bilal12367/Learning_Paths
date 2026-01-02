package com.bilal.background_processor.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bilal.background_processor.entities.TaskStatus;

@Repository()
public interface TaskStatusRepository extends JpaRepository<TaskStatus, Integer> {
    
}
