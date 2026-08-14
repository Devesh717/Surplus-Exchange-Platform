package com.example.Surplus_Exchange_Platform.stock.service.interfaces;

import com.example.Surplus_Exchange_Platform.stock.dto.request.UpdateStockRequest;
import com.example.Surplus_Exchange_Platform.stock.dto.response.StockResponse;

public interface StockService {

    StockResponse getStock(Long productId);

    StockResponse updateStock(
            String sellerEmail,
            Long productId,
            UpdateStockRequest request);

    StockResponse increaseStock(
            String sellerEmail,
            Long productId,
            int quantity);

    StockResponse decreaseStock(
            Long productId,
            int quantity);
}
