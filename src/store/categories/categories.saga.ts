import { takeEvery, put } from "redux-saga/effects";
import { CategoryCard } from "../store";
import { GET_CATEGORIES } from "./categories.constants";
import { setCategories } from "./categories.actions";

function* getAllCategories() {
  try {
    const categories = yield fetch("http://127.0.0.1:8080/thread/categories", {
      method: "GET",
    }).then((res) => res.json());
    const categoriesInfo: CategoryCard[] = categories.map((cat: string) => ({
      title: cat,
    }));
    yield put(setCategories(categoriesInfo));
  } catch (e) {
    console.warn(e);
  }
}

export default function* userSaga() {
  yield takeEvery(GET_CATEGORIES, getAllCategories);
}
