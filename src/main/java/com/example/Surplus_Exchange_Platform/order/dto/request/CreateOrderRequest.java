package com.example.Surplus_Exchange_Platform.order.dto.request;

import jakarta.validation.constraints.NotBlank;

public class CreateOrderRequest {

    @NotBlank(message = "Shipping address is required")
    private String shippingAddress;

    @NotBlank(message = "Shipping city is required")
    private String shippingCity;

    @NotBlank(message = "Shipping state is required")
    private String shippingState;

    @NotBlank(message = "Shipping pincode is required")
    private String shippingPincode;

    public String getShippingAddress() { return shippingAddress; }
    public String getShippingCity() { return shippingCity; }
    public String getShippingState() { return shippingState; }
    public String getShippingPincode() { return shippingPincode; }

    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
    public void setShippingCity(String shippingCity) { this.shippingCity = shippingCity; }
    public void setShippingState(String shippingState) { this.shippingState = shippingState; }
    public void setShippingPincode(String shippingPincode) { this.shippingPincode = shippingPincode; }
}
