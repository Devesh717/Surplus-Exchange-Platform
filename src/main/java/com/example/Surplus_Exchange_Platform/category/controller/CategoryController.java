package com.example.Surplus_Exchange_Platform.category.controller;

import com.example.Surplus_Exchange_Platform.category.api.CategoryApi;
import com.example.Surplus_Exchange_Platform.category.dto.request.CreateCategoryRequest;
import com.example.Surplus_Exchange_Platform.category.dto.request.UpdateCategoryRequest;
import com.example.Surplus_Exchange_Platform.category.dto.response.CategoryResponse;
import com.example.Surplus_Exchange_Platform.category.service.interfaces.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController implements CategoryApi {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    @PostMapping
    public ResponseEntity<CategoryResponse> create(
            @Valid @RequestBody CreateCategoryRequest request) {

        return ResponseEntity.ok(
                categoryService.create(request)
        );
    }

    @Override
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllActive() {

        return ResponseEntity.ok(
                categoryService.getAllActive()
        );
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                categoryService.getById(id)
        );
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCategoryRequest request) {

        return ResponseEntity.ok(
                categoryService.update(id, request)
        );
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        categoryService.delete(id);
        return ResponseEntity.ok().build();
    }
}
