package com.example.Surplus_Exchange_Platform.ai.service.interfaces;

import com.example.Surplus_Exchange_Platform.ai.dto.request.ProductDescriptionRequest;

public interface AiService {

    String generateProductDescription(ProductDescriptionRequest request);

    String chat(String message);

    String recommendProducts(String requirement);
}
