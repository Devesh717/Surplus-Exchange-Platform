import { AI_ACTION_TYPES as T } from "./ActionType";

const initialState = {
  chatMessages: [],
  chatLoading: false,
  recommendation: null,
  recommendationLoading: false,
  productDescription: null,
  descriptionLoading: false,
  error: null,
};

export const aiInitialState = initialState;

export default function aiReducer(state = initialState, action) {
  switch (action.type) {
    case T.CHAT_REQUEST:
      return { ...state, chatLoading: true, error: null };

    case T.CHAT_SUCCESS:
      return {
        ...state,
        chatLoading: false,
        chatMessages: [
          ...state.chatMessages,
          { role: "assistant", content: action.payload },
        ],
        error: null,
      };

    case T.CHAT_FAILURE:
      return { ...state, chatLoading: false, error: action.payload };

    case T.RECOMMENDATION_REQUEST:
      return { ...state, recommendationLoading: true, error: null };

    case T.RECOMMENDATION_SUCCESS:
      return {
        ...state,
        recommendationLoading: false,
        recommendation: action.payload,
        error: null,
      };

    case T.RECOMMENDATION_FAILURE:
      return {
        ...state,
        recommendationLoading: false,
        error: action.payload,
      };

    case T.DESCRIPTION_REQUEST:
      return { ...state, descriptionLoading: true, error: null };

    case T.DESCRIPTION_SUCCESS:
      return {
        ...state,
        descriptionLoading: false,
        productDescription: action.payload,
        error: null,
      };

    case T.DESCRIPTION_FAILURE:
      return { ...state, descriptionLoading: false, error: action.payload };

    case T.CLEAR_ERROR:
      return { ...state, error: null };

    case T.CLEAR_CHAT:
      return { ...state, chatMessages: [] };

    case T.CLEAR_RECOMMENDATION:
      return { ...state, recommendation: null };

    case T.CLEAR_DESCRIPTION:
      return { ...state, productDescription: null };

    default:
      return state;
  }
}
