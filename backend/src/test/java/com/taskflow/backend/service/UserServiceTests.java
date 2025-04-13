package com.taskflow.backend.service;

import com.taskflow.backend.model.User;
import com.taskflow.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class UserServiceTests {

    private final UserRepository userRepository = mock(UserRepository.class);
    private final UserService userService = new UserService(userRepository);

    @Test
    void testUpdateUserProfile() {
        User currentUser = new User();
        currentUser.setEmail("test@example.com");
        currentUser.setName("Old Name");

        User updatedUser = new User();
        updatedUser.setEmail("test@example.com");
        updatedUser.setName("New Name");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(currentUser));
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);

        User result = userService.updateUser(updatedUser);

        assertEquals("New Name", result.getName());
    }
}
