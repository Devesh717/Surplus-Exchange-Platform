package com.example.Surplus_Exchange_Platform.seller.order.service.implementations;

import com.example.Surplus_Exchange_Platform.order.entity.Order;
import com.example.Surplus_Exchange_Platform.seller.order.dto.request.UpdateSellerOrderStatusRequest;
import com.example.Surplus_Exchange_Platform.seller.order.dto.response.SellerOrderResponse;
import com.example.Surplus_Exchange_Platform.seller.order.entity.SellerOrder;
import com.example.Surplus_Exchange_Platform.seller.order.entity.SellerOrderStatus;
import com.example.Surplus_Exchange_Platform.seller.order.repository.SellerOrderRepository;
import com.example.Surplus_Exchange_Platform.seller.order.service.interfaces.SellerOrderService;
import com.example.Surplus_Exchange_Platform.user.entity.Role;
import com.example.Surplus_Exchange_Platform.user.entity.User;
import com.example.Surplus_Exchange_Platform.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SellerOrderServiceImpl
        implements SellerOrderService {

    private final SellerOrderRepository sellerOrderRepository;
    private final UserRepository userRepository;

    public SellerOrderServiceImpl(
            SellerOrderRepository sellerOrderRepository,
            UserRepository userRepository) {
        this.sellerOrderRepository = sellerOrderRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SellerOrderResponse> getMyOrders(
            String sellerEmail,
            Pageable pageable) {

        User seller = getSeller(sellerEmail);

        return sellerOrderRepository
                .findBySellerIdOrderByCreatedAtDesc(
                        seller.getId(),
                        pageable)
                .map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public SellerOrderResponse getById(
            String sellerEmail,
            Long sellerOrderId) {

        User seller = getSeller(sellerEmail);

        SellerOrder sellerOrder =
                sellerOrderRepository
                        .findByIdAndSellerId(
                                sellerOrderId,
                                seller.getId())
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Seller order not found"));

        return toResponse(sellerOrder);
    }

    @Override
    @Transactional
    public SellerOrderResponse updateStatus(
            String sellerEmail,
            Long sellerOrderId,
            UpdateSellerOrderStatusRequest request) {

        User seller = getSeller(sellerEmail);

        SellerOrder sellerOrder =
                sellerOrderRepository
                        .findByIdAndSellerId(
                                sellerOrderId,
                                seller.getId())
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Seller order not found"));

        validateStatusTransition(
                sellerOrder.getStatus(),
                request.getStatus());

        sellerOrder.setStatus(request.getStatus());

        if (request.getSellerNote() != null) {
            sellerOrder.setSellerNote(
                    request.getSellerNote().trim());
        }

        return toResponse(
                sellerOrderRepository.save(sellerOrder));
    }

    private User getSeller(String email) {

        User seller = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Seller not found"));

        if (seller.getRole() != Role.SELLER) {
            throw new IllegalArgumentException(
                    "Only sellers can manage seller orders");
        }

        return seller;
    }

    private void validateStatusTransition(
            SellerOrderStatus current,
            SellerOrderStatus next) {

        if (current == SellerOrderStatus.CANCELLED
                || current == SellerOrderStatus.DELIVERED) {
            throw new IllegalArgumentException(
                    "Order status cannot be changed after "
                            + current.name().toLowerCase());
        }

        if (next == SellerOrderStatus.PENDING) {
            throw new IllegalArgumentException(
                    "Seller cannot move an order back to PENDING");
        }

        if (current == SellerOrderStatus.PENDING
                && next != SellerOrderStatus.CONFIRMED
                && next != SellerOrderStatus.CANCELLED) {
            throw new IllegalArgumentException(
                    "Pending order can only be confirmed or cancelled");
        }

        if (current == SellerOrderStatus.CONFIRMED
                && next != SellerOrderStatus.PROCESSING
                && next != SellerOrderStatus.CANCELLED) {
            throw new IllegalArgumentException(
                    "Confirmed order can only be processed or cancelled");
        }

        if (current == SellerOrderStatus.PROCESSING
                && next != SellerOrderStatus.SHIPPED) {
            throw new IllegalArgumentException(
                    "Processing order can only be shipped");
        }

        if (current == SellerOrderStatus.SHIPPED
                && next != SellerOrderStatus.DELIVERED) {
            throw new IllegalArgumentException(
                    "Shipped order can only be delivered");
        }
    }

    private SellerOrderResponse toResponse(
            SellerOrder sellerOrder) {

        Order order = sellerOrder.getOrder();

        return new SellerOrderResponse(
                sellerOrder.getId(),
                order.getId(),
                order.getBuyer().getId(),
                sellerOrder.getStatus(),
                sellerOrder.getSellerNote(),
                order.getTotalAmount(),
                sellerOrder.getCreatedAt(),
                sellerOrder.getUpdatedAt()
        );
    }
}
