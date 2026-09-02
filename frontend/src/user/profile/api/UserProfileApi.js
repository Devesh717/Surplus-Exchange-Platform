import axios from "axios";
import API_BASE_URL from "../../../admin/config/apiConfig";

const PROFILE_URL = `${API_BASE_URL}/user/profile`;

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

export const userProfileApi = {
  async getProfile() {
    try {
      const response = await axios.get(
        PROFILE_URL,
        authConfig()
      );

      return response.data;
    } catch (error) {
      throw new Error(
        errorMessage(
          error,
          "Unable to load your profile."
        )
      );
    }
  },

  async updateProfile(data) {
    try {
      const response = await axios.put(
        PROFILE_URL,
        data,
        authConfig()
      );

      return response.data;
    } catch (error) {
      throw new Error(
        errorMessage(
          error,
          "Unable to update your profile."
        )
      );
    }
  },
};