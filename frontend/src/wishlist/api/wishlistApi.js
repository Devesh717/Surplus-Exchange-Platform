const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

const getToken = () => localStorage.getItem("se_token");

const request = async (path, options = {}) => {
  const token = localStorage.getItem("se_token");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  // Handle error responses
  if (!response.ok) {
    let message = "Something went wrong.";

    const text = await response.text();

    if (text) {
      try {
        const data = JSON.parse(text);
        message = data?.message || data?.error || message;
      } catch {
        message = text;
      }
    }

    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  // No response body
  if (response.status === 204) {
    return null;
  }

  // Read response safely
  const text = await response.text();

  // Empty response body
  if (!text.trim()) {
    return null;
  }

  // JSON response
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const wishlistApi = {
  getWishlist: () => request("/wishlist"),

  addToWishlist: (productId) =>
    request("/wishlist/items", {
      method: "POST",
      body: JSON.stringify({ productId }),
    }),

  removeItem: (itemId) =>
    request(`/wishlist/items/${itemId}`, {
      method: "DELETE",
    }),

  clearWishlist: () =>
    request("/wishlist", {
      method: "DELETE",
    }),
};
