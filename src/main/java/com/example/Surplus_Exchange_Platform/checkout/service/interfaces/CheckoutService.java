package com.example.Surplus_Exchange_Platform.checkout.service.interfaces;

import com.example.Surplus_Exchange_Platform.checkout.dto.request.CheckoutRequest;
import com.example.Surplus_Exchange_Platform.checkout.dto.response.CheckoutResponse;
import com.example.Surplus_Exchange_Platform.checkout.dto.response.CheckoutSummaryResponse;

public interface CheckoutService {

    CheckoutSummaryResponse getCheckoutSummary(String buyerEmail);

    CheckoutResponse checkout(String buyerEmail, CheckoutRequest request);
}
