package com.example.Surplus_Exchange_Platform.review.controller;

import com.example.Surplus_Exchange_Platform.review.api.ReviewApi;
import com.example.Surplus_Exchange_Platform.review.dto.request.CreateReviewRequest;
import com.example.Surplus_Exchange_Platform.review.dto.response.ReviewResponse;
import com.example.Surplus_Exchange_Platform.review.service.interfaces.ReviewService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController implements ReviewApi {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @Override
    @PostMapping("/products/{productId}")
    public ResponseEntity<ReviewResponse> createReview(
            @PathVariable Long productId,
            @Valid @RequestBody CreateReviewRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                reviewService.createReview(
                        authentication.getName(),
                        productId,
                        request)
        );
    }

    @Override
    @GetMapping("/products/{productId}")
    public ResponseEntity<Page<ReviewResponse>> getProductReviews(
            @PathVariable Long productId,
            Pageable pageable) {

        return ResponseEntity.ok(
                reviewService.getProductReviews(
                        productId,
                        pageable)
        );
    }

    @Override
    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable Long reviewId,
            @Valid @RequestBody CreateReviewRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                reviewService.updateReview(
                        authentication.getName(),
                        reviewId,
                        request)
        );
    }

    @Override
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long reviewId,
            Authentication authentication) {

        reviewService.deleteReview(
                authentication.getName(),
                reviewId);

        return ResponseEntity.ok().build();
    }
}
