import { orderApi } from "../../api/OrderApi";
import { ORDER_ACTION_TYPES as T } from "./ActionType";

export const getMyOrders =
  (page = 0, size = 10) =>
  async (dispatch) => {
    dispatch({ type: T.ORDERS_REQUEST });

    try {
      const data = await orderApi.getMyOrders(page, size);

      dispatch({
        type: T.ORDERS_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      const message =
        error?.message || "Unable to load your orders.";

      dispatch({
        type: T.ORDERS_FAILURE,
        payload: message,
      });

      throw error;
    }
  };

export const getOrderDetails =
  (orderId) =>
  async (dispatch) => {
    dispatch({ type: T.ORDER_DETAILS_REQUEST });

    try {
      const data = await orderApi.getOrder(orderId);

      dispatch({
        type: T.ORDER_DETAILS_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      const message =
        error?.message || "Unable to load order details.";

      dispatch({
        type: T.ORDER_DETAILS_FAILURE,
        payload: message,
      });

      throw error;
    }
  };

export const cancelOrder =
  (orderId) =>
  async (dispatch) => {
    dispatch({ type: T.ORDER_CANCEL_REQUEST });

    try {
      const data = await orderApi.cancelOrder(orderId);

      dispatch({
        type: T.ORDER_CANCEL_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      const message =
        error?.message || "Unable to cancel this order.";

      dispatch({
        type: T.ORDER_CANCEL_FAILURE,
        payload: message,
      });

      throw error;
    }
  };

export const clearOrderError = () => ({
  type: T.CLEAR_ORDER_ERROR,
});

export const clearOrderDetails = () => ({
  type: T.CLEAR_ORDER_DETAILS,
});
