import axios from "axios";
import API_BASE_URL from "../../admin/config/apiConfig";

const AI_URL = `${API_BASE_URL}/ai`;

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

export const aiApi = {
  async chat(message) {
    try {
      const response = await axios.post(
        `${AI_URL}/chat`,
        { message },
        authConfig()
      );
      return response.data;
    } catch (error) {
      throw new Error(errorMessage(error, "Unable to contact AI assistant."));
    }
  },

  async recommendProducts(requirement) {
    try {
      const response = await axios.post(
        `${AI_URL}/recommendations`,
        { requirement },
        authConfig()
      );
      return response.data;
    } catch (error) {
      throw new Error(errorMessage(error, "Unable to get product recommendations."));
    }
  },

  async generateProductDescription(payload) {
    try {
      const response = await axios.post(
        `${AI_URL}/product-description`,
        payload,
        authConfig()
      );
      return response.data;
    } catch (error) {
      throw new Error(errorMessage(error, "Unable to generate product description."));
    }
  },
};
