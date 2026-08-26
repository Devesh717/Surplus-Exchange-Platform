# Cart Frontend Module

This cart module follows the same folder organization used by the supplied Product frontend:

```text
cart/
├── Routers/
│   └── CartRoutes.jsx
├── cart/
│   └── api/
│       └── CartApi.js
├── state/
│   └── Cart/
│       ├── Action.js
│       ├── ActionType.js
│       └── Reducer.js
└── customer/
    ├── components/
    │   └── Cart/
    │       ├── CartGrid.jsx
    │       ├── CartItem.jsx
    │       └── CartSummary.jsx
    └── pages/
        └── CartPage/
            └── CartPage.jsx
```

## Backend endpoints used

The module expects:

- `GET /api/cart`
- `POST /api/cart/items`
- `PUT /api/cart/items/{itemId}`
- `DELETE /api/cart/items/{itemId}`
- `DELETE /api/cart`

Add the route to your main router:

```jsx
<CartRoutes />
```

Add the reducer to the same `Store` used by Product:

```jsx
import cartReducer, {
  cartInitialState,
} from "./cart/state/Cart/Reducer";

const initialState = {
  // existing state...
  cart: cartInitialState,
};

function rootReducer(state, action) {
  return {
    ...state,
    // existing reducers...
    cart: cartReducer(state.cart, action),
  };
}
```

The cart item image is loaded from the Product media API already present in the supplied Product module:

```text
GET /api/products/{productId}/images
```

The module expects the backend CartResponse to contain:

```text
cartId
items[]
totalAmount
```

Each cart item is expected to expose:

```text
itemId
productId
productName
sellingPrice
quantity
unit
subtotal
```

The code logs each important API, action, reducer, page, and media step so the frontend-to-backend flow can be traced in the browser console.
