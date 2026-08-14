package com.example.Surplus_Exchange_Platform.stock.api;

import com.example.Surplus_Exchange_Platform.stock.dto.request.UpdateStockRequest;
import com.example.Surplus_Exchange_Platform.stock.dto.response.StockResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

@Tag(
        name = "Stock Management",
        description = "Seller Product Stock Management"
)
public interface StockApi {

    @Operation(
            summary = "View Product Stock",
            description = "Get current stock quantity and availability")
    ResponseEntity<StockResponse> getStock(Long productId);

    @Operation(
            summary = "Update Product Stock",
            description = "Set the product stock quantity")
    @ApiResponse(
            responseCode = "200",
            description = "Stock updated successfully")
    ResponseEntity<StockResponse> updateStock(
            Long productId,
            @Valid UpdateStockRequest request,
            Authentication authentication);

    @Operation(
            summary = "Increase Product Stock",
            description = "Increase stock quantity for a seller product")
    ResponseEntity<StockResponse> increaseStock(
            Long productId,
            int quantity,
            Authentication authentication);
}
