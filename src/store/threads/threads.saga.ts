import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, ThreadInformation } from "../store";
import {
  ADD_THREAD,
  GET_ALL_THREADS,
  GET_THREADS_BY_CATEGORY,
  SEARCH_THREADS,
} from "./threads.constants";
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

function* addNewThread(
  action: ActionWithPayload<{
    accessToken: string;
    newThread: ThreadInformation;
  }>
) {
  try {
    const data = {
      ownerEmail: action.payload.newThread.ownerEmail,
      title: action.payload.newThread.title,
      category: action.payload.newThread.category,
      text: action.payload.newThread.text,
      hasTrophy: false,
      vipStatus: false,
    };
    yield fetch("http://127.0.0.1:8080/thread", {
      method: "POST",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
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

function* searchThreads(
  action: ActionWithPayload<{
    accessToken: string;
    searchInput: string;
    category: string;
  }>
) {
  try {
    const threads: ThreadInformation[] = yield fetch(
      `http://127.0.0.1:8080/thread/title/${action.payload.searchInput}`,
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
        },
      }
    ).then((res) => res.json());
    const filteredThreads = threads.filter(
      (thread: ThreadInformation) => thread.category === action.payload.category
    );
    yield put(setThreads(filteredThreads));
  } catch (e) {
    console.warn(e);
  }
}

export default function* threadsSaga() {
  yield takeEvery(GET_ALL_THREADS, getAllThreads);
  yield takeEvery(GET_THREADS_BY_CATEGORY, getThreadsByCategory);
  yield takeEvery(ADD_THREAD, addNewThread);
  yield takeEvery(SEARCH_THREADS, searchThreads);
}
