import {
  AUTH_CLEAR_ERROR,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
} from "./ActionType";

const initialState = {
  token: localStorage.getItem("se_token"),
  role: localStorage.getItem("se_role"),
  userId: localStorage.getItem("se_user_id"),
  loading: false,
  error: null,
  isAuthenticated: Boolean(localStorage.getItem("se_token")),
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_REGISTER_REQUEST:
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        loading: false,
        error: null,
        isAuthenticated: true,
      };

    case AUTH_REGISTER_FAILURE:
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AUTH_LOGOUT:
      return {
        ...initialState,
        token: null,
        role: null,
        userId: null,
        isAuthenticated: false,
      };

    case AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
