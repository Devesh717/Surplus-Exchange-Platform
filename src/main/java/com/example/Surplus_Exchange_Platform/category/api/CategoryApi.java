package com.example.Surplus_Exchange_Platform.category.api;

import com.example.Surplus_Exchange_Platform.category.dto.request.CreateCategoryRequest;
import com.example.Surplus_Exchange_Platform.category.dto.request.UpdateCategoryRequest;
import com.example.Surplus_Exchange_Platform.category.dto.response.CategoryResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Category",
        description = "Product Category Management Endpoints"
)
public interface CategoryApi {

    @Operation(
            summary = "Create Category",
            description = "Create a new product category. Admin only."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Category created successfully"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid request or duplicate category"
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Not authorized"
            )
    })
    ResponseEntity<CategoryResponse> create(
            @Valid @RequestBody CreateCategoryRequest request);

    @Operation(
            summary = "Get Active Categories",
            description = "Get all active product categories"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Categories retrieved successfully"
            )
    })
    ResponseEntity<List<CategoryResponse>> getAllActive();

    @Operation(
            summary = "Get Category",
            description = "Get a category by ID"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Category found"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Category not found"
            )
    })
    ResponseEntity<CategoryResponse> getById(
            @PathVariable Long id);

    @Operation(
            summary = "Update Category",
            description = "Update an existing category. Admin only."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Category updated successfully"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid request"
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Not authorized"
            )
    })
    ResponseEntity<CategoryResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCategoryRequest request);

    @Operation(
            summary = "Delete Category",
            description = "Deactivate a category. Admin only."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Category deactivated successfully"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Category not found"
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Not authorized"
            )
    })
    ResponseEntity<Void> delete(@PathVariable Long id);
}
