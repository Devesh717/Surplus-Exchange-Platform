# Checkout Frontend Module

This module is built for the supplied Spring Boot checkout backend.

## Backend contract used

Base URL:

`/api/checkout`

### GET `/api/checkout/summary`

Response:

```json
{
  "items": [
    {
      "productId": 2,
      "productName": "Example",
      "quantity": 2,
      "price": 100,
      "total": 200
    }
  ],
  "subtotal": 200,
  "shippingCharge": 0,
  "discount": 0,
  "total": 200
}
```

### POST `/api/checkout`

Request:

```json
{
  "paymentMethod": "COD",
  "shippingAddress": "Address",
  "city": "City",
  "state": "State",
  "postalCode": "123456"
}
```

Response:

```json
{
  "orderId": 1,
  "orderStatus": "PENDING",
  "paymentStatus": "PENDING",
  "amount": 200,
  "paymentOrderId": null,
  "message": "..."
}
```

## Required Store integration

Your existing `Store.js` must import the reducer:

```js
import checkoutReducer, {
  checkoutInitialState,
} from "./checkout/state/Checkout/Reducer";
```

Add to `initialState`:

```js
checkout: checkoutInitialState,
```

Add to `rootReducer`:

```js
checkout: checkoutReducer(state.checkout, action),
```

## Required route

Add:

```jsx
import CheckoutPage from "./checkout/pages/CheckoutPage";
```

Then inside your `<Routes>`:

```jsx
<Route path="/checkout" element={<CheckoutPage />} />
```

## Important

The backend service supplied with this module is explicitly a scaffold. It currently returns an empty checkout summary and a zero amount until the existing CartService, OrderService and PaymentService are wired into `CheckoutServiceImpl`.

The frontend therefore uses the real endpoints and does not use mock checkout data.

## Payment

The supplied backend DTO only defines `paymentMethod` as a String and returns `paymentOrderId`. This frontend exposes `COD` and `ONLINE` as the two selectable values. If your backend expects different exact values, change them in `PaymentMethod.jsx`.

The frontend does not fake Razorpay or payment success.
