import { all } from "redux-saga/effects";
import userSaga from "../store/user/user.saga";

export default function* rootSaga() {
  yield all([userSaga()]);
}
