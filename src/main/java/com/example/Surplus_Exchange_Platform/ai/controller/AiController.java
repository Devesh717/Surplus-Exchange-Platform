package com.example.Surplus_Exchange_Platform.ai.controller;

import com.example.Surplus_Exchange_Platform.ai.api.AiApi;
import com.example.Surplus_Exchange_Platform.ai.dto.request.ChatRequest;
import com.example.Surplus_Exchange_Platform.ai.dto.request.ProductDescriptionRequest;
import com.example.Surplus_Exchange_Platform.ai.dto.request.ProductRecommendationRequest;
import com.example.Surplus_Exchange_Platform.ai.dto.response.AiResponse;
import com.example.Surplus_Exchange_Platform.ai.service.interfaces.AiService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiController implements AiApi {

    private final AiService aiService;
    private static final Logger log =
            LoggerFactory.getLogger(AiController.class);

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @Override
    @PostMapping("/product-description")
    public ResponseEntity<AiResponse> generateProductDescription(
            @Valid @RequestBody ProductDescriptionRequest request) {

        log.info("========== AI CONTROLLER ==========");
        log.info("Product description request received");
        log.info("Product name: {}", request.getProductName());
        log.info("Condition: {}", request.getCondition());

        try {

            String description =
                    aiService.generateProductDescription(request);

            log.info("AI service completed successfully");
            log.info("Generated description received");

            return ResponseEntity.ok(
                    new AiResponse(description)
            );

        } catch (Exception e) {

            log.error(
                    "AI product description generation failed",
                    e
            );

            throw e;
        }
    }

    @Override
    @PostMapping("/chat")
    public ResponseEntity<AiResponse> chat(
            @Valid @RequestBody ChatRequest request) {

        return ResponseEntity.ok(
                new AiResponse(
                        aiService.chat(request.getMessage()))
        );
    }

    @Override
    @PostMapping("/recommendations")
    public ResponseEntity<AiResponse> recommendProducts(
            @Valid @RequestBody ProductRecommendationRequest request) {

        return ResponseEntity.ok(
                new AiResponse(
                        aiService.recommendProducts(
                                request.getRequirement()))
        );
    }
}
