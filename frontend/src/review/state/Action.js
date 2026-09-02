import { reviewApi } from "../api/reviewApi";
import { REVIEW_ACTION_TYPES as T } from "./ActionType";

export const createReview =
  (productId, reviewData) =>
  async (dispatch) => {
    dispatch({
      type: T.CREATE_REQUEST,
    });

    try {
      const data = await reviewApi.createReview(
        productId,
        reviewData
      );

      dispatch({
        type: T.CREATE_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to submit review.";

      dispatch({
        type: T.CREATE_FAILURE,
        payload: message,
      });

      throw error;
    }
  };

export const getProductReviews =
  (productId, params = {}) =>
  async (dispatch) => {
    dispatch({
      type: T.GET_REQUEST,
    });

    try {
      const data =
        await reviewApi.getProductReviews(
          productId,
          params
        );

      dispatch({
        type: T.GET_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to load reviews.";

      dispatch({
        type: T.GET_FAILURE,
        payload: message,
      });

      throw error;
    }
  };

export const updateReview =
  (reviewId, reviewData) =>
  async (dispatch) => {
    dispatch({
      type: T.UPDATE_REQUEST,
    });

    try {
      const data =
        await reviewApi.updateReview(
          reviewId,
          reviewData
        );

      dispatch({
        type: T.UPDATE_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to update review.";

      dispatch({
        type: T.UPDATE_FAILURE,
        payload: message,
      });

      throw error;
    }
  };

export const deleteReview =
  (reviewId) =>
  async (dispatch) => {
    dispatch({
      type: T.DELETE_REQUEST,
    });

    try {
      await reviewApi.deleteReview(reviewId);

      dispatch({
        type: T.DELETE_SUCCESS,
        payload: reviewId,
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to delete review.";

      dispatch({
        type: T.DELETE_FAILURE,
        payload: message,
      });

      throw error;
    }
  };

export const clearReviewError = () => ({
  type: T.CLEAR_ERROR,
});