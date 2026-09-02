package com.example.Surplus_Exchange_Platform.checkout.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class CheckoutSummaryResponse {
    private List<CheckoutItemResponse> items;
    private BigDecimal subtotal;
    private BigDecimal shippingCharge;
    private BigDecimal discount;
    private BigDecimal total;
}
