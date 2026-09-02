import { useCallback } from "react";

import {
  useStore,
  useAuthState,
} from "../../../Store";

import {
  authApi,
} from "../../state/Auth/Action";

import {
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
} from "../../state/Auth/ActionType";

export function useAuth() {
  const { dispatch } = useStore();
  const auth = useAuthState();

  const register = useCallback(
    async (data) => {
      dispatch({
        type: AUTH_REGISTER_REQUEST,
      });

      try {
        const response = await authApi.register(data);

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
    },
    [dispatch]
  );

  const login = useCallback(
    async (credentials) => {
      dispatch({
        type: AUTH_LOGIN_REQUEST,
      });

      try {
        const response = await authApi.login(credentials);

        console.log("LOGIN RESPONSE:", response);
console.log("LOGIN NAME:", response?.name);

        localStorage.setItem(
          "se_token",
          response.token
        );

        localStorage.setItem(
          "se_role",
          response.role
        );

        if (response.name) {
  localStorage.setItem("se_name", response.name);
}

        if (response.userId) {
          localStorage.setItem(
            "se_user_id",
            response.userId
          );
        }

        // Store email verification status
if (response.emailVerified !== undefined) {
  localStorage.setItem(
    "se_email_verified",
    String(response.emailVerified)
  );
}

        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: response,
        });

        return response;
      } catch (error) {
        dispatch({
          type: AUTH_LOGIN_FAILURE,
          payload: error.message,
        });

        throw error;
      }
    },
    [dispatch]
  );

  const logout = useCallback(
    async () => {
      try {
        if (localStorage.getItem("se_token")) {
          await authApi.logout();
        }
      } finally {
        localStorage.removeItem("se_token");
        localStorage.removeItem("se_role");
        localStorage.removeItem("se_user_id");
        localStorage.removeItem("se_email_verified");
        dispatch({
          type: AUTH_LOGOUT,
        });
      }
    },
    [dispatch]
  );

  return {
    ...auth,
    register,
    login,
    logout,
    authApi,
  };
}