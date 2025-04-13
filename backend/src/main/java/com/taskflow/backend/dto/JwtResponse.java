package com.taskflow.backend.dto;

import com.taskflow.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

// Response DTO sent after successful login
@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private User user;
}