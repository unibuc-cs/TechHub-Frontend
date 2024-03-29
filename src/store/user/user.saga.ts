import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload } from "../store";
import {
  LOGIN_GET_USER_INFO,
  REGISTER_SEND_INFORMATION,
} from "./user.constants";
import {
  setUserDidRegister,
  setUserAccessToken,
  setUserEmail,
} from "./user.actions";

function* sendUserLoginInformation(
  action: ActionWithPayload<{ email: string; password: string }>
) {
  try {
    const data = {
      email: action.payload.email,
      password: action.payload.password,
    };
    const accessToken = yield fetch("http://127.0.0.1:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    const newToken = accessToken.accessToken.split("access token is:  ");
    yield put(setUserAccessToken(newToken[0]));
    yield localStorage.setItem("accessToken", newToken[0]);
    yield put(setUserEmail(action.payload.email));
    yield localStorage.setItem("email", action.payload.email);
  } catch (e) {
    alert("Username or password are incorrect");
    console.warn(e);
  }
}

function* sendUserRegisterInformation(
  action: ActionWithPayload<{
    email: string;
    password: string;
    username: string;
    userType: string;
  }>
) {
  try {
    const data = {
      email: action.payload.email,
      username: action.payload.username,
      password: action.payload.password,
      type: action.payload.userType,
      profilePicture:
        "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg",
      accountStatus: "",
    };
    yield fetch("http://127.0.0.1:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    yield put(setUserDidRegister());
  } catch (e) {
    console.warn(e);
  }
}

export default function* userSaga() {
  yield takeEvery(LOGIN_GET_USER_INFO, sendUserLoginInformation);
  yield takeEvery(REGISTER_SEND_INFORMATION, sendUserRegisterInformation);
}
