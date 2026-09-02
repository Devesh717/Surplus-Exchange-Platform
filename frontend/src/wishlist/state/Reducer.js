import {
  WISHLIST_REQUEST,
  WISHLIST_SUCCESS,
  WISHLIST_FAILURE,
  WISHLIST_ADD_REQUEST,
  WISHLIST_ADD_SUCCESS,
  WISHLIST_ADD_FAILURE,
  WISHLIST_REMOVE_REQUEST,
  WISHLIST_REMOVE_SUCCESS,
  WISHLIST_REMOVE_FAILURE,
  WISHLIST_CLEAR_REQUEST,
  WISHLIST_CLEAR_SUCCESS,
  WISHLIST_CLEAR_FAILURE,
} from "./Types";

export const wishlistInitialState = {
  wishlistId: null,
  items: [],
  loading: false,
  mutationLoading: false,
  error: null,
};

export default function wishlistReducer(
  state = wishlistInitialState,
  action
) {
  switch (action.type) {
    case WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case WISHLIST_SUCCESS:
      return {
        ...state,
        wishlistId: action.payload?.wishlistId ?? null,
        items: action.payload?.items ?? [],
        loading: false,
        error: null,
      };

    case WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || "Unable to load wishlist.",
      };

    case WISHLIST_ADD_REQUEST:
    case WISHLIST_REMOVE_REQUEST:
    case WISHLIST_CLEAR_REQUEST:
      return {
        ...state,
        mutationLoading: true,
        error: null,
      };

    case WISHLIST_ADD_SUCCESS:
    case WISHLIST_REMOVE_SUCCESS:
    case WISHLIST_CLEAR_SUCCESS:
      return {
        ...state,
        wishlistId: action.payload?.wishlistId ?? state.wishlistId,
        items: action.payload?.items ?? [],
        mutationLoading: false,
        error: null,
      };

    case WISHLIST_ADD_FAILURE:
    case WISHLIST_REMOVE_FAILURE:
    case WISHLIST_CLEAR_FAILURE:
      return {
        ...state,
        mutationLoading: false,
        error: action.payload || "Wishlist operation failed.",
      };

    default:
      return state;
  }
}
