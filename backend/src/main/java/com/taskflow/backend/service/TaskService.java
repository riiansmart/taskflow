package com.taskflow.backend.service;

import com.taskflow.backend.dto.PageRequest;
import com.taskflow.backend.exception.ResourceNotFoundException;
import com.taskflow.backend.model.Task;
import com.taskflow.backend.model.User;
import com.taskflow.backend.repository.TaskRepository;
import com.taskflow.backend.repository.UserRepository;
import com.taskflow.backend.repository.CategoryRepository;
import com.taskflow.backend.model.Category;
import com.taskflow.backend.exception.UnauthorizedException;
import com.taskflow.backend.dto.TaskRequest;
import com.taskflow.backend.model.Task.Priority;

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
    private final CategoryRepository categoryRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
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
    public Task createTask(TaskRequest request) {
        // Map DTO to entity
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        // Set due date at start of day
        if (request.getDueDate() != null) {
            task.setDueDate(request.getDueDate().atStartOfDay());
        }
        task.setPriority(Priority.valueOf(request.getPriority()));
        task.setCompleted(request.isCompleted());
        // Set the current authenticated user
        String email = getAuthenticatedUser();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("User not found with email: " + email));
        task.setUser(user);
        // Associate category if provided
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Category not found with id: " + request.getCategoryId()));
            task.setCategory(category);
        }
        return taskRepository.save(task);
    }

    @Transactional
    public Task updateTask(Long id, TaskRequest request) {
        Task existingTask = getTaskById(id);
        // Update basic fields
        existingTask.setTitle(request.getTitle());
        existingTask.setDescription(request.getDescription());
        // Convert LocalDate to LocalDateTime at start of day
        if (request.getDueDate() != null) {
            existingTask.setDueDate(request.getDueDate().atStartOfDay());
        }
        existingTask.setPriority(Priority.valueOf(request.getPriority()));
        existingTask.setCompleted(request.isCompleted());
        // Update category association
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Category not found with id: " + request.getCategoryId()));
            existingTask.setCategory(category);
        } else {
            existingTask.setCategory(null);
        }
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
