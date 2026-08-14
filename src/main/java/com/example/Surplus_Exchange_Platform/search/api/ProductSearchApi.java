package com.example.Surplus_Exchange_Platform.search.api;

import com.example.Surplus_Exchange_Platform.search.dto.response.SearchProductResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@Tag(
        name = "Product Search",
        description = "Product Search and Discovery Endpoints"
)
public interface ProductSearchApi {

    @Operation(
            summary = "Search Products",
            description = "Search surplus products using keyword, category, price and availability filters"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Search completed successfully"),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid search filters")
    })
    ResponseEntity<Page<SearchProductResponse>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "false") boolean availableOnly,
            Pageable pageable);
}
