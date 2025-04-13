package com.taskflow.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.taskflow.backend.model.User;
import com.taskflow.backend.repository.UserRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.Optional;

class UserServiceTests {

    private final UserRepository userRepository = mock(UserRepository.class);
    private final UserService userService = new UserService(userRepository);

    @BeforeEach
    void setupSecurityContext() {
        SecurityContext context = mock(SecurityContext.class);
        Authentication auth = mock(Authentication.class);

        when(auth.getPrincipal()).thenReturn("test@example.com");
        when(context.getAuthentication()).thenReturn(auth);

        // Mock the static SecurityContextHolder.getContext()
        MockedStatic<SecurityContextHolder> securityContextHolderMock = mockStatic(SecurityContextHolder.class);
        securityContextHolderMock.when(SecurityContextHolder::getContext).thenReturn(context);
    }

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
