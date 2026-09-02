import { userProfileApi } from "../../../profile/api/UserProfileApi";
import { USER_PROFILE_ACTION_TYPES as T } from "./ActionType";

export const getUserProfile = () => async (dispatch) => {
  dispatch({
    type: T.PROFILE_REQUEST,
  });

  try {
    const data = await userProfileApi.getProfile();

    dispatch({
      type: T.PROFILE_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message =
      error?.message ||
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Unable to load your profile.";

    dispatch({
      type: T.PROFILE_FAILURE,
      payload: message,
    });

    throw error;
  }
};

export const updateUserProfile =
  (profileData) => async (dispatch) => {
    dispatch({
      type: T.UPDATE_PROFILE_REQUEST,
    });

    try {
      const data =
        await userProfileApi.updateProfile(
          profileData
        );

      dispatch({
        type: T.UPDATE_PROFILE_SUCCESS,
        payload: data,
      });

      /*
       * Keep navbar user information synchronized
       * after changing the profile.
       */
      if (data?.name) {
        localStorage.setItem(
          "se_name",
          data.name
        );
      }

      if (data?.email) {
        localStorage.setItem(
          "se_email",
          data.email
        );
      }

      if (typeof data?.emailVerified === "boolean") {
        localStorage.setItem(
          "se_email_verified",
          String(data.emailVerified)
        );
      }

      window.dispatchEvent(
        new Event("auth-changed")
      );

      return data;
    } catch (error) {
      const message =
        error?.message ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to update your profile.";

      dispatch({
        type: T.UPDATE_PROFILE_FAILURE,
        payload: message,
      });

      throw error;
    }
  };

export const clearUserProfileError = () => ({
  type: T.CLEAR_PROFILE_ERROR,
});

export const clearUserProfile = () => ({
  type: T.CLEAR_PROFILE,
});