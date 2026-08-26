import { AdminApi } from "../../Admin/api/AdminApi";

import {
  ADMIN_DASHBOARD_REQUEST,
  ADMIN_DASHBOARD_SUCCESS,
  ADMIN_DASHBOARD_FAILURE,

  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  ADMIN_USERS_FAILURE,

  ADMIN_ORDERS_REQUEST,
  ADMIN_ORDERS_SUCCESS,
  ADMIN_ORDERS_FAILURE,

  ADMIN_PROFILE_REQUEST,
  ADMIN_PROFILE_SUCCESS,
  ADMIN_PROFILE_FAILURE,

  ADMIN_REPORT_REQUEST,
  ADMIN_REPORT_SUCCESS,
  ADMIN_REPORT_FAILURE,

  ADMIN_VERIFICATION_REQUEST,
  ADMIN_VERIFICATION_SUCCESS,
  ADMIN_VERIFICATION_FAILURE,

  ADMIN_PENDING_SELLERS_REQUEST,
  ADMIN_PENDING_SELLERS_SUCCESS,
  ADMIN_PENDING_SELLERS_FAILURE,

  ADMIN_PENDING_PRODUCTS_REQUEST,
  ADMIN_PENDING_PRODUCTS_SUCCESS,
  ADMIN_PENDING_PRODUCTS_FAILURE,
} from "./ActionType";


export const getDashboard = () => async (dispatch) => {
  dispatch({ type: ADMIN_DASHBOARD_REQUEST });

  try {
    const data = await AdminApi.getDashboard();

    dispatch({
      type: ADMIN_DASHBOARD_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Unable to load dashboard.";

    dispatch({
      type: ADMIN_DASHBOARD_FAILURE,
      payload: message,
    });

    throw error;
  }
};


export const getUsers =
  (page = 0, size = 10) =>
  async (dispatch) => {
    dispatch({ type: ADMIN_USERS_REQUEST });

    try {
      const data = await AdminApi.getUsers(page, size);

      dispatch({
        type: ADMIN_USERS_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to load users.";

      dispatch({
        type: ADMIN_USERS_FAILURE,
        payload: message,
      });

      throw error;
    }
  };


export const getOrders =
  (page = 0, size = 10) =>
  async (dispatch) => {
    dispatch({ type: ADMIN_ORDERS_REQUEST });

    try {
      const data = await AdminApi.getOrders(page, size);

      dispatch({
        type: ADMIN_ORDERS_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to load orders.";

      dispatch({
        type: ADMIN_ORDERS_FAILURE,
        payload: message,
      });

      throw error;
    }
  };


export const getProfile = () => async (dispatch) => {
  dispatch({ type: ADMIN_PROFILE_REQUEST });

  try {
    const data = await AdminApi.getProfile();

    dispatch({
      type: ADMIN_PROFILE_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Unable to load profile.";

    dispatch({
      type: ADMIN_PROFILE_FAILURE,
      payload: message,
    });

    throw error;
  }
};


export const updateProfile = (data) => async (dispatch) => {
  dispatch({ type: ADMIN_PROFILE_REQUEST });

  try {
    const response = await AdminApi.updateProfile(data);

    dispatch({
      type: ADMIN_PROFILE_SUCCESS,
      payload: response,
    });

    return response;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Unable to update profile.";

    dispatch({
      type: ADMIN_PROFILE_FAILURE,
      payload: message,
    });

    throw error;
  }
};


export const getReportSummary = () => async (dispatch) => {
  dispatch({ type: ADMIN_REPORT_REQUEST });

  try {
    const data = await AdminApi.getReportSummary();

    dispatch({
      type: ADMIN_REPORT_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Unable to load reports.";

    dispatch({
      type: ADMIN_REPORT_FAILURE,
      payload: message,
    });

    throw error;
  }
};


/*
 * ============================================
 * PENDING SELLER APPLICATIONS
 * ============================================
 */
export const getPendingSellerApplications =
  () => async (dispatch) => {
    dispatch({
      type: ADMIN_PENDING_SELLERS_REQUEST,
    });

    try {
      const data =
        await AdminApi.getPendingSellerApplications();

      dispatch({
        type: ADMIN_PENDING_SELLERS_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to load seller applications.";

      dispatch({
        type: ADMIN_PENDING_SELLERS_FAILURE,
        payload: message,
      });

      throw error;
    }
  };


/*
 * ============================================
 * PENDING PRODUCTS
 * ============================================
 */
export const getPendingProducts =
  () => async (dispatch) => {
    dispatch({
      type: ADMIN_PENDING_PRODUCTS_REQUEST,
    });

    try {
      const data =
        await AdminApi.getPendingProducts();

      dispatch({
        type: ADMIN_PENDING_PRODUCTS_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to load pending products.";

      dispatch({
        type: ADMIN_PENDING_PRODUCTS_FAILURE,
        payload: message,
      });

      throw error;
    }
  };


/*
 * ============================================
 * VERIFY SELLER
 * ============================================
 */
export const verifySeller =
  (sellerId, data) =>
  async (dispatch) => {
    dispatch({
      type: ADMIN_VERIFICATION_REQUEST,
    });

    try {
      const response =
        await AdminApi.verifySeller(
          sellerId,
          data
        );

      dispatch({
        type: ADMIN_VERIFICATION_SUCCESS,
        payload: response,
      });

      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to verify seller.";

      dispatch({
        type: ADMIN_VERIFICATION_FAILURE,
        payload: message,
      });

      throw error;
    }
  };


/*
 * ============================================
 * VERIFY PRODUCT
 * ============================================
 */
export const verifyProduct =
  (productId, data) =>
  async (dispatch) => {
    dispatch({
      type: ADMIN_VERIFICATION_REQUEST,
    });

    try {
      const response =
        await AdminApi.verifyProduct(
          productId,
          data
        );

      dispatch({
        type: ADMIN_VERIFICATION_SUCCESS,
        payload: response,
      });

      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to verify product.";

      dispatch({
        type: ADMIN_VERIFICATION_FAILURE,
        payload: message,
      });

      throw error;
    }
  };