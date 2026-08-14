package com.example.Surplus_Exchange_Platform.product.controller;

import com.example.Surplus_Exchange_Platform.product.api.ProductApi;
import com.example.Surplus_Exchange_Platform.product.dto.request.CreateProductRequest;
import com.example.Surplus_Exchange_Platform.product.dto.request.UpdateProductRequest;
import com.example.Surplus_Exchange_Platform.product.dto.response.ProductResponse;
import com.example.Surplus_Exchange_Platform.product.service.interfaces.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController implements ProductApi {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Override
    @PostMapping
    public ResponseEntity<ProductResponse> create(
            @Valid @RequestBody CreateProductRequest request,
            HttpServletRequest servletRequest) {

        Authentication authentication =
                (Authentication) servletRequest.getUserPrincipal();

        return ResponseEntity.ok(
                productService.create(
                        authentication.getName(),
                        request)
        );
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getById(id)
        );
    }

    @Override
    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAll(
            Pageable pageable) {

        return ResponseEntity.ok(
                productService.getAll(pageable)
        );
    }

    @Override
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<ProductResponse>> getByCategory(
            @PathVariable Long categoryId,
            Pageable pageable) {

        return ResponseEntity.ok(
                productService.getByCategory(
                        categoryId,
                        pageable)
        );
    }

    @Override
    @GetMapping("/seller/me")
    public ResponseEntity<Page<ProductResponse>> getMyProducts(
            Pageable pageable,
            HttpServletRequest servletRequest) {

        Authentication authentication =
                (Authentication) servletRequest.getUserPrincipal();

        return ResponseEntity.ok(
                productService.getMyProducts(
                        authentication.getName(),
                        pageable)
        );
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProductRequest request,
            HttpServletRequest servletRequest) {

        Authentication authentication =
                (Authentication) servletRequest.getUserPrincipal();

        return ResponseEntity.ok(
                productService.update(
                        authentication.getName(),
                        id,
                        request)
        );
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            HttpServletRequest servletRequest) {

        Authentication authentication =
                (Authentication) servletRequest.getUserPrincipal();

        productService.delete(
                authentication.getName(),
                id);

        return ResponseEntity.ok().build();
    }
}
