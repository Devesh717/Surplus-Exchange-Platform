package com.example.Surplus_Exchange_Platform.payment.dto.response;

import java.math.BigDecimal;

public class CreatePaymentResponse {

    private Long orderId;
    private String orderNumber;
    private String razorpayOrderId;
    private String keyId;
    private BigDecimal amount;
    private String currency;

    public CreatePaymentResponse(
            Long orderId,
            String orderNumber,
            String razorpayOrderId,
            String keyId,
            BigDecimal amount,
            String currency) {
        this.orderId = orderId;
        this.orderNumber = orderNumber;
        this.razorpayOrderId = razorpayOrderId;
        this.keyId = keyId;
        this.amount = amount;
        this.currency = currency;
    }

    public Long getOrderId() { return orderId; }
    public String getOrderNumber() { return orderNumber; }
    public String getRazorpayOrderId() { return razorpayOrderId; }
    public String getKeyId() { return keyId; }
    public BigDecimal getAmount() { return amount; }
    public String getCurrency() { return currency; }
}
