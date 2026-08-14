package com.example.Surplus_Exchange_Platform.search.controller;

import com.example.Surplus_Exchange_Platform.search.api.ProductSearchApi;
import com.example.Surplus_Exchange_Platform.search.dto.response.SearchProductResponse;
import com.example.Surplus_Exchange_Platform.search.service.interfaces.ProductSearchService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/products/search")
public class ProductSearchController implements ProductSearchApi {

    private final ProductSearchService productSearchService;

    public ProductSearchController(
            ProductSearchService productSearchService) {
        this.productSearchService = productSearchService;
    }

    @Override
    @GetMapping
    public ResponseEntity<Page<SearchProductResponse>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "false") boolean availableOnly,
            Pageable pageable) {

        return ResponseEntity.ok(
                productSearchService.search(
                        keyword,
                        categoryId,
                        minPrice,
                        maxPrice,
                        availableOnly,
                        pageable)
        );
    }
}
