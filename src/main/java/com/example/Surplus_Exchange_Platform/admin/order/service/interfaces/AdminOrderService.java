package com.example.Surplus_Exchange_Platform.admin.order.service.interfaces;

import com.example.Surplus_Exchange_Platform.admin.order.dto.response.AdminOrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminOrderService {

    Page<AdminOrderResponse> getAllOrders(Pageable pageable);

    AdminOrderResponse getOrderById(Long orderId);
}
