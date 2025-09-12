package com.bilal.background_processor.entities;

import com.bilal.background_processor.DTO.TaskStatusEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity(name = "task_status")
public class TaskStatus {

    @Id
    private int id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "task_id", referencedColumnName = "taskId")
    private Task task;

    @Column()
    @Enumerated(EnumType.ORDINAL)
    private TaskStatusEnum status;

    @Column()
    private boolean isCompleted;

    @Column()
    private boolean isError;

    @Column()
    private String result;

    @Column()
    private String errorPayload;

    @Column()
    private int retryCount;

    @Column()
    private String updatedAt;

}
