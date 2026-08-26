import { paymentApi } from "../../api/PaymentApi";
import { PAYMENT_ACTION_TYPES as T } from "./ActionType";

function errorMessage(error, fallback) {
  return error?.message || fallback;
}

export const createPaymentOrder = (orderId) => async (dispatch) => {
  dispatch({ type: T.CREATE_REQUEST });

  try {
    const data = await paymentApi.createPaymentOrder(orderId);

    dispatch({
      type: T.CREATE_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message = errorMessage(
      error,
      "Unable to create Razorpay payment order."
    );

    dispatch({
      type: T.CREATE_FAILURE,
      payload: message,
    });

    throw error;
  }
};

export const verifyPayment = (payload) => async (dispatch) => {
  dispatch({ type: T.VERIFY_REQUEST });

  try {
    const data = await paymentApi.verifyPayment(payload);

    dispatch({
      type: T.VERIFY_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message = errorMessage(
      error,
      "Unable to verify Razorpay payment."
    );

    dispatch({
      type: T.VERIFY_FAILURE,
      payload: message,
    });

    throw error;
  }
};

export const getPayment = (orderId) => async (dispatch) => {
  dispatch({ type: T.GET_REQUEST });

  try {
    const data = await paymentApi.getPayment(orderId);

    dispatch({
      type: T.GET_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message = errorMessage(
      error,
      "Unable to load payment details."
    );

    dispatch({
      type: T.GET_FAILURE,
      payload: message,
    });

    throw error;
  }
};

export const clearPaymentError = () => ({
  type: T.CLEAR_ERROR,
});

export const resetPayment = () => ({
  type: T.RESET,
});
