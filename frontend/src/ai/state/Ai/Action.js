import { aiApi } from "../../api/AiApi";
import { AI_ACTION_TYPES as T } from "./ActionType";

export const sendChatMessage = (message) => async (dispatch) => {
  dispatch({ type: T.CHAT_REQUEST });

  try {
    const data = await aiApi.chat(message);
    dispatch({
      type: T.CHAT_SUCCESS,
      payload: data?.response || "No response received from AI.",
    });
    return data;
  } catch (error) {
    const messageText = error?.message || "Unable to contact AI assistant.";
    dispatch({ type: T.CHAT_FAILURE, payload: messageText });
    throw error;
  }
};

export const getAiRecommendations = (requirement) => async (dispatch) => {
  dispatch({ type: T.RECOMMENDATION_REQUEST });

  try {
    const data = await aiApi.recommendProducts(requirement);
    dispatch({
      type: T.RECOMMENDATION_SUCCESS,
      payload: data?.response || "No recommendations received.",
    });
    return data;
  } catch (error) {
    const message = error?.message || "Unable to get product recommendations.";
    dispatch({ type: T.RECOMMENDATION_FAILURE, payload: message });
    throw error;
  }
};

export const generateProductDescription = (payload) => async (dispatch) => {
  dispatch({ type: T.DESCRIPTION_REQUEST });

  try {
    const data = await aiApi.generateProductDescription(payload);
    dispatch({
      type: T.DESCRIPTION_SUCCESS,
      payload: data?.response || "No description received.",
    });
    return data;
  } catch (error) {
    const message = error?.message || "Unable to generate product description.";
    dispatch({ type: T.DESCRIPTION_FAILURE, payload: message });
    throw error;
  }
};

export const clearAiError = () => ({ type: T.CLEAR_ERROR });
export const clearAiChat = () => ({ type: T.CLEAR_CHAT });
export const clearAiRecommendation = () => ({ type: T.CLEAR_RECOMMENDATION });
export const clearAiDescription = () => ({ type: T.CLEAR_DESCRIPTION });
