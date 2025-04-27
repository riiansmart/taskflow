package com.taskflow.backend.dto;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

// DTO for task creation or update requests
@Data
public class TaskRequest {
    private String title;
    private String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dueDate;
    private String priority;
    private boolean completed;
    private Long categoryId;
}
