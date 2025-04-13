package com.taskflow.backend.dto;

import com.taskflow.backend.model.Task;
import lombok.AllArgsConstructor;
import lombok.Data;

// DTO for sending task data to the frontend
@Data
@AllArgsConstructor
public class TaskResponse {
    private Task task;
}
