package com.example.Surplus_Exchange_Platform.search.service.implementations;

import com.example.Surplus_Exchange_Platform.product.entity.Product;
import com.example.Surplus_Exchange_Platform.search.dto.response.SearchProductResponse;
import com.example.Surplus_Exchange_Platform.search.repository.ProductSearchRepository;
import com.example.Surplus_Exchange_Platform.search.service.interfaces.ProductSearchService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class ProductSearchServiceImpl implements ProductSearchService {

    private final ProductSearchRepository productSearchRepository;

    public ProductSearchServiceImpl(
            ProductSearchRepository productSearchRepository) {
        this.productSearchRepository = productSearchRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SearchProductResponse> search(
            String keyword,
            Long categoryId,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            boolean availableOnly,
            Pageable pageable) {

        if (minPrice != null && minPrice.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException(
                    "Minimum price cannot be negative");
        }

        if (maxPrice != null && maxPrice.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException(
                    "Maximum price cannot be negative");
        }

        if (minPrice != null
                && maxPrice != null
                && minPrice.compareTo(maxPrice) > 0) {
            throw new IllegalArgumentException(
                    "Minimum price cannot be greater than maximum price");
        }

        String normalizedKeyword =
                keyword == null ? "" : keyword.trim();

        return productSearchRepository.search(
                        normalizedKeyword,
                        categoryId,
                        minPrice,
                        maxPrice,
                        availableOnly,
                        pageable)
                .map(this::toResponse);
    }

    private SearchProductResponse toResponse(Product product) {

        return new SearchProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getCondition().name(),
                product.getSellingPrice(),
                product.getQuantity(),
                product.getUnit(),
                product.getCategory().getName(),
                product.getSeller().getId(),
                product.getSeller().getName()
        );
    }
}
