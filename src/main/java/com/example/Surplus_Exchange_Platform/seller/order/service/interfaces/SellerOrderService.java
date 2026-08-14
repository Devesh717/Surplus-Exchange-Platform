package com.example.Surplus_Exchange_Platform.seller.order.service.interfaces;

import com.example.Surplus_Exchange_Platform.seller.order.dto.request.UpdateSellerOrderStatusRequest;
import com.example.Surplus_Exchange_Platform.seller.order.dto.response.SellerOrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SellerOrderService {

    Page<SellerOrderResponse> getMyOrders(
            String sellerEmail,
            Pageable pageable);

    SellerOrderResponse getById(
            String sellerEmail,
            Long sellerOrderId);

    SellerOrderResponse updateStatus(
            String sellerEmail,
            Long sellerOrderId,
            UpdateSellerOrderStatusRequest request);
}
