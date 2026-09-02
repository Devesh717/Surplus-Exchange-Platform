package com.example.Surplus_Exchange_Platform.product.service.interfaces;

import com.example.Surplus_Exchange_Platform.product.dto.request.CreateProductRequest;
import com.example.Surplus_Exchange_Platform.product.dto.request.UpdateProductRequest;
import com.example.Surplus_Exchange_Platform.product.dto.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    ProductResponse create(
            String sellerEmail,
            CreateProductRequest request);

    ProductResponse getById(Long id);

    Page<ProductResponse> getAll(Pageable pageable);

    Page<ProductResponse> getByCategory(
            Long categoryId,
            Pageable pageable);
    ProductResponse getMyProductById(
            String sellerEmail,
            Long id);

    Page<ProductResponse> getMyProducts(
            String sellerEmail,
            Pageable pageable);

    ProductResponse update(
            String sellerEmail,
            Long id,
            UpdateProductRequest request);

    void delete(String sellerEmail, Long id);
}
