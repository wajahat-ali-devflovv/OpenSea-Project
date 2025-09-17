import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../const";

// Action Creators
export const signupRequest = (
  username: string,
  email: string,
  password: string
) => ({
  type: SIGNUP_REQUEST,
  payload: { username, email, password },
});

export const signupSuccess = (user: any, token: string) => ({
  type: SIGNUP_SUCCESS,
  payload: { user, token },
});

export const signupFailure = (error: string) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const loginRequest = (email: string, password: string) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

export const loginSuccess = (user: any, token: string) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
