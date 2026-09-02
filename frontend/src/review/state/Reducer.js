import { REVIEW_ACTION_TYPES as T } from "./ActionType";

export const reviewInitialState = {
  reviews: [],
  totalPages: 0,
  totalElements: 0,

  loading: false,
  mutationLoading: false,

  error: null,
};

export default function reviewReducer(
  state = reviewInitialState,
  action
) {
  switch (action.type) {
    case T.CREATE_REQUEST:
    case T.UPDATE_REQUEST:
    case T.DELETE_REQUEST:
      return {
        ...state,
        mutationLoading: true,
        error: null,
      };

    case T.CREATE_SUCCESS:
      return {
        ...state,
        mutationLoading: false,
        error: null,
        reviews: [
          action.payload,
          ...state.reviews,
        ],
      };

    case T.UPDATE_SUCCESS:
      return {
        ...state,
        mutationLoading: false,
        error: null,
        reviews: state.reviews.map((review) =>
          review.id === action.payload.id
            ? action.payload
            : review
        ),
      };

    case T.DELETE_SUCCESS:
      return {
        ...state,
        mutationLoading: false,
        error: null,
        reviews: state.reviews.filter(
          (review) =>
            review.id !== action.payload
        ),
      };

    case T.GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case T.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        reviews: action.payload?.content || [],
        totalPages: action.payload?.totalPages || 0,
        totalElements: action.payload?.totalElements || 0,
      };

    case T.GET_FAILURE:
    case T.CREATE_FAILURE:
    case T.UPDATE_FAILURE:
    case T.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        mutationLoading: false,
        error:
          action.payload ||
          "Something went wrong.",
      };

    case T.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}