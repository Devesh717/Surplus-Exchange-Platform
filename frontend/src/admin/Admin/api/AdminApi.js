import API_BASE_URL from "../../config/apiConfig";

function getHeaders() {
  const token = localStorage.getItem("se_token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";

  const data = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        (typeof data === "string" && data) ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
}

/*
 * Normalize backend list responses.
 *
 * Backend currently returns:
 * List<Seller>
 * List<Product>
 *
 * This also supports a Spring Page response if you change
 * the backend to pagination later.
 */
function normalizeList(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.content)) {
    return data.content;
  }

  return [];
}

export const AdminApi = {
  // ==============================
  // DASHBOARD
  // ==============================

  getDashboard: () =>
    request("/admin/dashboard"),

  // ==============================
  // USERS
  // ==============================

  getUsers: (page = 0, size = 10) =>
    request(`/admin/users?page=${page}&size=${size}`),

  // ==============================
  // SELLER VERIFICATION
  // ==============================

  getPendingSellerApplications: async () => {
    const data = await request("/admin/sellers/pending");

    return normalizeList(data);
  },

  verifySeller: (sellerId, data) =>
    request(`/admin/sellers/${sellerId}/verification`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // ==============================
// PRODUCT VERIFICATION
// ==============================

getPendingProducts: async () => {
  const data = await request("/admin/products/pending");

  return normalizeList(data);
},

getProduct: (productId) =>
  request(`/admin/products/${productId}`),

verifyProduct: (productId, data) =>
  request(`/admin/products/${productId}/verification`, {
    method: "PUT",
    body: JSON.stringify(data),
}),

  // ==============================
  // ORDERS
  // ==============================

  getOrders: (page = 0, size = 10) =>
    request(`/admin/orders?page=${page}&size=${size}`),

  getOrderById: (orderId) =>
    request(`/admin/orders/${orderId}`),

  // ==============================
  // PROFILE
  // ==============================

  getProfile: () =>
    request("/admin/profile"),

  updateProfile: (data) =>
    request("/admin/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // ==============================
  // REPORTS
  // ==============================

  getReportSummary: () =>
    request("/admin/reports/summary"),
};