package com.example.Surplus_Exchange_Platform.category.service.implementations;

import com.example.Surplus_Exchange_Platform.category.dto.request.CreateCategoryRequest;
import com.example.Surplus_Exchange_Platform.category.dto.request.UpdateCategoryRequest;
import com.example.Surplus_Exchange_Platform.category.dto.response.CategoryResponse;
import com.example.Surplus_Exchange_Platform.category.entity.Category;
import com.example.Surplus_Exchange_Platform.category.repository.CategoryRepository;
import com.example.Surplus_Exchange_Platform.category.service.interfaces.CategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    @Transactional
    public CategoryResponse create(CreateCategoryRequest request) {

        String name = request.getName().trim();

        if (categoryRepository.existsByNameIgnoreCase(name)) {
            throw new IllegalArgumentException(
                    "Category already exists");
        }

        Category category = new Category();
        category.setName(name);
        category.setDescription(
                request.getDescription() == null
                        ? null
                        : request.getDescription().trim());
        category.setActive(true);

        return toResponse(categoryRepository.save(category));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllActive() {

        return categoryRepository
                .findByActiveTrueOrderByNameAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Category not found"));

        return toResponse(category);
    }

    @Override
    @Transactional
    public CategoryResponse update(
            Long id,
            UpdateCategoryRequest request) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Category not found"));

        String name = request.getName().trim();

        categoryRepository.findByNameIgnoreCase(name)
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new IllegalArgumentException(
                                "Category already exists");
                    }
                });

        category.setName(name);
        category.setDescription(
                request.getDescription() == null
                        ? null
                        : request.getDescription().trim());

        if (request.getActive() != null) {
            category.setActive(request.getActive());
        }

        return toResponse(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public void delete(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Category not found"));

        /*
         * Soft delete is safer because products may reference
         * this category later.
         */
        category.setActive(false);
        categoryRepository.save(category);
    }

    private CategoryResponse toResponse(Category category) {

        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.isActive()
        );
    }
}
