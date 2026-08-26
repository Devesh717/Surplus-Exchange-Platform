# Cart Frontend Module

Normalized to the same structure as the Product module:

```text
src/cart/
├── Routers/
├── api/
├── state/
└── customer/
```

## REQUIRED Store integration

Add to `src/Store.js`:

```jsx
import cartReducer, {
  cartInitialState,
} from "./cart/state/Cart/Reducer";
```

Inside `initialState`:

```jsx
cart: cartInitialState,
```

Inside `rootReducer`:

```jsx
cart: cartReducer(state.cart, action),
```

Without this, `state.cart` is undefined and `CartPage` falls back to `items: []`.

## Required route

Add:

```jsx
import CartRoutes from "./cart/Routers/CartRoutes";
```

and render:

```jsx
<CartRoutes />
```

## API

```text
GET    /api/cart
POST   /api/cart/items
PUT    /api/cart/items/{itemId}
DELETE /api/cart/items/{itemId}
DELETE /api/cart
```

Add-to-cart payload:

```json
{
  "productId": 2,
  "quantity": 1
}
```
