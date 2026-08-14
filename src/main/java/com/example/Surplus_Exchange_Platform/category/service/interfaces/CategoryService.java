package com.example.Surplus_Exchange_Platform.category.service.interfaces;

import com.example.Surplus_Exchange_Platform.category.dto.request.CreateCategoryRequest;
import com.example.Surplus_Exchange_Platform.category.dto.request.UpdateCategoryRequest;
import com.example.Surplus_Exchange_Platform.category.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {

    CategoryResponse create(CreateCategoryRequest request);

    List<CategoryResponse> getAllActive();

    CategoryResponse getById(Long id);

    CategoryResponse update(Long id, UpdateCategoryRequest request);

    void delete(Long id);
}
