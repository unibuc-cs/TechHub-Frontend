import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, ThreadInformation } from "../store";
import { GET_ALL_THREADS, GET_THREADS_BY_CATEGORY } from "./threads.constants";
import { setThreads } from "./threads.actions";

function* getAllThreads(action: ActionWithPayload<{ accessToken: string }>) {
  try {
    const threads: ThreadInformation[] = yield fetch(
      "http://127.0.0.1:8080/thread",
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
        },
      }
    ).then((res) => res.json());
    // yield put(setCategories(categoriesInfo));
  } catch (e) {
    console.warn(e);
  }
}

function* getThreadsByCategory(
  action: ActionWithPayload<{ accessToken: string; category: string }>
) {
  try {
    const threads: ThreadInformation[] = yield fetch(
      `http://127.0.0.1:8080/thread/categories/${action.payload.category}`,
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
        },
      }
    ).then((res) => res.json());
    yield put(setThreads(threads));
  } catch (e) {
    console.warn(e);
  }
}

export default function* threadsSaga() {
  yield takeEvery(GET_ALL_THREADS, getAllThreads);
  yield takeEvery(GET_THREADS_BY_CATEGORY, getThreadsByCategory);
}
