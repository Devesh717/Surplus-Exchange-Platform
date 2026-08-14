package com.example.Surplus_Exchange_Platform.product.api;

import com.example.Surplus_Exchange_Platform.product.dto.request.CreateProductRequest;
import com.example.Surplus_Exchange_Platform.product.dto.request.UpdateProductRequest;
import com.example.Surplus_Exchange_Platform.product.dto.response.ProductResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Product",
        description = "Surplus Product Management and Discovery Endpoints"
)
public interface ProductApi {

    @Operation(
            summary = "Create Product",
            description = "Create a product listing as an authenticated seller"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Product created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "403", description = "Seller access required")
    })
    ResponseEntity<ProductResponse> create(
            @Valid @RequestBody CreateProductRequest request,
            jakarta.servlet.http.HttpServletRequest servletRequest);

    @Operation(
            summary = "Get Product",
            description = "Get an active product by ID"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Product found"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    ResponseEntity<ProductResponse> getById(@PathVariable Long id);

    @Operation(
            summary = "Browse Products",
            description = "Browse active products with pagination"
    )
    ResponseEntity<Page<ProductResponse>> getAll(Pageable pageable);

    @Operation(
            summary = "Get Products By Category",
            description = "Get active products belonging to a category"
    )
    ResponseEntity<Page<ProductResponse>> getByCategory(
            @PathVariable Long categoryId,
            Pageable pageable);

    @Operation(
            summary = "Get My Products",
            description = "Get the authenticated seller's active products"
    )
    ResponseEntity<Page<ProductResponse>> getMyProducts(
            Pageable pageable,
            jakarta.servlet.http.HttpServletRequest servletRequest);

    @Operation(
            summary = "Update Product",
            description = "Update a product owned by the authenticated seller"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Product updated successfully"),
            @ApiResponse(responseCode = "403", description = "Not authorized")
    })
    ResponseEntity<ProductResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProductRequest request,
            jakarta.servlet.http.HttpServletRequest servletRequest);

    @Operation(
            summary = "Delete Product",
            description = "Deactivate a product owned by the authenticated seller"
    )
    ResponseEntity<Void> delete(
            @PathVariable Long id,
            jakarta.servlet.http.HttpServletRequest servletRequest);
}
