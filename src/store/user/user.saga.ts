import { takeEvery } from "redux-saga/effects";
import {
  LOGIN_GET_USER_INFO,
  REGISTER_SEND_INFORMATION,
} from "./user.constants";

function* sendUserLoginInformation() {
  yield console.log("ok");
}

function* sendUserRegisterInformation() {
  yield console.log("ok");
}

export default function* userSaga() {
  yield takeEvery(LOGIN_GET_USER_INFO, sendUserLoginInformation);
  yield takeEvery(REGISTER_SEND_INFORMATION, sendUserRegisterInformation);
}
