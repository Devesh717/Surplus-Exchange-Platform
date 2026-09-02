import { USER_PROFILE_ACTION_TYPES as T } from "./ActionType";

const initialState = {
  profile: null,
  loading: false,
  updateLoading: false,
  error: null,
};

export const userProfileInitialState = initialState;

export default function userProfileReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case T.PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case T.PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: null,
      };

    case T.PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case T.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        updateLoading: true,
        error: null,
      };

    case T.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        profile: action.payload,
        error: null,
      };

    case T.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        updateLoading: false,
        error: action.payload,
      };

    case T.CLEAR_PROFILE_ERROR:
      return {
        ...state,
        error: null,
      };

    case T.CLEAR_PROFILE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}