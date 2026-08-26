import axios from "axios";
import API_BASE_URL from "../../../../admin/config/apiConfig";

const CART_URL = `${API_BASE_URL}/cart`;

console.log("====================================");
console.log("[CART API] FILE LOADED");
console.log("[CART API] API_BASE_URL:", API_BASE_URL);
console.log("[CART API] CART_URL:", CART_URL);
console.log("====================================");

function authConfig() {
  const token = localStorage.getItem("se_token");

  console.log("[CART API] authConfig token present:", Boolean(token));

  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
}

function getErrorMessage(error, fallback) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

export const cartApi = {
  async getCart() {
    console.log("====================================");
    console.log("[CART API] GET /cart");
    console.log("[CART API] URL:", CART_URL);
    console.log("====================================");

    try {
      const response = await axios.get(CART_URL, authConfig());

      console.log("[CART API] GET status:", response.status);
      console.log("[CART API] GET data:", response.data);

      return response.data;
    } catch (error) {
      console.error("[CART API] GET ERROR:", error);
      console.error("[CART API] response:", error.response?.data);
      throw new Error(getErrorMessage(error, "Unable to load cart."));
    }
  },

  async addItem(productId, quantity = 1) {
    const payload = {
      productId: Number(productId),
      quantity: Number(quantity),
    };

    console.log("====================================");
    console.log("[CART API] POST /cart/items");
    console.log("[CART API] payload:", payload);
    console.log("====================================");

    try {
      const response = await axios.post(
        `${CART_URL}/items`,
        payload,
        authConfig()
      );

      console.log("[CART API] ADD status:", response.status);
      console.log("[CART API] ADD data:", response.data);

      return response.data;
    } catch (error) {
      console.error("[CART API] ADD ERROR:", error);
      console.error("[CART API] response:", error.response?.data);
      throw new Error(
        getErrorMessage(error, "Unable to add product to cart.")
      );
    }
  },

  async updateItem(itemId, quantity) {
    const payload = {
      quantity: Number(quantity),
    };

    console.log("====================================");
    console.log("[CART API] PUT /cart/items/" + itemId);
    console.log("[CART API] payload:", payload);
    console.log("====================================");

    try {
      const response = await axios.put(
        `${CART_URL}/items/${itemId}`,
        payload,
        authConfig()
      );

      console.log("[CART API] UPDATE status:", response.status);
      console.log("[CART API] UPDATE data:", response.data);

      return response.data;
    } catch (error) {
      console.error("[CART API] UPDATE ERROR:", error);
      console.error("[CART API] response:", error.response?.data);
      throw new Error(
        getErrorMessage(error, "Unable to update cart quantity.")
      );
    }
  },

  async removeItem(itemId) {
    console.log("====================================");
    console.log("[CART API] DELETE /cart/items/" + itemId);
    console.log("====================================");

    try {
      const response = await axios.delete(
        `${CART_URL}/items/${itemId}`,
        authConfig()
      );

      console.log("[CART API] REMOVE status:", response.status);
      console.log("[CART API] REMOVE data:", response.data);

      return response.data;
    } catch (error) {
      console.error("[CART API] REMOVE ERROR:", error);
      console.error("[CART API] response:", error.response?.data);
      throw new Error(
        getErrorMessage(error, "Unable to remove cart item.")
      );
    }
  },

  async clearCart() {
    console.log("====================================");
    console.log("[CART API] DELETE /cart");
    console.log("====================================");

    try {
      const response = await axios.delete(
        CART_URL,
        authConfig()
      );

      console.log("[CART API] CLEAR status:", response.status);
      console.log("[CART API] CLEAR data:", response.data);

      return response.data;
    } catch (error) {
      console.error("[CART API] CLEAR ERROR:", error);
      console.error("[CART API] response:", error.response?.data);
      throw new Error(
        getErrorMessage(error, "Unable to clear cart.")
      );
    }
  },
};
