import { all } from "redux-saga/effects";
import userSaga from "../store/user/user.saga";
import categoriesSaga from "../store/categories/categories.saga";

export default function* rootSaga() {
  yield all([userSaga(), categoriesSaga()]);
}
