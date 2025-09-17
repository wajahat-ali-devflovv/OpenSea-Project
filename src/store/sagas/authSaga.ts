import { call, put, takeLatest } from "redux-saga/effects";
import {
  signupSuccess,
  signupFailure,
  loginSuccess,
  loginFailure,
} from "../actions/authActions";
import { SIGNUP_REQUEST, LOGIN_REQUEST } from "../const";

import { signupApi, loginApi } from "../api/authApi";

function* signupSaga(action: any): any {
  try {
    const { username, email, password } = action.payload;
    const data = yield call(signupApi, username, email, password);

    yield put(signupSuccess(data.user, data.token));
  } catch (error: any) {
    const detail = error.response?.data?.detail;

    let message = "Signup failed";
    if (Array.isArray(detail)) {
      // Extract the first validation message
      message = detail[0]?.msg || message;
    } else if (typeof detail === "string") {
      message = detail;
    }

    yield put(signupFailure(message));
  }
}

function* loginSaga(action: any): any {
  try {
    const { email, password } = action.payload;
    const data = yield call(loginApi, email, password);

    yield put(loginSuccess(data.user, data.token));
  } catch (error: any) {
    yield put(loginFailure(error.response?.data?.detail || "Login failed"));
  }
}

export function* authSaga() {
  yield takeLatest(SIGNUP_REQUEST, signupSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
