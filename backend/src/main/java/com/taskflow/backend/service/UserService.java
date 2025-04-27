package com.taskflow.backend.service;

import com.taskflow.backend.dto.PageRequest;
import com.taskflow.backend.exception.ResourceNotFoundException;
import com.taskflow.backend.exception.UnauthorizedException;
import com.taskflow.backend.model.User;
import com.taskflow.backend.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getCurrentUser() {
        // TODO: Implement getting current user from security context
        throw new UnauthorizedException("Not implemented");
    }

    @Transactional
    public User updateUser(User user) {
        User existingUser = getCurrentUser();
        // TODO: Update user fields
        return userRepository.save(existingUser);
    }

    public Map<String, Object> getUserPreferences() {
        User user = getCurrentUser();
        return user.getSettings();
    }

    @Transactional
    public void updateUserPreferences(Object preferences) {
        User user = getCurrentUser();
        user.setSettings((Map<String, Object>) preferences);
        userRepository.save(user);
    }

    public Page<?> getUserActivity(PageRequest pageRequest) {
        User user = getCurrentUser();
        // TODO: Implement user activity tracking
        return Page.empty();
    }

    @Transactional
    public void changePassword(String currentPassword, String newPassword) {
        User user = getCurrentUser();
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new UnauthorizedException("Current password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Transactional
    public void requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        // TODO: Generate and send reset token
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        // TODO: Validate token and reset password
        throw new UnauthorizedException("Not implemented");
    }
}
