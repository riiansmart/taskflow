package com.taskflow.backend.dto;

import lombok.Data;
import java.time.LocalDate;

// DTO for task creation or update requests
@Data
public class TaskRequest {
    private String title;
    private String description;
    private LocalDate dueDate;
    private String priority;
    private boolean completed;
    private Long categoryId;
}
