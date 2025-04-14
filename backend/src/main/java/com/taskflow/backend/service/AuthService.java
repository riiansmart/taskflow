package com.taskflow.backend.service;

import com.taskflow.backend.dto.JwtResponse;
import com.taskflow.backend.dto.LoginRequest;
import com.taskflow.backend.dto.RegisterRequest;
import com.taskflow.backend.model.User;
import com.taskflow.backend.repository.UserRepository;
import com.taskflow.backend.security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    // Authenticate user and return JWT response
    public JwtResponse login(LoginRequest request) {
        System.out.println("=== LOGIN DEBUG START ===");
        System.out.println("Email input: " + request.getEmail());
        System.out.println("Password input: " + request.getPassword());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    System.out.println("User not found for email: " + request.getEmail());
                    return new RuntimeException("Invalid email or password");
                });

        System.out.println("Found user: " + user.getEmail());
        System.out.println("Encoded password in DB: " + user.getPassword());
        boolean match = passwordEncoder.matches(request.getPassword(), user.getPassword());
        System.out.println("Password match result: " + match);

        if (!match) {
            System.out.println("Password did not match!");
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtils.generateToken(user);
        System.out.println("JWT Token generated: " + token);
        System.out.println("=== LOGIN DEBUG END ===");

        return new JwtResponse(token, user);
    }

    // Register new user with encrypted password
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        userRepository.save(user);
    }
}