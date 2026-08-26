import { USER_DASHBOARD_ACTION_TYPES as T } from "./ActionType";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const userDashboardInitialState = initialState;

export default function userDashboardReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case T.DASHBOARD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case T.DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case T.DASHBOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case T.CLEAR_DASHBOARD_ERROR:
      return {
        ...state,
        error: null,
      };

    case T.CLEAR_DASHBOARD:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
