import { takeEvery } from "redux-saga/effects";
import { ActionWithPayload } from "../store";
import {
  LOGIN_GET_USER_INFO,
  REGISTER_SEND_INFORMATION,
} from "./user.constants";

function* sendUserLoginInformation() {
  yield console.log("ok");
}

function* sendUserRegisterInformation(
  action: ActionWithPayload<{
    email: string;
    password: string;
    username: string;
  }>
) {
  try {
    const data = {
      email: action.payload.email,
      username: action.payload.username,
      password: action.payload.password,
      type: "",
      profilePicture: "",
      accountStatus: "",
    };
    yield fetch("http://127.0.0.1:8080/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.warn(e);
  }
}

export default function* userSaga() {
  yield takeEvery(LOGIN_GET_USER_INFO, sendUserLoginInformation);
  yield takeEvery(REGISTER_SEND_INFORMATION, sendUserRegisterInformation);
}
