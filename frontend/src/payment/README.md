# Razorpay Payment Frontend Module

This module is designed for the Surplus Exchange Platform Razorpay backend.

## Backend endpoints expected

Base URL:

`/api/payments`

### Create Razorpay order

`POST /api/payments/orders/{orderId}`

Expected response:

```json
{
  "orderId": 12,
  "orderNumber": "ORD-...",
  "razorpayOrderId": "order_xxxxx",
  "keyId": "rzp_test_xxxxx",
  "amount": 1500,
  "currency": "INR"
}
```

### Verify Razorpay payment

`POST /api/payments/verify`

Request:

```json
{
  "razorpayPaymentId": "pay_xxxxx",
  "razorpayOrderId": "order_xxxxx",
  "razorpaySignature": "..."
}
```

## Important integration

Add the payment reducer to `Store.js`:

```js
import paymentReducer, {
  paymentInitialState,
} from "./payment/state/Payment/Reducer";
```

Add to `initialState`:

```js
payment: paymentInitialState,
```

Add to `rootReducer`:

```js
payment: paymentReducer(state.payment, action),
```

Optional hook:

```js
export function usePaymentState() {
  const { state } = useStore();
  return state.payment;
}
```

## Route

Add:

```jsx
import PaymentPage from "./payment/components/Payment/PaymentPage";

<Route path="/payment" element={<PaymentPage />} />
```

## Checkout navigation

After checkout creates the pending order, navigate to:

```js
navigate("/payment", {
  state: {
    checkout: result,
  },
});
```

The checkout result must contain an `orderId`.

## Razorpay

The browser loads the official Razorpay Checkout script dynamically:

`https://checkout.razorpay.com/v1/checkout.js`

The frontend never receives or uses the Razorpay secret key. The backend creates the Razorpay order and verifies the payment signature.
