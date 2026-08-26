import { sellerApi } from "../../api/SellerApi";
import { SELLER_ACTION_TYPES as T } from "./ActionType";

const getErrorMessage = (
  error,
  fallback = "Something went wrong."
) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  fallback;

export const applyAsSeller = (request) => async (dispatch) => {
  dispatch({ type: T.APPLICATION_REQUEST });

  try {
    const data = await sellerApi.apply(request);

    dispatch({
      type: T.APPLICATION_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: T.APPLICATION_FAILURE,
      payload: getErrorMessage(
        error,
        "Unable to submit seller application."
      ),
    });
    throw error;
  }
};

export const getSellerProfile = () => async (dispatch) => {
  dispatch({ type: T.PROFILE_REQUEST });

  try {
    const data = await sellerApi.getProfile();

    dispatch({
      type: T.PROFILE_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: T.PROFILE_FAILURE,
      payload: getErrorMessage(
        error,
        "Unable to load seller profile."
      ),
    });
    throw error;
  }
};

export const updateSellerProfile =
  (request) => async (dispatch) => {
    dispatch({ type: T.PROFILE_UPDATE_REQUEST });

    try {
      const data = await sellerApi.updateProfile(request);

      dispatch({
        type: T.PROFILE_UPDATE_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      dispatch({
        type: T.PROFILE_UPDATE_FAILURE,
        payload: getErrorMessage(
          error,
          "Unable to update seller profile."
        ),
      });
      throw error;
    }
  };

export const getSellerDashboard = () => async (dispatch) => {
  dispatch({ type: T.DASHBOARD_REQUEST });

  try {
    const data = await sellerApi.getDashboard();

    dispatch({
      type: T.DASHBOARD_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: T.DASHBOARD_FAILURE,
      payload: getErrorMessage(
        error,
        "Unable to load seller dashboard."
      ),
    });
    throw error;
  }
};

export const getSellerOrders =
  (params = {}) =>
  async (dispatch) => {
    dispatch({ type: T.ORDERS_REQUEST });

    try {
      const data = await sellerApi.getOrders(params);

      dispatch({
        type: T.ORDERS_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      dispatch({
        type: T.ORDERS_FAILURE,
        payload: getErrorMessage(
          error,
          "Unable to load seller orders."
        ),
      });
      throw error;
    }
  };

export const getSellerOrder =
  (id) => async (dispatch) => {
    dispatch({ type: T.ORDER_REQUEST });

    try {
      const data = await sellerApi.getOrderById(id);

      dispatch({
        type: T.ORDER_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      dispatch({
        type: T.ORDER_FAILURE,
        payload: getErrorMessage(
          error,
          "Seller order not found."
        ),
      });
      throw error;
    }
  };

export const updateSellerOrderStatus =
  (id, request) => async (dispatch) => {
    dispatch({ type: T.ORDER_STATUS_REQUEST });

    try {
      const data = await sellerApi.updateOrderStatus(
        id,
        request
      );

      dispatch({
        type: T.ORDER_STATUS_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      dispatch({
        type: T.ORDER_STATUS_FAILURE,
        payload: getErrorMessage(
          error,
          "Unable to update order status."
        ),
      });
      throw error;
    }
  };

export const clearSellerError = () => ({
  type: T.CLEAR_ERROR,
});

export const clearSelectedSellerOrder = () => ({
  type: T.CLEAR_SELECTED_ORDER,
});
