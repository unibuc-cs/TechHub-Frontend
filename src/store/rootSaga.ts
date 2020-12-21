import { all } from "redux-saga/effects";
import userSaga from "../store/user/user.saga";
import categoriesSaga from "../store/categories/categories.saga";
import threadsSaga from "../store/threads/threads.saga";

export default function* rootSaga() {
  yield all([userSaga(), categoriesSaga(), threadsSaga()]);
}
