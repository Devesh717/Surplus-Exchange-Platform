package com.example.Surplus_Exchange_Platform.ai.api;

import com.example.Surplus_Exchange_Platform.ai.dto.request.ChatRequest;
import com.example.Surplus_Exchange_Platform.ai.dto.request.ProductDescriptionRequest;
import com.example.Surplus_Exchange_Platform.ai.dto.request.ProductRecommendationRequest;
import com.example.Surplus_Exchange_Platform.ai.dto.response.AiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(
        name = "AI",
        description = "AI Product Description, Recommendations and Customer Support Endpoints"
)
public interface AiApi {

    @Operation(
            summary = "Generate Product Description",
            description = "Generate a marketplace-ready product description using Spring AI"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Description generated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid product information")
    })
    ResponseEntity<AiResponse> generateProductDescription(
            @Valid @RequestBody ProductDescriptionRequest request);

    @Operation(
            summary = "Customer Support Chat",
            description = "Ask the AI assistant a question; product questions can use live marketplace inventory"
    )
    ResponseEntity<AiResponse> chat(
            @Valid @RequestBody ChatRequest request);

    @Operation(
            summary = "AI Product Recommendations",
            description = "Find suitable active and admin-verified marketplace products from a natural-language requirement"
    )
    ResponseEntity<AiResponse> recommendProducts(
            @Valid @RequestBody ProductRecommendationRequest request);
}
