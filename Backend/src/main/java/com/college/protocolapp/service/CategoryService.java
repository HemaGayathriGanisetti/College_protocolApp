 package com.college.protocolapp.service;

import com.college.protocolapp.dto.CategoryRequest;
import com.college.protocolapp.dto.CategoryResponse;
import com.college.protocolapp.model.Category;
import com.college.protocolapp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepo;

    // CREATE
    public CategoryResponse add(CategoryRequest dto) {

        Category c = new Category();
        c.setName(dto.getName());
        c.setDescription(dto.getDescription());

        Category saved = categoryRepo.save(c);

        return mapToResponse(saved);
    }

    // GET ALL
    public List<CategoryResponse> getAll() {
        return categoryRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // GET BY ID
    public CategoryResponse getById(Long id) {
        Category c = categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return mapToResponse(c);
    }

    // DELETE
    public void delete(Long id) {
        categoryRepo.deleteById(id);
    }

    // MAPPER
    private CategoryResponse mapToResponse(Category c) {
        return new CategoryResponse(
                c.getId(),
                c.getName(),
                c.getDescription()
        );
    }
}
