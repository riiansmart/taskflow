package com.taskflow.backend.service;

import com.taskflow.backend.model.Task;
import com.taskflow.backend.model.User;
import com.taskflow.backend.repository.TaskRepository;
import com.taskflow.backend.repository.UserRepository;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // Get the currently authenticated user from security context
    private String getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof org.springframework.security.core.userdetails.User userDetails) {
            return userDetails.getUsername(); // this is the email
        }

        return null;
    }

    // Get all tasks for the current user
    public List<Task> getUserTasks() {
        String username = getAuthenticatedUser();
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskRepository.findByUserId(user.getId());
    }

    // Get a specific task by ID
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    // Create a new task and assign to the current user
    public Task createTask(Task task) {
        String username = getAuthenticatedUser();
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        task.setUser(user);
        return taskRepository.save(task);
    }

    // Update an existing task
    public Task updateTask(Long id, Task newTask) {
        Task existing = getTaskById(id);
        existing.setTitle(newTask.getTitle());
        existing.setDescription(newTask.getDescription());
        existing.setDueDate(newTask.getDueDate());
        existing.setPriority(newTask.getPriority());
        existing.setCompleted(newTask.isCompleted());
        return taskRepository.save(existing);
    }

    // Delete a task by ID
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
