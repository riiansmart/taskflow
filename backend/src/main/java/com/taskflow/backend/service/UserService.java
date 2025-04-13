package com.taskflow.backend.service;

import com.taskflow.backend.model.User;
import com.taskflow.backend.repository.UserRepository;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Get authenticated user based on security context
    private User getAuthenticatedUser() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }

    // Return the profile of the current user
    public User getCurrentUser() {
        return getAuthenticatedUser();
    }

    // Update current user profile
    public User updateUser(User updatedUser) {
        User user = getAuthenticatedUser();
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        return userRepository.save(user);
    }
}