import axios from "axios";
import API_BASE_URL from "../../../admin/config/apiConfig";

const DASHBOARD_URL = `${API_BASE_URL}/user/dashboard`;

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

export const userDashboardApi = {
  async getDashboard() {
    try {
      const response = await axios.get(
        DASHBOARD_URL,
        authConfig()
      );

      return response.data;
    } catch (error) {
      throw new Error(
        errorMessage(
          error,
          "Unable to load your dashboard."
        )
      );
    }
  },
};
