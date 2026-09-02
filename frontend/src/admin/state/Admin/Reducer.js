import {
  ADMIN_DASHBOARD_REQUEST,
  ADMIN_DASHBOARD_SUCCESS,
  ADMIN_DASHBOARD_FAILURE,

  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  ADMIN_USERS_FAILURE,

  ADMIN_ORDERS_REQUEST,
  ADMIN_ORDERS_SUCCESS,
  ADMIN_ORDERS_FAILURE,

  ADMIN_PROFILE_REQUEST,
  ADMIN_PROFILE_SUCCESS,
  ADMIN_PROFILE_FAILURE,

  ADMIN_REPORT_REQUEST,
  ADMIN_REPORT_SUCCESS,
  ADMIN_REPORT_FAILURE,

  ADMIN_VERIFICATION_REQUEST,
  ADMIN_VERIFICATION_SUCCESS,
  ADMIN_VERIFICATION_FAILURE,

  ADMIN_PENDING_SELLERS_REQUEST,
  ADMIN_PENDING_SELLERS_SUCCESS,
  ADMIN_PENDING_SELLERS_FAILURE,

  ADMIN_PENDING_PRODUCTS_REQUEST,
  ADMIN_PENDING_PRODUCTS_SUCCESS,
  ADMIN_PENDING_PRODUCTS_FAILURE,

  ADMIN_PRODUCT_REQUEST,
ADMIN_PRODUCT_SUCCESS,
ADMIN_PRODUCT_FAILURE,
} from "./ActionType";


export const initialAdminState = {
  dashboard: null,

  users: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    number: 0,
    size: 10,
  },

  orders: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    number: 0,
    size: 10,
  },

  profile: null,

  report: null,

  verification: {
    loading: false,
    result: null,
    error: null,
  },

  pendingSellers: {
    content: [],
    loading: false,
    error: null,
  },

  pendingProducts: {
    content: [],
    loading: false,
    error: null,
  },

  selectedProduct: null,

product: {
  loading: false,
  error: null,
},

  loading: {
    dashboard: false,
    users: false,
    orders: false,
    profile: false,
    report: false,
  },

  errors: {
    dashboard: "",
    users: "",
    orders: "",
    profile: "",
    report: "",
  },
};


export default function adminReducer(
  state = initialAdminState,
  action
) {
  switch (action.type) {

    // ==========================================
    // DASHBOARD
    // ==========================================

    case ADMIN_DASHBOARD_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          dashboard: true,
        },
        errors: {
          ...state.errors,
          dashboard: "",
        },
      };

    case ADMIN_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: action.payload,
        loading: {
          ...state.loading,
          dashboard: false,
        },
      };

    case ADMIN_DASHBOARD_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          dashboard: false,
        },
        errors: {
          ...state.errors,
          dashboard: action.payload,
        },
      };


    // ==========================================
    // USERS
    // ==========================================

    case ADMIN_USERS_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          users: true,
        },
        errors: {
          ...state.errors,
          users: "",
        },
      };

    case ADMIN_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: {
          ...state.loading,
          users: false,
        },
      };

    case ADMIN_USERS_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          users: false,
        },
        errors: {
          ...state.errors,
          users: action.payload,
        },
      };


    // ==========================================
    // ORDERS
    // ==========================================

    case ADMIN_ORDERS_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          orders: true,
        },
        errors: {
          ...state.errors,
          orders: "",
        },
      };

    case ADMIN_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: {
          ...state.loading,
          orders: false,
        },
      };

    case ADMIN_ORDERS_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          orders: false,
        },
        errors: {
          ...state.errors,
          orders: action.payload,
        },
      };


    // ==========================================
    // PROFILE
    // ==========================================

    case ADMIN_PROFILE_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          profile: true,
        },
        errors: {
          ...state.errors,
          profile: "",
        },
      };

    case ADMIN_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: {
          ...state.loading,
          profile: false,
        },
      };

    case ADMIN_PROFILE_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          profile: false,
        },
        errors: {
          ...state.errors,
          profile: action.payload,
        },
      };


    // ==========================================
    // REPORT
    // ==========================================

    case ADMIN_REPORT_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          report: true,
        },
        errors: {
          ...state.errors,
          report: "",
        },
      };

    case ADMIN_REPORT_SUCCESS:
      return {
        ...state,
        report: action.payload,
        loading: {
          ...state.loading,
          report: false,
        },
      };

    case ADMIN_REPORT_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          report: false,
        },
        errors: {
          ...state.errors,
          report: action.payload,
        },
      };


    // ==========================================
    // PENDING SELLERS
    // ==========================================

    case ADMIN_PENDING_SELLERS_REQUEST:
      return {
        ...state,
        pendingSellers: {
          ...state.pendingSellers,
          loading: true,
          error: null,
        },
      };

    case ADMIN_PENDING_SELLERS_SUCCESS:
      return {
        ...state,
        pendingSellers: {
          content:
            Array.isArray(action.payload)
              ? action.payload
              : action.payload?.content || [],
          loading: false,
          error: null,
        },
      };

    case ADMIN_PENDING_SELLERS_FAILURE:
      return {
        ...state,
        pendingSellers: {
          ...state.pendingSellers,
          loading: false,
          error: action.payload,
        },
      };


    // ==========================================
    // PENDING PRODUCTS
    // ==========================================

    case ADMIN_PENDING_PRODUCTS_REQUEST:
      return {
        ...state,
        pendingProducts: {
          ...state.pendingProducts,
          loading: true,
          error: null,
        },
      };

    case ADMIN_PENDING_PRODUCTS_SUCCESS:
      return {
        ...state,
        pendingProducts: {
          content:
            Array.isArray(action.payload)
              ? action.payload
              : action.payload?.content || [],
          loading: false,
          error: null,
        },
      };

    case ADMIN_PENDING_PRODUCTS_FAILURE:
      return {
        ...state,
        pendingProducts: {
          ...state.pendingProducts,
          loading: false,
          error: action.payload,
        },
      };

      // ==========================================
// ADMIN PRODUCT DETAILS
// ==========================================

case ADMIN_PRODUCT_REQUEST:
  return {
    ...state,
    selectedProduct: null,
    product: {
      loading: true,
      error: null,
    },
  };

case ADMIN_PRODUCT_SUCCESS:
  return {
    ...state,
    selectedProduct: action.payload,
    product: {
      loading: false,
      error: null,
    },
  };

case ADMIN_PRODUCT_FAILURE:
  return {
    ...state,
    selectedProduct: null,
    product: {
      loading: false,
      error: action.payload,
    },
  };


    // ==========================================
    // VERIFICATION
    // ==========================================

    case ADMIN_VERIFICATION_REQUEST:
      return {
        ...state,
        verification: {
          loading: true,
          result: null,
          error: null,
        },
      };

    case ADMIN_VERIFICATION_SUCCESS:
      return {
        ...state,
        verification: {
          loading: false,
          result: action.payload,
          error: null,
        },
      };

    case ADMIN_VERIFICATION_FAILURE:
      return {
        ...state,
        verification: {
          loading: false,
          result: null,
          error: action.payload,
        },
      };


    default:
      return state;
  }
}