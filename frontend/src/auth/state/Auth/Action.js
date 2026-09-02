import API_BASE_URL from "../../config/apiConfig";
import {
  AUTH_CLEAR_ERROR,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
} from "./ActionType";

const TOKEN_KEY = "se_token";
const ROLE_KEY = "se_role";
const USER_ID_KEY = "se_user_id";
const NAME_KEY = "se_name";

async function request(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token && !options.skipAuth) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch (error) {
    throw new Error(
      "Unable to reach the backend. Check that Spring Boot is running on port 8080."
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text();

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      (typeof data === "string" && data) ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}

export const authApi = {
  register(data) {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    });
  },

  login(data) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    });
  },

  logout() {
    return request("/auth/logout", {
      method: "POST",
    });
  },

  verifyEmail(data) {
    return request("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    });
  },

  forgotPassword(data) {
    return request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    });
  },

  resetPassword(data) {
    return request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
      skipAuth: true,
    });
  },

  changePassword(data) {
    return request("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

export const registerUser = (data) => async (dispatch) => {
  dispatch({ type: AUTH_REGISTER_REQUEST });

  try {
    const response = await authApi.register(data);

    // Backend returns an accessToken, but registration still requires
    // email verification. Do not treat the user as authenticated yet.
    dispatch({
      type: AUTH_REGISTER_SUCCESS,
      payload: response,
    });

    return response;
  } catch (error) {
    dispatch({
      type: AUTH_REGISTER_FAILURE,
      payload: error.message,
    });
    throw error;
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_REQUEST });

  try {
    console.log("========== LOGIN START ==========");
    console.log("Login credentials:", credentials);

    const response = await authApi.login(credentials);

    console.log("LOGIN API RESPONSE:", response);
    console.log("Response token:", response?.token);
    console.log("Response role:", response?.role);
    console.log("Response userId:", response?.userId);
    console.log("Response name:", response?.name);
    console.log("Response email:", response?.email);

    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(ROLE_KEY, response.role);

    if (response?.userId) {
      localStorage.setItem(USER_ID_KEY, response.userId);
    }

    if (response?.name) {
      localStorage.setItem("NAME_KEY", response.name);
    }

    console.log("========== AFTER LOCAL STORAGE ==========");
    console.log("se_token:", localStorage.getItem("se_token"));
    console.log("se_role:", localStorage.getItem("se_role"));
    console.log("se_user_id:", localStorage.getItem("se_user_id"));
    console.log("se_name:", localStorage.getItem("NAME_KEY"));

    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: response,
    });

    window.dispatchEvent(new Event("auth-changed"));

    console.log("========== LOGIN END ==========");

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    dispatch({
      type: AUTH_LOGIN_FAILURE,
      payload: error.message,
    });

    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    if (localStorage.getItem(TOKEN_KEY)) {
      await authApi.logout();
    }
  } finally {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USER_ID_KEY);

    dispatch({ type: AUTH_LOGOUT });
  }
};

export const clearAuthError = () => ({
  type: AUTH_CLEAR_ERROR,
});
