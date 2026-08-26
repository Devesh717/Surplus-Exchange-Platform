import axios from "axios";
import API_BASE_URL from "../../admin/config/apiConfig";

const SELLER_URL = `${API_BASE_URL}/seller`;
const DASHBOARD_URL = `${SELLER_URL}/dashboard`;
const ORDERS_URL = `${SELLER_URL}/orders`;

const getAuthConfig = () => {
  const token = localStorage.getItem("se_token");

  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
};

console.log("====================================");
console.log("[SELLER API] MODULE LOADED");
console.log("[SELLER API] SELLER_URL:", SELLER_URL);
console.log("[SELLER API] DASHBOARD_URL:", DASHBOARD_URL);
console.log("[SELLER API] ORDERS_URL:", ORDERS_URL);
console.log("====================================");

export const sellerApi = {

  // ============================================================
  // PUBLIC - SELLER APPLICATION
  // POST /api/seller
  // ============================================================
  async apply(request) {
  try {
    console.log("====================================");
    console.log("[SELLER API] APPLY REQUEST");
    console.log("[SELLER API] URL:", SELLER_URL);
    console.log("[SELLER API] DATA:", request);
    console.log("====================================");

    const response = await axios.post(
      SELLER_URL,
      request,
      getAuthConfig()
    );

    console.log("[SELLER API] APPLY SUCCESS:", response.data);

    return response.data;
  } catch (error) {
    console.error("====================================");
    console.error("[SELLER API] APPLY FAILED");
    console.error("[SELLER API] status:", error.response?.status);
    console.error("[SELLER API] response:", error.response?.data);
    console.error("[SELLER API] message:", error.message);
    console.error("====================================");

    throw error;
  }
},

  // ============================================================
  // PROTECTED - SELLER PROFILE
  // GET /api/seller/me
  // ============================================================
  async getProfile() {

    console.log("[SELLER API] GET PROFILE");

    try {

      const response = await axios.get(
        `${SELLER_URL}/me`,
        getAuthConfig()
      );

      console.log("[SELLER API] PROFILE:", response.data);

      return response.data;

    } catch (error) {

      console.error(
        "[SELLER API] PROFILE ERROR:",
        error.response?.data || error.message
      );

      throw error;
    }
  },

  // ============================================================
  // PROTECTED - UPDATE SELLER PROFILE
  // PUT /api/seller
  // ============================================================
  async updateProfile(request) {

    console.log("[SELLER API] UPDATE PROFILE");
    console.log("[SELLER API] REQUEST:", request);

    const response = await axios.put(
      SELLER_URL,
      request,
      getAuthConfig()
    );

    return response.data;
  },

  // ============================================================
  // PROTECTED - SELLER DASHBOARD
  // GET /api/seller/dashboard
  // ============================================================
  async getDashboard() {

    console.log("====================================");
    console.log("[SELLER API] GET DASHBOARD");
    console.log("[SELLER API] URL:", DASHBOARD_URL);
    console.log("====================================");

    const response = await axios.get(
      DASHBOARD_URL,
      getAuthConfig()
    );

    console.log("[SELLER API] DASHBOARD DATA:", response.data);

    return response.data;
  },

  // ============================================================
  // PROTECTED - SELLER ORDERS
  // GET /api/seller/orders
  // ============================================================
  async getOrders({
    page = 0,
    size = 10,
    sort = "createdAt,desc",
  } = {}) {

    console.log("====================================");
    console.log("[SELLER API] GET ORDERS");
    console.log("[SELLER API] PAGE:", page);
    console.log("[SELLER API] SIZE:", size);
    console.log("[SELLER API] SORT:", sort);
    console.log("[SELLER API] URL:", ORDERS_URL);
    console.log("====================================");

    const response = await axios.get(
      ORDERS_URL,
      {
        ...getAuthConfig(),
        params: {
          page,
          size,
          sort,
        },
      }
    );

    console.log("[SELLER API] ORDERS DATA:", response.data);

    return response.data;
  },

  // ============================================================
  // PROTECTED - SELLER ORDER DETAILS
  // GET /api/seller/orders/{id}
  // ============================================================
  async getOrderById(id) {

    console.log("====================================");
    console.log("[SELLER API] GET ORDER");
    console.log("[SELLER API] ID:", id);
    console.log("====================================");

    const response = await axios.get(
      `${ORDERS_URL}/${id}`,
      getAuthConfig()
    );

    console.log("[SELLER API] ORDER DATA:", response.data);

    return response.data;
  },

  // ============================================================
  // PROTECTED - UPDATE ORDER STATUS
  // PUT /api/seller/orders/{id}/status
  // ============================================================
  async updateOrderStatus(id, request) {

    console.log("====================================");
    console.log("[SELLER API] UPDATE ORDER STATUS");
    console.log("[SELLER API] ID:", id);
    console.log("[SELLER API] REQUEST:", request);
    console.log("====================================");

    const response = await axios.put(
      `${ORDERS_URL}/${id}/status`,
      request,
      getAuthConfig()
    );

    console.log(
      "[SELLER API] UPDATED ORDER:",
      response.data
    );

    return response.data;
  },
};