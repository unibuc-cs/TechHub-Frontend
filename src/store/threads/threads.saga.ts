import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, ThreadInformation, UserDetails } from "../store";
import {
  ADD_THREAD,
  GET_ALL_THREADS,
  GET_THREADS_BY_CATEGORY,
  SEARCH_THREADS,
  GET_VIP_THREADS_BY_CATEGORY,
  ADD_VIP_THREAD,
  SEARCH_VIP_THREADS,
} from "./threads.constants";
import { setThreads, setNewThread } from "./threads.actions";

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
    };
    const threadIdRes = yield fetch("http://127.0.0.1:8080/thread", {
      method: "POST",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    yield put(
      setNewThread({ ...action.payload.newThread, id: threadIdRes.threadId })
    );
  } catch (e) {
    console.warn(e);
  }
}

function* getThreadsByCategory(
  action: ActionWithPayload<{ accessToken: string; category: string }>
) {
  try {
    const finalThreads: ThreadInformation[] = [];
    const initialThreads: ThreadInformation[] = yield fetch(
      `http://127.0.0.1:8080/thread/categories/${action.payload.category}`,
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
        },
      }
    ).then((res) => res.json());

    for (let index = 0; index < initialThreads.length; index++) {
      const details: UserDetails = yield fetch(
        `http://127.0.0.1:8080/user/${initialThreads[index].ownerEmail}`,
        {
          method: "GET",
          headers: {
            Authorization: action.payload.accessToken,
          },
        }
      ).then((res) => res.json());

      finalThreads.push({
        ...initialThreads[index],
        userImage: details.profilePicture,
        username: details.username,
      });
    }

    yield put(setThreads(finalThreads));
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
      `http://127.0.0.1:8080/thread/title/${action.payload.searchInput.trim()}`,
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

function* getVipThreadsByCategory(
  action: ActionWithPayload<{ accessToken: string; category: string }>
) {
  try {
    const finalThreads: ThreadInformation[] = [];
    const initialThreads: ThreadInformation[] = yield fetch(
      `http://127.0.0.1:8080/thread/vip/categories/${action.payload.category}`,
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
        },
      }
    ).then((res) => res.json());

    for (let index = 0; index < initialThreads.length; index++) {
      const details: UserDetails = yield fetch(
        `http://127.0.0.1:8080/user/${initialThreads[index].ownerEmail}`,
        {
          method: "GET",
          headers: {
            Authorization: action.payload.accessToken,
          },
        }
      ).then((res) => res.json());

      finalThreads.push({
        ...initialThreads[index],
        userImage: details.profilePicture,
        username: details.username,
      });
    }

    yield put(setThreads(finalThreads));
  } catch (e) {
    console.warn(e);
  }
}

function* addNewVipThread(
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
    };
    const threadIdRes = yield fetch("http://127.0.0.1:8080/thread/vip", {
      method: "POST",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    yield put(
      setNewThread({
        ...action.payload.newThread,
        id: threadIdRes.threadId,
        vipStatus: true,
      })
    );
  } catch (e) {
    console.warn(e);
  }
}

function* searchVipThreads(
  action: ActionWithPayload<{
    accessToken: string;
    searchInput: string;
    category: string;
  }>
) {
  try {
    const threads: ThreadInformation[] = yield fetch(
      `http://127.0.0.1:8080/thread/vip/title/${action.payload.searchInput.trim()}`,
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
          "Access-Control-Allow-Origin": "*",
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
  yield takeEvery(GET_VIP_THREADS_BY_CATEGORY, getVipThreadsByCategory);
  yield takeEvery(ADD_VIP_THREAD, addNewVipThread);
  yield takeEvery(SEARCH_VIP_THREADS, searchVipThreads);
}
