package com.taskflow.backend.service;

import com.taskflow.backend.model.Task;
import com.taskflow.backend.repository.TaskRepository;
import com.taskflow.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class TaskServiceTests {

    private final TaskRepository taskRepository = mock(TaskRepository.class);
    private final UserRepository userRepository = mock(UserRepository.class);
    private final TaskService taskService = new TaskService(taskRepository, userRepository);

    @Test
    void testGetTaskById() {
        Task task = new Task();
        task.setId(1L);
        task.setTitle("Test Task");

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        Task result = taskService.getTaskById(1L);
        assertEquals("Test Task", result.getTitle());
    }
}