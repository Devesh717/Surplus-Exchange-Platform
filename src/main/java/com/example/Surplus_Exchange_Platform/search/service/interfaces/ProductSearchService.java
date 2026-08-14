package com.example.Surplus_Exchange_Platform.search.service.interfaces;

import com.example.Surplus_Exchange_Platform.search.dto.response.SearchProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;

public interface ProductSearchService {

    Page<SearchProductResponse> search(
            String keyword,
            Long categoryId,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            boolean availableOnly,
            Pageable pageable);
}
