package com.example.Surplus_Exchange_Platform.review.api;

import com.example.Surplus_Exchange_Platform.review.dto.request.CreateReviewRequest;
import com.example.Surplus_Exchange_Platform.review.dto.response.ReviewResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Reviews & Ratings",
        description = "Product Review and Rating Endpoints"
)
public interface ReviewApi {

    @Operation(
            summary = "Create Review",
            description = "Create a review after a delivered purchase"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Review created"),
            @ApiResponse(responseCode = "400", description = "Not purchased, not delivered, or already reviewed"),
            @ApiResponse(responseCode = "403", description = "Buyer access required")
    })
    ResponseEntity<ReviewResponse> createReview(
            @PathVariable Long productId,
            @Valid @RequestBody CreateReviewRequest request,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Get Product Reviews",
            description = "Get reviews and ratings for a product"
    )
    ResponseEntity<Page<ReviewResponse>> getProductReviews(
            @PathVariable Long productId,
            Pageable pageable);

    @Operation(
            summary = "Update Review",
            description = "Update your own product review"
    )
    ResponseEntity<ReviewResponse> updateReview(
            @PathVariable Long reviewId,
            @Valid @RequestBody CreateReviewRequest request,
            org.springframework.security.core.Authentication authentication);

    @Operation(
            summary = "Delete Review",
            description = "Delete your own product review"
    )
    ResponseEntity<Void> deleteReview(
            @PathVariable Long reviewId,
            org.springframework.security.core.Authentication authentication);
}
