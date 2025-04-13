package com.taskflow.backend.service;

import com.taskflow.backend.model.Task;
import com.taskflow.backend.model.User;
import com.taskflow.rbackend.epository.TaskRepository;
import com.taskflow.backend.security.CurrentUser;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final CurrentUser currentUser;

    public TaskService(TaskRepository taskRepository, CurrentUser currentUser) {
        this.taskRepository = taskRepository;
        this.currentUser = currentUser;
    }

    // Get all tasks for current user
    public List<Task> getUserTasks() {
        User user = currentUser.get();
        return taskRepository.findByUserId(user.getId());
    }

    // Get specific task by ID
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    // Create a new task and associate with current user
    public Task createTask(Task task) {
        task.setUser(currentUser.get());
        return taskRepository.save(task);
    }

    // Update existing task
    public Task updateTask(Long id, Task newTask) {
        Task existing = getTaskById(id);
        existing.setTitle(newTask.getTitle());
        existing.setDescription(newTask.getDescription());
        existing.setDueDate(newTask.getDueDate());
        existing.setPriority(newTask.getPriority());
        existing.setCompleted(newTask.isCompleted());
        return taskRepository.save(existing);
    }

    // Delete task by ID
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}