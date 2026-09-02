package com.example.Surplus_Exchange_Platform.checkout.dto.request;

import lombok.Data;

@Data
public class CheckoutRequest {
    private String paymentMethod;
    private String shippingAddress;
    private String city;
    private String state;
    private String postalCode;
}
