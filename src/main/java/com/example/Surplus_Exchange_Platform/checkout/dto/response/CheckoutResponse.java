package com.example.Surplus_Exchange_Platform.checkout.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class CheckoutResponse {
    private Long orderId;
    private String orderStatus;
    private String paymentStatus;
    private BigDecimal amount;
    private String paymentOrderId;
    private String message;
}
