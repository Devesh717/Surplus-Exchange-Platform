import { SELLER_ACTION_TYPES as T } from "./ActionType";

const initialState = {
  profile: null,
  dashboard: null,

  orders: [],
  selectedOrder: null,
  page: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,

  loading: false,
  profileLoading: false,
  dashboardLoading: false,
  ordersLoading: false,
  mutationLoading: false,

  error: null,
};

export const sellerInitialState = initialState;

export default function sellerReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case T.APPLICATION_REQUEST:
    case T.PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        mutationLoading: true,
        error: null,
      };

    case T.APPLICATION_SUCCESS:
      return {
        ...state,
        mutationLoading: false,
        profile: action.payload,
        error: null,
      };

    case T.APPLICATION_FAILURE:
    case T.PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        mutationLoading: false,
        error: action.payload,
      };

    case T.PROFILE_REQUEST:
      return {
        ...state,
        profileLoading: true,
        error: null,
      };

    case T.PROFILE_SUCCESS:
      return {
        ...state,
        profileLoading: false,
        profile: action.payload,
        error: null,
      };

    case T.PROFILE_FAILURE:
      return {
        ...state,
        profileLoading: false,
        error: action.payload,
      };

    case T.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        mutationLoading: false,
        profile: action.payload,
        error: null,
      };

    case T.DASHBOARD_REQUEST:
      return {
        ...state,
        dashboardLoading: true,
        error: null,
      };

    case T.DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboardLoading: false,
        dashboard: action.payload,
        error: null,
      };

    case T.DASHBOARD_FAILURE:
      return {
        ...state,
        dashboardLoading: false,
        error: action.payload,
      };

    case T.ORDERS_REQUEST:
      return {
        ...state,
        ordersLoading: true,
        error: null,
      };

    case T.ORDERS_SUCCESS:
      return {
        ...state,
        ordersLoading: false,
        orders: action.payload?.content || [],
        page: action.payload?.number ?? 0,
        size: action.payload?.size ?? state.size,
        totalPages: action.payload?.totalPages ?? 0,
        totalElements: action.payload?.totalElements ?? 0,
        error: null,
      };

    case T.ORDERS_FAILURE:
      return {
        ...state,
        ordersLoading: false,
        error: action.payload,
      };

    case T.ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case T.ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedOrder: action.payload,
        error: null,
      };

    case T.ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        selectedOrder: null,
        error: action.payload,
      };

    case T.ORDER_STATUS_REQUEST:
      return {
        ...state,
        mutationLoading: true,
        error: null,
      };

    case T.ORDER_STATUS_SUCCESS:
      return {
        ...state,
        mutationLoading: false,
        selectedOrder: action.payload,
        orders: state.orders.map((order) =>
          order.sellerOrderId === action.payload?.sellerOrderId
            ? action.payload
            : order
        ),
        error: null,
      };

    case T.ORDER_STATUS_FAILURE:
      return {
        ...state,
        mutationLoading: false,
        error: action.payload,
      };

    case T.CLEAR_SELECTED_ORDER:
      return {
        ...state,
        selectedOrder: null,
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
