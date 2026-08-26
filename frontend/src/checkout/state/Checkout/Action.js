import { checkoutApi } from "../../api/CheckoutApi";

export const getCheckoutSummary = () => async (dispatch) => {
  console.log("[CHECKOUT ACTION] getCheckoutSummary called");

  dispatch({
    type: "CHECKOUT_SUMMARY_REQUEST",
  });

  try {
    const data = await checkoutApi.getSummary();

    console.log(
      "[CHECKOUT ACTION] Summary received:",
      data
    );

    dispatch({
      type: "CHECKOUT_SUMMARY_SUCCESS",
      payload: data,
    });

    return data;
  } catch (error) {
    console.error(
      "[CHECKOUT ACTION] Summary failed:",
      error
    );

    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      "Unable to load checkout summary.";

    dispatch({
      type: "CHECKOUT_SUMMARY_FAILURE",
      payload: message,
    });

    throw error;
  }
};

export const submitCheckout =
  (request) => async (dispatch) => {
    console.log(
      "[CHECKOUT ACTION] submitCheckout called:",
      request
    );

    dispatch({
      type: "CHECKOUT_SUBMIT_REQUEST",
    });

    try {
      const data = await checkoutApi.checkout(request);

      console.log(
        "[CHECKOUT ACTION] Checkout result:",
        data
      );

      dispatch({
        type: "CHECKOUT_SUBMIT_SUCCESS",
        payload: data,
      });

      return data;
    } catch (error) {
      console.error(
        "[CHECKOUT ACTION] Checkout failed:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Unable to complete checkout.";

      dispatch({
        type: "CHECKOUT_SUBMIT_FAILURE",
        payload: message,
      });

      throw error;
    }
  };

export const clearCheckoutError = () => ({
  type: "CHECKOUT_CLEAR_ERROR",
});

export const clearCheckoutResult = () => ({
  type: "CHECKOUT_CLEAR_RESULT",
});
