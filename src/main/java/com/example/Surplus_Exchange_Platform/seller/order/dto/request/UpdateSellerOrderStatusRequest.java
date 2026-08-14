package com.example.Surplus_Exchange_Platform.seller.order.dto.request;

import com.example.Surplus_Exchange_Platform.seller.order.entity.SellerOrderStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UpdateSellerOrderStatusRequest {

    @NotNull(message = "Order status is required")
    private SellerOrderStatus status;

    @Size(max = 500, message = "Seller note cannot exceed 500 characters")
    private String sellerNote;

    public SellerOrderStatus getStatus() {
        return status;
    }

    public String getSellerNote() {
        return sellerNote;
    }

    public void setStatus(SellerOrderStatus status) {
        this.status = status;
    }

    public void setSellerNote(String sellerNote) {
        this.sellerNote = sellerNote;
    }
}
