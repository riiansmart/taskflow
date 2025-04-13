package com.taskflow.backend.service;

import com.taskflow.model.User;
import com.taskflow.repository.UserRepository;
import com.taskflow.security.CurrentUser;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CurrentUser currentUser;

    public UserService(UserRepository userRepository, CurrentUser currentUser) {
        this.userRepository = userRepository;
        this.currentUser = currentUser;
    }

    // Get the currently authenticated user's profile
    public User getCurrentUser() {
        return currentUser.get();
    }

    // Update authenticated user's profile info
    public User updateUser(User updatedUser) {
        User user = currentUser.get();
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        return userRepository.save(user);
    }
}
