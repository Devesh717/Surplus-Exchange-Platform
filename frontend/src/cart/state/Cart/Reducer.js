import { CART_ACTION_TYPES as T } from "./ActionType";

const initialState = {
  cartId: null,
  items: [],
  totalAmount: 0,

  loading: false,
  mutationLoading: false,
  error: null,
};

export const cartInitialState = initialState;

export default function cartReducer(
  state = initialState,
  action
) {
  console.log(
    "[CART REDUCER] action:",
    action?.type
  );

  switch (action.type) {
    case T.CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case T.CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartId: action.payload?.cartId ?? null,
        items: action.payload?.items || [],
        totalAmount: Number(
          action.payload?.totalAmount || 0
        ),
        error: null,
      };

    case T.CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case T.CART_ADD_REQUEST:
    case T.CART_UPDATE_REQUEST:
    case T.CART_REMOVE_REQUEST:
    case T.CART_CLEAR_REQUEST:
      return {
        ...state,
        mutationLoading: true,
        error: null,
      };

    case T.CART_ADD_SUCCESS:
    case T.CART_UPDATE_SUCCESS:
    case T.CART_REMOVE_SUCCESS:
      return {
        ...state,
        mutationLoading: false,
        cartId: action.payload?.cartId ?? state.cartId,
        items: action.payload?.items ?? state.items,
        totalAmount:
          action.payload?.totalAmount ??
          state.totalAmount,
        error: null,
      };

    case T.CART_CLEAR_SUCCESS:
      return {
        ...state,
        mutationLoading: false,
        items: [],
        totalAmount: 0,
        error: null,
      };

    case T.CART_ADD_FAILURE:
    case T.CART_UPDATE_FAILURE:
    case T.CART_REMOVE_FAILURE:
    case T.CART_CLEAR_FAILURE:
      return {
        ...state,
        mutationLoading: false,
        error: action.payload,
      };

    case T.CLEAR_CART_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
