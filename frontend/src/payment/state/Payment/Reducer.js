import { PAYMENT_ACTION_TYPES as T } from "./ActionType";

const initialState = {
  creating: false,
  verifying: false,
  loading: false,

  razorpayOrder: null,
  payment: null,

  error: null,
};

export const paymentInitialState = initialState;

export default function paymentReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case T.CREATE_REQUEST:
      return {
        ...state,
        creating: true,
        error: null,
      };

    case T.CREATE_SUCCESS:
      return {
        ...state,
        creating: false,
        razorpayOrder: action.payload,
        error: null,
      };

    case T.CREATE_FAILURE:
      return {
        ...state,
        creating: false,
        error: action.payload,
      };

    case T.VERIFY_REQUEST:
      return {
        ...state,
        verifying: true,
        error: null,
      };

    case T.VERIFY_SUCCESS:
      return {
        ...state,
        verifying: false,
        payment: action.payload,
        error: null,
      };

    case T.VERIFY_FAILURE:
      return {
        ...state,
        verifying: false,
        error: action.payload,
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
        payment: action.payload,
        error: null,
      };

    case T.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case T.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case T.RESET:
      return initialState;

    default:
      return state;
  }
}
