import { PRODUCT_ACTION_TYPES as T } from "./ActionType";

const initialState = {
  content: [],
  totalPages: 0,
  totalElements: 0,
  page: 0,
  size: 12,
  selectedProduct: null,
  loading: false,
  mutationLoading: false,
  error: null,
};

export const productInitialState = initialState;

export default function productReducer(state = initialState, action = {}) {
  console.log("==================================================");
  console.log("[PRODUCT REDUCER] ACTION RECEIVED");
  console.log("[PRODUCT REDUCER] type:", action.type);
  console.log("[PRODUCT REDUCER] payload:", action.payload);
  console.log("[PRODUCT REDUCER] previous state:", state);
  console.log("==================================================");

  let nextState;

  switch (action.type) {
    case T.PRODUCTS_REQUEST:
      nextState = { ...state, loading: true, error: null };
      break;

    case T.PRODUCTS_SUCCESS:
      nextState = {
        ...state,
        loading: false,
        content: action.payload?.content || [],
        totalPages: action.payload?.totalPages || 0,
        totalElements: action.payload?.totalElements || 0,
        page: action.payload?.number ?? 0,
        size: action.payload?.size ?? state.size,
        error: null,
      };
      break;

    case T.PRODUCTS_FAILURE:
      nextState = { ...state, loading: false, error: action.payload };
      break;

    case T.PRODUCT_REQUEST:
      nextState = { ...state, loading: true, error: null };
      break;

    case T.PRODUCT_SUCCESS:
      nextState = {
        ...state,
        loading: false,
        selectedProduct: action.payload,
        error: null,
      };
      break;

    case T.PRODUCT_FAILURE:
      nextState = {
        ...state,
        loading: false,
        selectedProduct: null,
        error: action.payload,
      };
      break;

    case T.PRODUCT_MUTATION_REQUEST:
      nextState = { ...state, mutationLoading: true, error: null };
      break;

    case T.PRODUCT_MUTATION_SUCCESS:
      nextState = { ...state, mutationLoading: false, error: null };
      break;

    case T.PRODUCT_MUTATION_FAILURE:
      nextState = { ...state, mutationLoading: false, error: action.payload };
      break;

    case T.CLEAR_PRODUCT_ERROR:
      nextState = { ...state, error: null };
      break;

    case T.CLEAR_SELECTED_PRODUCT:
      nextState = { ...state, selectedProduct: null };
      break;

    default:
      nextState = state;
      break;
  }

  console.log("[PRODUCT REDUCER] next state:", nextState);
  console.log("[PRODUCT REDUCER] loading:", nextState.loading);
  console.log("[PRODUCT REDUCER] content length:", nextState.content?.length);
  console.log("[PRODUCT REDUCER] totalElements:", nextState.totalElements);
  console.log("[PRODUCT REDUCER] totalPages:", nextState.totalPages);
  console.log("[PRODUCT REDUCER] error:", nextState.error);
  console.log("==================================================");

  return nextState;
}
