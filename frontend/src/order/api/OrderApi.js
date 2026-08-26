import axios from "axios";
import API_BASE_URL from "../../admin/config/apiConfig";

const ORDER_URL = `${API_BASE_URL}/orders`;

function authConfig() {
  const token = localStorage.getItem("se_token");

  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
}

function errorMessage(error, fallback) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

export const orderApi = {
  async getMyOrders(page = 0, size = 10) {
    try {
      const response = await axios.get(
        `${ORDER_URL}?page=${page}&size=${size}&sort=createdAt,desc`,
        authConfig()
      );

      return response.data;
    } catch (error) {
      throw new Error(
        errorMessage(error, "Unable to load your orders.")
      );
    }
  },

  async getOrder(orderId) {
    try {
      const response = await axios.get(
        `${ORDER_URL}/${orderId}`,
        authConfig()
      );

      return response.data;
    } catch (error) {
      throw new Error(
        errorMessage(error, "Unable to load order details.")
      );
    }
  },

  async cancelOrder(orderId) {
    try {
      const response = await axios.put(
        `${ORDER_URL}/${orderId}/cancel`,
        {},
        authConfig()
      );

      return response.data;
    } catch (error) {
      throw new Error(
        errorMessage(error, "Unable to cancel this order.")
      );
    }
  },
};
