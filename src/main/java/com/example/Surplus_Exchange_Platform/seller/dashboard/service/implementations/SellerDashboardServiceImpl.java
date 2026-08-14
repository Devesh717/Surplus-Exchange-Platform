package com.example.Surplus_Exchange_Platform.seller.dashboard.service.implementations;

import com.example.Surplus_Exchange_Platform.seller.dashboard.dto.response.SellerDashboardResponse;
import com.example.Surplus_Exchange_Platform.seller.dashboard.service.interfaces.SellerDashboardService;
import com.example.Surplus_Exchange_Platform.seller.order.entity.SellerOrderStatus;
import com.example.Surplus_Exchange_Platform.seller.order.repository.SellerOrderRepository;
import com.example.Surplus_Exchange_Platform.product.repository.ProductRepository;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class SellerDashboardServiceImpl
        implements SellerDashboardService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final SellerOrderRepository sellerOrderRepository;

    public SellerDashboardServiceImpl(
            UserRepository userRepository,
            ProductRepository productRepository,
            SellerOrderRepository sellerOrderRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.sellerOrderRepository = sellerOrderRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public SellerDashboardResponse getDashboard(
            String sellerEmail) {

        User seller = userRepository.findByEmail(sellerEmail)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Seller not found"));

        if (seller.getRole() != Role.SELLER) {
            throw new IllegalArgumentException(
                    "Only sellers can access seller dashboard");
        }

        long sellerId = seller.getId();

        long totalProducts =
                productRepository.countBySellerId(sellerId);

        long activeProducts =
                productRepository.countBySellerIdAndActiveTrue(
                        sellerId);

        long pendingProducts =
                productRepository.countBySellerIdAndVerifiedFalse(
                        sellerId);

        long totalOrders =
                sellerOrderRepository
                        .findBySellerIdOrderByCreatedAtDesc(
                                sellerId,
                                org.springframework.data.domain.PageRequest.of(
                                        0, 1))
                        .getTotalElements();

        long pendingOrders =
                sellerOrderRepository
                        .findBySellerIdAndStatusOrderByCreatedAtDesc(
                                sellerId,
                                SellerOrderStatus.PENDING,
                                org.springframework.data.domain.PageRequest.of(
                                        0, 1))
                        .getTotalElements();

        long processingOrders =
                sellerOrderRepository
                        .findBySellerIdAndStatusOrderByCreatedAtDesc(
                                sellerId,
                                SellerOrderStatus.PROCESSING,
                                org.springframework.data.domain.PageRequest.of(
                                        0, 1))
                        .getTotalElements();

        long shippedOrders =
                sellerOrderRepository
                        .findBySellerIdAndStatusOrderByCreatedAtDesc(
                                sellerId,
                                SellerOrderStatus.SHIPPED,
                                org.springframework.data.domain.PageRequest.of(
                                        0, 1))
                        .getTotalElements();

        long deliveredOrders =
                sellerOrderRepository
                        .findBySellerIdAndStatusOrderByCreatedAtDesc(
                                sellerId,
                                SellerOrderStatus.DELIVERED,
                                org.springframework.data.domain.PageRequest.of(
                                        0, 1))
                        .getTotalElements();

        long cancelledOrders =
                sellerOrderRepository
                        .findBySellerIdAndStatusOrderByCreatedAtDesc(
                                sellerId,
                                SellerOrderStatus.CANCELLED,
                                org.springframework.data.domain.PageRequest.of(
                                        0, 1))
                        .getTotalElements();

        long lowStockProducts =
                productRepository.countBySellerIdAndQuantityBetween(
                        sellerId, 1, 10);

        long outOfStockProducts =
                productRepository.countBySellerIdAndQuantity(
                        sellerId, 0);

        /*
         * Sales should ultimately be calculated from the payment/order
         * tables after your final Payment -> Order integration.
         * Returning zero here avoids inventing a payment repository
         * query that may not match your existing schema.
         */
        BigDecimal totalSales = BigDecimal.ZERO;

        return new SellerDashboardResponse(
                totalProducts,
                activeProducts,
                pendingProducts,
                totalOrders,
                pendingOrders,
                processingOrders,
                shippedOrders,
                deliveredOrders,
                cancelledOrders,
                lowStockProducts,
                outOfStockProducts,
                totalSales
        );
    }
}
