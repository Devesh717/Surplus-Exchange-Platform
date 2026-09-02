import axios from "axios";
import API_BASE_URL from "../../admin/config/apiConfig";

const REVIEW_URL = `${API_BASE_URL}/reviews`;

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

export const reviewApi = {
  async createReview(productId, data) {
    const response = await axios.post(
      `${REVIEW_URL}/products/${productId}`,
      data,
      authConfig()
    );

    return response.data;
  },

  async getProductReviews(productId, params = {}) {
    const response = await axios.get(
      `${REVIEW_URL}/products/${productId}`,
      {
        ...authConfig(),
        params,
      }
    );

    return response.data;
  },

  async updateReview(reviewId, data) {
    const response = await axios.put(
      `${REVIEW_URL}/${reviewId}`,
      data,
      authConfig()
    );

    return response.data;
  },

  async deleteReview(reviewId) {
    const response = await axios.delete(
      `${REVIEW_URL}/${reviewId}`,
      authConfig()
    );

    return response.data;
  },
};