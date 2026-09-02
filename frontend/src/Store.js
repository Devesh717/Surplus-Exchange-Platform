import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

import adminReducer, {
  initialAdminState,
} from "./admin/state/Admin/Reducer";

import authReducer from "./auth/state/Auth/Reducer";

import productReducer, {
  productInitialState,
} from "./product/state/Reducer";

import cartReducer, {
  cartInitialState,
} from "./cart/state/Cart/Reducer";

import checkoutReducer, {
  checkoutInitialState,
} from "./checkout/state/Checkout/Reducer";

import paymentReducer, {
  paymentInitialState,
} from "./payment/state/Payment/Reducer";

// =========================
// ORDERS
// =========================
import ordersReducer, {
  orderInitialState,
} from "./order/state/Order/Reducer";

import userDashboardReducer, {
  userDashboardInitialState,
} from "./user/dashboard/state/UserDashboard/Reducer";

import aiReducer, {
  aiInitialState,
} from "./ai/state/Ai/Reducer";

import sellerReducer, {
  sellerInitialState,
} from "./seller/state/Seller/Reducer";

import wishlistReducer, {
  wishlistInitialState,
} from "./wishlist/state/Reducer";

import userProfileReducer, {
  userProfileInitialState,
} from "./user/profile/state/UserProfile/Reducer";

import reviewReducer, {
  reviewInitialState,
} from "./review/state/Reducer";

const StoreContext = createContext(null);

const initialState = {
  // =========================
  // ADMIN
  // =========================
  admin: initialAdminState,

  // =========================
  // AUTH
  // =========================
  auth: {
    token: localStorage.getItem("se_token"),
    role: localStorage.getItem("se_role"),
    userId: localStorage.getItem("se_user_id"),
    loading: false,
    error: null,
    isAuthenticated: Boolean(
      localStorage.getItem("se_token")
    ),
  },

  // =========================
  // PRODUCT
  // =========================
  product: productInitialState,

  // =========================
  // CART
  // =========================
  cart: cartInitialState,

  // =========================
  // CHECKOUT
  // =========================
  checkout: checkoutInitialState,

  // =========================
  // PAYMENT
  // =========================
  payment: paymentInitialState,

  // =========================
  // ORDERS
  // =========================
  orders: orderInitialState,

  // USER DASHBOARD
  userDashboard: userDashboardInitialState,

  // AI
  ai: aiInitialState,

  // SELLER
  seller: sellerInitialState,

  // WISHLIST
  wishlist: wishlistInitialState,
//USER DASHBOARD
userDashboard: userDashboardInitialState,

// USER PROFILE
userProfile: userProfileInitialState,

// REVIEW
review: reviewInitialState,
};

function rootReducer(state, action) {
  console.log("================================");
  console.log("[STORE] rootReducer");
  console.log("[STORE] action:", action);
  console.log("[STORE] action type:", action?.type);
  console.log("================================");

  const newState = {
    ...state,

    // =========================
    // ADMIN
    // =========================
    admin: adminReducer(
      state.admin,
      action
    ),

    // =========================
    // AUTH
    // =========================
    auth: authReducer(
      state.auth,
      action
    ),

    // =========================
    // PRODUCT
    // =========================
    product: productReducer(
      state.product,
      action
    ),

    // =========================
    // CART
    // =========================
    cart: cartReducer(
      state.cart,
      action
    ),

    // =========================
    // CHECKOUT
    // =========================
    checkout: checkoutReducer(
      state.checkout,
      action
    ),

    // =========================
    // PAYMENT
    // =========================
    payment: paymentReducer(
      state.payment,
      action
    ),

    // =========================
    // ORDERS
    // =========================
    orders: ordersReducer(
      state.orders,
      action
    ),

    userDashboard: userDashboardReducer(
    state.userDashboard,
    action
  ),

  ai: aiReducer(
  state.ai,
  action
),

seller: sellerReducer(
      state.seller,
      action
    ),

    wishlist: wishlistReducer(
      state.wishlist, action
    ),

    userDashboard: userDashboardReducer(
  state.userDashboard,
  action
),

userProfile: userProfileReducer(
  state.userProfile,
  action
),

review: reviewReducer(
  state.review,
  action
),

  };

  console.log("================================");
  console.log("[STORE] NEW STATE");
  console.log("[STORE] seller:", newState.seller);
  console.log("[STORE] cart:", newState.cart);
  console.log("[STORE] checkout:", newState.checkout);
  console.log("[STORE] payment:", newState.payment);
  console.log("[STORE] orders:", newState.orders);
  console.log("[STORE] product:", newState.product);

  console.log("================================");

  return newState;
}

export function StoreProvider({ children }) {
  const [state, reducerDispatch] = useReducer(
    rootReducer,
    initialState
  );

  const dispatch = useCallback(
    (action) => {
      console.log("================================");
      console.log("[STORE] dispatch called");
      console.log("[STORE] action:", action);
      console.log(
        "[STORE] action type:",
        typeof action
      );
      console.log("================================");

      // =========================
      // THUNK
      // =========================
      if (typeof action === "function") {
        console.log(
          "[STORE] Executing thunk..."
        );

        return action(dispatch);
      }

      // =========================
      // NORMAL ACTION
      // =========================
      console.log(
        "[STORE] Dispatching normal action..."
      );

      return reducerDispatch(action);
    },
    []
  );

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

// =========================
// STORE HOOK
// =========================

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}

// =========================
// AUTH STATE
// =========================

export function useAuthState() {
  const { state } = useStore();

  return state.auth;
}

// =========================
// PRODUCT STATE
// =========================

export function useProductState() {
  const { state } = useStore();

  return state.product;
}

// =========================
// CART STATE
// =========================

export function useCartState() {
  const { state } = useStore();

  return state.cart;
}

// =========================
// CHECKOUT STATE
// =========================

export function useCheckoutState() {
  const { state } = useStore();

  return state.checkout;
}

// =========================
// PAYMENT STATE
// =========================

export function usePaymentState() {
  const { state } = useStore();

  return state.payment;
}

// =========================
// ORDERS STATE
// =========================

export function useOrdersState() {
  const { state } = useStore();

  return state.orders;
}

// =========================
// USER DASHBOARD STATE
// =========================

export function useUserDashboardState() {
  const { state } = useStore();

  return state.userDashboard;
}

// =========================
// AI STATE
// =========================

export function useAIState() {
  const { state } = useStore();

  return state.ai;
}

// =========================
// ADMIN STATE
// =========================

export function useAdminState() {
  const { state } = useStore();

  return state.admin;
}

export function useSellerState() {
  const { state } = useStore();

  return state.seller;
}

export function useUserProfileState() {
  const { state } = useStore();

  return state.userProfile;
}

export function useReviewState() {
  const { state } = useStore();
  return state.review;
}