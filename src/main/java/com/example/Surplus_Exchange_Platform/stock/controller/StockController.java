package com.example.Surplus_Exchange_Platform.stock.controller;

import com.example.Surplus_Exchange_Platform.stock.api.StockApi;
import com.example.Surplus_Exchange_Platform.stock.dto.request.UpdateStockRequest;
import com.example.Surplus_Exchange_Platform.stock.dto.response.StockResponse;
import com.example.Surplus_Exchange_Platform.stock.service.interfaces.StockService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller/products")
public class StockController implements StockApi {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @Override
    @GetMapping("/{productId}/stock")
    public ResponseEntity<StockResponse> getStock(
            @PathVariable Long productId) {

        return ResponseEntity.ok(
                stockService.getStock(productId));
    }

    @Override
    @PutMapping("/{productId}/stock")
    public ResponseEntity<StockResponse> updateStock(
            @PathVariable Long productId,
            @Valid @RequestBody UpdateStockRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                stockService.updateStock(
                        authentication.getName(),
                        productId,
                        request)
        );
    }

    @Override
    @PutMapping("/{productId}/stock/increase")
    public ResponseEntity<StockResponse> increaseStock(
            @PathVariable Long productId,
            @RequestParam int quantity,
            Authentication authentication) {

        return ResponseEntity.ok(
                stockService.increaseStock(
                        authentication.getName(),
                        productId,
                        quantity)
        );
    }
}
