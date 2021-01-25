import { takeEvery, put } from "redux-saga/effects";
import {
  ActionWithPayload,
  ThreadInformation,
  Report,
  PostInformation,
} from "../store";
import { GET_REPORTS, GET_REPORT_TYPES } from "./reports.constants";
import { setReports, setReportTypes } from "./reports.actions";

function* getReportTypes(action: ActionWithPayload<{ accessToken: string }>) {
  try {
    const reportTypes: string[] = yield fetch(
      "http://127.0.0.1:8080/report/types",
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
        },
      }
    ).then((res) => res.json());
    yield put(setReportTypes(reportTypes));
  } catch (e) {
    console.warn(e);
  }
}

function* getReports(action: ActionWithPayload<{ accessToken: string }>) {
  try {
    const finalReports: Report[] = [];
    const initialReports: Report[] = yield fetch(
      "http://127.0.0.1:8080/report",
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
        },
      }
    ).then((res) => res.json());

    for (let index = 0; index < initialReports.length; index++) {
      if (!initialReports[index].isPostReport) {
        //thread report
        const threadInformation: ThreadInformation = yield fetch(
          `http://127.0.0.1:8080/thread/${initialReports[index].reportedItemId}`,
          {
            method: "GET",
            headers: {
              Authorization: action.payload.accessToken,
            },
          }
        ).then((res) => res.json());

        finalReports.push({
          ...initialReports[index],
          threadInformation,
        });
      } else {
        //post report
        const postInformation: PostInformation = yield fetch(
          `http://127.0.0.1:8080/post/${initialReports[index].reportedItemId}`,
          {
            method: "GET",
            headers: {
              Authorization: action.payload.accessToken,
            },
          }
        ).then((res) => res.json());

        const threadInformation: ThreadInformation = yield fetch(
          `http://127.0.0.1:8080/thread/${postInformation.threadId}`,
          {
            method: "GET",
            headers: {
              Authorization: action.payload.accessToken,
            },
          }
        ).then((res) => res.json());

        finalReports.push({
          ...initialReports[index],
          threadInformation,
        });
      }
      yield put(setReports(finalReports));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* reportsSaga() {
  yield takeEvery(GET_REPORT_TYPES, getReportTypes);
  yield takeEvery(GET_REPORTS, getReports);
}
