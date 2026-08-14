package com.example.Surplus_Exchange_Platform.admin.order.service.implementations;

import com.example.Surplus_Exchange_Platform.admin.order.dto.response.AdminOrderResponse;
import com.example.Surplus_Exchange_Platform.admin.order.service.interfaces.AdminOrderService;
import com.example.Surplus_Exchange_Platform.order.entity.Order;
import com.example.Surplus_Exchange_Platform.order.repository.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminOrderServiceImpl
        implements AdminOrderService {

    private final OrderRepository orderRepository;

    public AdminOrderServiceImpl(
            OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AdminOrderResponse> getAllOrders(
            Pageable pageable) {

        return orderRepository
                .findAll(pageable)
                .map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public AdminOrderResponse getOrderById(
            Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Order not found"));

        return toResponse(order);
    }

    private AdminOrderResponse toResponse(Order order) {

        return new AdminOrderResponse(
                order.getId(),
                order.getBuyer().getId(),
                order.getTotalAmount()
        );
    }
}
