export const checkoutInitialState = {
  items: [],
  subtotal: 0,
  shippingCharge: 0,
  discount: 0,
  total: 0,

  loading: false,
  submitting: false,
  error: null,

  result: null,
};

export default function checkoutReducer(state, action) {
  console.log("[CHECKOUT REDUCER] Action:", action?.type);
  console.log("[CHECKOUT REDUCER] Payload:", action?.payload);

  switch (action.type) {
    case "CHECKOUT_SUMMARY_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "CHECKOUT_SUMMARY_SUCCESS": {
      const data = action.payload || {};

      return {
        ...state,
        loading: false,
        error: null,
        items: Array.isArray(data.items) ? data.items : [],
        subtotal: Number(data.subtotal || 0),
        shippingCharge: Number(data.shippingCharge || 0),
        discount: Number(data.discount || 0),
        total: Number(data.total || 0),
      };
    }

    case "CHECKOUT_SUMMARY_FAILURE":
      return {
        ...state,
        loading: false,
        error:
          action.payload ||
          "Unable to load checkout summary.",
      };

    case "CHECKOUT_SUBMIT_REQUEST":
      return {
        ...state,
        submitting: true,
        error: null,
        result: null,
      };

    case "CHECKOUT_SUBMIT_SUCCESS":
      return {
        ...state,
        submitting: false,
        error: null,
        result: action.payload || null,
      };

    case "CHECKOUT_SUBMIT_FAILURE":
      return {
        ...state,
        submitting: false,
        error:
          action.payload ||
          "Unable to complete checkout.",
      };

    case "CHECKOUT_CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "CHECKOUT_CLEAR_RESULT":
      return {
        ...state,
        result: null,
      };

    default:
      return state;
  }
}
