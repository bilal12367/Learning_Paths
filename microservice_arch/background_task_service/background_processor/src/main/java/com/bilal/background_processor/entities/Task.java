package com.bilal.background_processor.entities;

import com.bilal.background_processor.DTO.TaskStatusEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity(name = "background_tasks")
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String taskId;
    
    @Column()
    private String taskTypeId;
    
    @Column()
    private String payload;
    
    @Enumerated(EnumType.ORDINAL)
    private TaskStatusEnum status;
    
    @Column()
    private String result;
    
    @Column()
    private String createdAt;
    
    @Column()
    private String updatedAt;
    
    @Column()
    private int retryCount;

}
