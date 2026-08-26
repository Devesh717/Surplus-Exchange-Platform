import { userDashboardApi } from "../../api/UserDashboardApi";
import { USER_DASHBOARD_ACTION_TYPES as T } from "./ActionType";

export const getUserDashboard = () => async (dispatch) => {
  dispatch({
    type: T.DASHBOARD_REQUEST,
  });

  try {
    const data = await userDashboardApi.getDashboard();

    dispatch({
      type: T.DASHBOARD_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message =
      error?.message ||
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Unable to load your dashboard.";

    dispatch({
      type: T.DASHBOARD_FAILURE,
      payload: message,
    });

    throw error;
  }
};

export const clearUserDashboardError = () => ({
  type: T.CLEAR_DASHBOARD_ERROR,
});

export const clearUserDashboard = () => ({
  type: T.CLEAR_DASHBOARD,
});
