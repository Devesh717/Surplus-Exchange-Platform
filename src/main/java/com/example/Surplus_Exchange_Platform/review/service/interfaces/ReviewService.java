package com.example.Surplus_Exchange_Platform.review.service.interfaces;

import com.example.Surplus_Exchange_Platform.review.dto.request.CreateReviewRequest;
import com.example.Surplus_Exchange_Platform.review.dto.response.ReviewResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewService {

    ReviewResponse createReview(
            String buyerEmail,
            Long productId,
            CreateReviewRequest request);

    ReviewResponse updateReview(
            String buyerEmail,
            Long reviewId,
            CreateReviewRequest request);

    void deleteReview(
            String buyerEmail,
            Long reviewId);

    Page<ReviewResponse> getProductReviews(
            Long productId,
            Pageable pageable);
}
