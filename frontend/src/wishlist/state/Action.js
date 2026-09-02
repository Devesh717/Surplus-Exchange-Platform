import { wishlistApi } from "../api/wishlistApi";
import {
  WISHLIST_REQUEST,
  WISHLIST_SUCCESS,
  WISHLIST_FAILURE,
  WISHLIST_ADD_REQUEST,
  WISHLIST_ADD_SUCCESS,
  WISHLIST_ADD_FAILURE,
  WISHLIST_REMOVE_REQUEST,
  WISHLIST_REMOVE_SUCCESS,
  WISHLIST_REMOVE_FAILURE,
  WISHLIST_CLEAR_REQUEST,
  WISHLIST_CLEAR_SUCCESS,
  WISHLIST_CLEAR_FAILURE,
} from "./Types";

const getErrorMessage = (error, fallback) =>
  error?.message || fallback;

export const getWishlist = () => async (dispatch) => {
  dispatch({ type: WISHLIST_REQUEST });

  try {
    const data = await wishlistApi.getWishlist();

    dispatch({
      type: WISHLIST_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message = getErrorMessage(
      error,
      "Unable to load your wishlist."
    );

    dispatch({
      type: WISHLIST_FAILURE,
      payload: message,
    });

    throw error;
  }
};

export const addToWishlist = (productId) => async (dispatch) => {
  dispatch({ type: WISHLIST_ADD_REQUEST });

  try {
    const data = await wishlistApi.addToWishlist(productId);

    dispatch({
      type: WISHLIST_ADD_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message = getErrorMessage(
      error,
      "Unable to add product to wishlist."
    );

    dispatch({
      type: WISHLIST_ADD_FAILURE,
      payload: message,
    });

    throw error;
  }
};

export const removeWishlistItem = (itemId) => async (dispatch) => {
  dispatch({ type: WISHLIST_REMOVE_REQUEST });

  try {
    await wishlistApi.removeItem(itemId);

    const data = await wishlistApi.getWishlist();

    dispatch({
      type: WISHLIST_REMOVE_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message = getErrorMessage(
      error,
      "Unable to remove wishlist item."
    );

    dispatch({
      type: WISHLIST_REMOVE_FAILURE,
      payload: message,
    });

    throw error;
  }
};

export const clearWishlist = () => async (dispatch) => {
  dispatch({ type: WISHLIST_CLEAR_REQUEST });

  try {
    await wishlistApi.clearWishlist();

    const data = {
      wishlistId: null,
      items: [],
    };

    dispatch({
      type: WISHLIST_CLEAR_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message = getErrorMessage(
      error,
      "Unable to clear wishlist."
    );

    dispatch({
      type: WISHLIST_CLEAR_FAILURE,
      payload: message,
    });

    throw error;
  }
};
