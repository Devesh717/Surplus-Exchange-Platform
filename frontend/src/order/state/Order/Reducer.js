import { ORDER_ACTION_TYPES as T } from "./ActionType";

const initialState = {
  orders: [],
  page: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,

  selectedOrder: null,

  loading: false,
  detailsLoading: false,
  cancelLoading: false,

  error: null,
};

export const orderInitialState = initialState;

export default function orderReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case T.ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case T.ORDERS_SUCCESS: {
      const data = action.payload || {};

      return {
        ...state,
        loading: false,
        orders: data.content || [],
        page: data.number ?? 0,
        size: data.size ?? state.size,
        totalPages: data.totalPages ?? 0,
        totalElements: data.totalElements ?? 0,
        error: null,
      };
    }

    case T.ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case T.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        detailsLoading: true,
        selectedOrder: null,
        error: null,
      };

    case T.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        detailsLoading: false,
        selectedOrder: action.payload,
        error: null,
      };

    case T.ORDER_DETAILS_FAILURE:
      return {
        ...state,
        detailsLoading: false,
        error: action.payload,
      };

    case T.ORDER_CANCEL_REQUEST:
      return {
        ...state,
        cancelLoading: true,
        error: null,
      };

    case T.ORDER_CANCEL_SUCCESS:
      return {
        ...state,
        cancelLoading: false,
        selectedOrder: action.payload,
        orders: state.orders.map((order) =>
          order.id === action.payload?.id
            ? action.payload
            : order
        ),
        error: null,
      };

    case T.ORDER_CANCEL_FAILURE:
      return {
        ...state,
        cancelLoading: false,
        error: action.payload,
      };

    case T.CLEAR_ORDER_ERROR:
      return {
        ...state,
        error: null,
      };

    case T.CLEAR_ORDER_DETAILS:
      return {
        ...state,
        selectedOrder: null,
      };

    default:
      return state;
  }
}
