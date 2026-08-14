package com.example.Surplus_Exchange_Platform.review.service.implementations;

import com.example.Surplus_Exchange_Platform.notification.entity.NotificationType;
import com.example.Surplus_Exchange_Platform.notification.kafka.NotificationProducer;
import com.example.Surplus_Exchange_Platform.product.entity.Product;
import com.example.Surplus_Exchange_Platform.product.repository.ProductRepository;
import com.example.Surplus_Exchange_Platform.review.dto.request.CreateReviewRequest;
import com.example.Surplus_Exchange_Platform.review.dto.response.ReviewResponse;
import com.example.Surplus_Exchange_Platform.review.entity.Review;
import com.example.Surplus_Exchange_Platform.review.repository.ReviewPurchaseRepository;
import com.example.Surplus_Exchange_Platform.review.repository.ReviewRepository;
import com.example.Surplus_Exchange_Platform.review.service.interfaces.ReviewService;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewPurchaseRepository purchaseRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final NotificationProducer notificationProducer;

    public ReviewServiceImpl(
            ReviewRepository reviewRepository,
            ReviewPurchaseRepository purchaseRepository,
            ProductRepository productRepository,
            UserRepository userRepository,
            NotificationProducer notificationProducer) {
        this.reviewRepository = reviewRepository;
        this.purchaseRepository = purchaseRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.notificationProducer = notificationProducer;
    }

    @Override
    @Transactional
    public ReviewResponse createReview(
            String buyerEmail,
            Long productId,
            CreateReviewRequest request) {

        User buyer = getBuyer(buyerEmail);

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Product not found"));

        if (reviewRepository.existsByBuyerIdAndProductId(
                buyer.getId(),
                productId)) {

            throw new IllegalArgumentException(
                    "You have already reviewed this product");
        }

        /*
         * A buyer can review the product only if
         * they have a delivered purchase.
         */
        boolean verifiedPurchase =
                purchaseRepository.hasDeliveredPurchase(
                        buyer.getId(),
                        productId);

        if (!verifiedPurchase) {
            throw new IllegalArgumentException(
                    "You can review a product only after it has been delivered");
        }

        Review review = new Review();

        review.setBuyer(buyer);
        review.setProduct(product);
        review.setRating(request.getRating());
        review.setComment(request.getComment().trim());
        review.setVerifiedPurchase(true);

        /*
         * Save review first.
         */
        Review savedReview =
                reviewRepository.save(review);

        /*
         * Notify the seller who owns the product.
         */
        notificationProducer.publish(
                product.getSeller().getId(),
                "New Review Received",
                "A buyer has submitted a review for your product '"
                        + product.getName()
                        + "'.",
                NotificationType.REVIEW_SUBMITTED
        );

        return toResponse(savedReview);
    }

    @Override
    @Transactional
    public ReviewResponse updateReview(
            String buyerEmail,
            Long reviewId,
            CreateReviewRequest request) {

        User buyer = getBuyer(buyerEmail);

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Review not found"));

        if (!review.getBuyer().getId().equals(buyer.getId())) {
            throw new IllegalArgumentException(
                    "You are not authorized to update this review");
        }

        review.setRating(request.getRating());
        review.setComment(request.getComment().trim());

        return toResponse(
                reviewRepository.save(review));
    }

    @Override
    @Transactional
    public void deleteReview(
            String buyerEmail,
            Long reviewId) {

        User buyer = getBuyer(buyerEmail);

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Review not found"));

        if (!review.getBuyer().getId().equals(buyer.getId())) {
            throw new IllegalArgumentException(
                    "You are not authorized to delete this review");
        }

        reviewRepository.delete(review);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ReviewResponse> getProductReviews(
            Long productId,
            Pageable pageable) {

        if (!productRepository.existsById(productId)) {
            throw new IllegalArgumentException(
                    "Product not found");
        }

        return reviewRepository
                .findByProductIdOrderByCreatedAtDesc(
                        productId,
                        pageable)
                .map(this::toResponse);
    }

    private User getBuyer(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"));

        if (user.getRole() != Role.BUYER
                && user.getRole() != Role.SELLER) {
            throw new IllegalArgumentException(
                    "Only buyers and approved sellers can write reviews");
        }

        if (!user.isEmailVerified()) {
            throw new IllegalArgumentException(
                    "Please verify your email first");
        }

        return user;
    }

    private ReviewResponse toResponse(Review review) {

        return new ReviewResponse(
                review.getId(),
                review.getProduct().getId(),
                review.getBuyer().getId(),
                review.getBuyer().getName(),
                review.getRating(),
                review.getComment(),
                review.isVerifiedPurchase(),
                review.getCreatedAt(),
                review.getUpdatedAt()
        );
    }
}
