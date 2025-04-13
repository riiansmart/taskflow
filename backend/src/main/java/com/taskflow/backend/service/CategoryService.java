package com.taskflow.backend.service;

import com.taskflow.model.Category;
import com.taskflow.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Get all categories from the database
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}