import axios from "axios";
import API_BASE_URL from "../../admin/config/apiConfig";

const PAYMENT_URL = `${API_BASE_URL}/payments`;

function authConfig() {
  const token = localStorage.getItem("se_token");

  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

export const paymentApi = {
  /**
   * Creates a Razorpay order for an existing marketplace order.
   *
   * POST /api/payments/orders/{orderId}
   */
  async createPaymentOrder(orderId) {
    if (!orderId) {
      throw new Error("Order ID is required to create a payment.");
    }

    try {
      const response = await axios.post(
        `${PAYMENT_URL}/orders/${orderId}`,
        {},
        authConfig()
      );

      return response.data;
    } catch (error) {
      throw new Error(
        errorMessage(error, "Unable to create Razorpay payment order.")
      );
    }
  },

  /**
   * Verifies Razorpay's payment signature.
   *
   * POST /api/payments/verify
   */
  async verifyPayment(payload) {
    try {
      const response = await axios.post(
        `${PAYMENT_URL}/verify`,
        {
          razorpayPaymentId: payload.razorpayPaymentId,
          razorpayOrderId: payload.razorpayOrderId,
          razorpaySignature: payload.razorpaySignature,
        },
        authConfig()
      );

      return response.data;
    } catch (error) {
      throw new Error(
        errorMessage(error, "Unable to verify Razorpay payment.")
      );
    }
  },

  /**
   * GET /api/payments/orders/{orderId}
   */
  async getPayment(orderId) {
    try {
      const response = await axios.get(
        `${PAYMENT_URL}/orders/${orderId}`,
        authConfig()
      );

      return response.data;
    } catch (error) {
      throw new Error(
        errorMessage(error, "Unable to load payment details.")
      );
    }
  },

  /**
   * GET /api/payments
   */
  async getMyPayments(page = 0, size = 10) {
    try {
      const response = await axios.get(PAYMENT_URL, {
        ...authConfig(),
        params: { page, size },
      });

      return response.data;
    } catch (error) {
      throw new Error(
        errorMessage(error, "Unable to load payment history.")
      );
    }
  },
};
