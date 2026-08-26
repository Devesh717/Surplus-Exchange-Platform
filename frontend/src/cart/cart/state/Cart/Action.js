import { cartApi } from "../../cart/api/CartApi";
import { CART_ACTION_TYPES as T } from "./ActionType";

function errorMessage(error, fallback) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

export const getCart = () => async (dispatch) => {
  console.log("[CART ACTION] getCart()");

  dispatch({ type: T.CART_REQUEST });

  try {
    const data = await cartApi.getCart();

    console.log("[CART ACTION] getCart response:", data);

    dispatch({
      type: T.CART_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message = errorMessage(error, "Unable to load cart.");

    console.error("[CART ACTION] getCart error:", error);

    dispatch({
      type: T.CART_FAILURE,
      payload: message,
    });

    throw error;
  }
};

export const addToCart =
  (productId, quantity = 1) =>
  async (dispatch) => {
    console.log("[CART ACTION] addToCart()", {
      productId,
      quantity,
    });

    dispatch({ type: T.CART_ADD_REQUEST });

    try {
      const data = await cartApi.addItem(productId, quantity);

      dispatch({
        type: T.CART_ADD_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      const message = errorMessage(
        error,
        "Unable to add product to cart."
      );

      dispatch({
        type: T.CART_ADD_FAILURE,
        payload: message,
      });

      throw error;
    }
  };

export const updateCartItem =
  (itemId, quantity) =>
  async (dispatch) => {
    console.log("[CART ACTION] updateCartItem()", {
      itemId,
      quantity,
    });

    dispatch({ type: T.CART_UPDATE_REQUEST });

    try {
      const data = await cartApi.updateItem(itemId, quantity);

      dispatch({
        type: T.CART_UPDATE_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      const message = errorMessage(
        error,
        "Unable to update cart quantity."
      );

      dispatch({
        type: T.CART_UPDATE_FAILURE,
        payload: message,
      });

      throw error;
    }
  };

export const removeCartItem = (itemId) => async (dispatch) => {
  console.log("====================================");
  console.log("[CART ACTION] REMOVE CART ITEM");
  console.log("[CART ACTION] itemId:", itemId);
  console.log("====================================");

  dispatch({
    type: "REMOVE_CART_ITEM_REQUEST",
  });

  try {
    const response = await cartApi.removeItem(itemId);

    console.log("[CART ACTION] DELETE RESPONSE:", response);

    dispatch({
      type: "REMOVE_CART_ITEM_SUCCESS",
      payload: itemId,
    });

    return response;
  } catch (error) {
    console.error(
      "[CART ACTION] DELETE ERROR:",
      error
    );

    dispatch({
      type: "REMOVE_CART_ITEM_FAILURE",
      payload:
        error.response?.data?.message ||
        error.message ||
        "Failed to remove cart item",
    });

    throw error;
  }
};

export const clearCart = () => async (dispatch) => {
  console.log("[CART ACTION] clearCart()");

  dispatch({ type: T.CART_CLEAR_REQUEST });

  try {
    const data = await cartApi.clearCart();

    dispatch({
      type: T.CART_CLEAR_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message = errorMessage(
      error,
      "Unable to clear cart."
    );

    dispatch({
      type: T.CART_CLEAR_FAILURE,
      payload: message,
    });

    throw error;
  }
};

export const clearCartError = () => ({
  type: T.CLEAR_CART_ERROR,
});
