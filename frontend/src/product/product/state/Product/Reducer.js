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

export default function productReducer(state = initialState, action) {
  
  console.log(
    "[PRODUCT REDUCER] Action:",
    action.type
  );

  console.log(
    "[PRODUCT REDUCER] Payload:",
    action.payload
  );

  switch (action.type) {
    case T.PRODUCTS_REQUEST:

    console.log(
        "[PRODUCT REDUCER] PRODUCTS_REQUEST"
      );

      return { ...state, loading: true, error: null };

    case T.PRODUCTS_SUCCESS:

    console.log(
        "[PRODUCT REDUCER] PRODUCTS_SUCCESS"
      );

      console.log(
        "[PRODUCT REDUCER] Payload content:",
        action.payload?.content
      );

      console.log(
        "[PRODUCT REDUCER] Content length:",
        action.payload?.content?.length
      );

      return {
        ...state,
        loading: false,
        content: action.payload?.content || [],
        totalPages: action.payload?.totalPages || 0,
        totalElements: action.payload?.totalElements || 0,
        page: action.payload?.number ?? 0,
        size: action.payload?.size ?? state.size,
        error: null,
      };

    case T.PRODUCTS_FAILURE:

      console.error(
        "[PRODUCT REDUCER] PRODUCTS_FAILURE:",
        action.payload
      );

      return { ...state, loading: false, error: action.payload };

    case T.PRODUCT_REQUEST:

      console.log(
        "[PRODUCT REDUCER] PRODUCT_REQUEST"
      );

      return { ...state, loading: true, error: null };

    case T.PRODUCT_SUCCESS:

    console.log(
        "[PRODUCT REDUCER] PRODUCT_SUCCESS:",
        action.payload
      );

      return {
        ...state,
        loading: false,
        selectedProduct: action.payload,
        error: null,
      };

    case T.PRODUCT_FAILURE:

    console.error(
        "[PRODUCT REDUCER] PRODUCT_FAILURE:",
        action.payload
      );
      
      return {
        ...state,
        loading: false,
        selectedProduct: null,
        error: action.payload,
      };

    case T.PRODUCT_MUTATION_REQUEST:
      return { ...state, mutationLoading: true, error: null };

    case T.PRODUCT_MUTATION_SUCCESS:
      return { ...state, mutationLoading: false, error: null };

    case T.PRODUCT_MUTATION_FAILURE:
      return { ...state, mutationLoading: false, error: action.payload };

    case T.CLEAR_PRODUCT_ERROR:
      return { ...state, error: null };

    case T.CLEAR_SELECTED_PRODUCT:
      return { ...state, selectedProduct: null };

    default:
      return state;
  }
}
