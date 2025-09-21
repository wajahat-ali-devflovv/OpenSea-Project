import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../const";

interface AuthState {
  loading: boolean;
  user: any | null;
  token: string | null;
  error: string | null;
}

const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const initialState: AuthState = {
  loading: false,
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  error: null,
};

export const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };

    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case "LOGOUT_SUCCESS": // Add logout case
      return {
        ...state,
        user: null,
        token: null,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};
