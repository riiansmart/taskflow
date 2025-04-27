package com.taskflow.backend.service;

import com.taskflow.backend.dto.PageRequest;
import com.taskflow.backend.exception.ResourceNotFoundException;
import com.taskflow.backend.model.Task;
import com.taskflow.backend.model.User;
import com.taskflow.backend.repository.TaskRepository;
import com.taskflow.backend.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public Page<Task> getUserTasks(com.taskflow.backend.dto.PageRequest pageRequest) {
        Sort.Direction direction = Sort.Direction.fromString(pageRequest.getDirection().toUpperCase());
        Sort sort = pageRequest.getSort() != null ? 
            Sort.by(direction, pageRequest.getSort()) : 
            Sort.by(Sort.Direction.DESC, "createdAt");

        org.springframework.data.domain.PageRequest springPageRequest = 
            org.springframework.data.domain.PageRequest.of(pageRequest.getPage(), pageRequest.getSize(), sort);

        // TODO: Implement search and filter functionality
        return taskRepository.findAll(springPageRequest);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
    }

    @Transactional
    public Task createTask(Task task) {
        // TODO: Set current user
        return taskRepository.save(task);
    }

    @Transactional
    public Task updateTask(Long id, Task task) {
        Task existingTask = getTaskById(id);
        // TODO: Update task fields
        return taskRepository.save(existingTask);
    }

    @Transactional
    public void deleteTask(Long id) {
        Task task = getTaskById(id);
        taskRepository.delete(task);
    }

    @Transactional
    public List<Task> createBulkTasks(List<Task> tasks) {
        // TODO: Set current user for all tasks
        return taskRepository.saveAll(tasks);
    }

    @Transactional
    public List<Task> updateBulkTasks(List<Task> tasks) {
        // TODO: Validate and update tasks
        return taskRepository.saveAll(tasks);
    }

    @Transactional
    public void deleteBulkTasks(List<Long> taskIds) {
        taskRepository.deleteAllById(taskIds);
    }
}
