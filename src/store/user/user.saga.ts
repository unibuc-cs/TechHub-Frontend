import { takeEvery } from "redux-saga/effects";
import { LOGIN_GET_USER_INFO } from "./user.constants";

function* sendUserLoginInformation() {
  yield console.log("ok");
}

export default function* userSaga() {
  yield takeEvery(LOGIN_GET_USER_INFO, sendUserLoginInformation);
}
