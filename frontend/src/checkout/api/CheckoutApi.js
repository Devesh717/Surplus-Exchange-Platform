import axios from "axios";
import API_BASE_URL from "../../admin/config/apiConfig";

const CHECKOUT_URL = `${API_BASE_URL}/checkout`;

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

export const checkoutApi = {
  async getSummary() {
    console.log("================================");
    console.log("[CHECKOUT API] GET SUMMARY");
    console.log("[CHECKOUT API] URL:", `${CHECKOUT_URL}/summary`);
    console.log("================================");

    const response = await axios.get(
      `${CHECKOUT_URL}/summary`,
      authConfig()
    );

    console.log("[CHECKOUT API] Summary response:", response);
    console.log("[CHECKOUT API] Summary data:", response.data);

    return response.data;
  },

  async checkout(request) {
    console.log("================================");
    console.log("[CHECKOUT API] POST CHECKOUT");
    console.log("[CHECKOUT API] URL:", CHECKOUT_URL);
    console.log("[CHECKOUT API] Request:", request);
    console.log("================================");

    const response = await axios.post(
      CHECKOUT_URL,
      request,
      authConfig()
    );

    console.log("[CHECKOUT API] Checkout response:", response);
    console.log("[CHECKOUT API] Checkout data:", response.data);

    return response.data;
  },
};
