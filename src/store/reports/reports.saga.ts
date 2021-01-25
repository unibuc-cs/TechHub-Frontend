import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, ThreadInformation, Report } from "../store";
import { GET_REPORT_TYPES } from "./reports.constants";
import { setReportTypes } from "./reports.actions";

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

export default function* reportsSaga() {
  yield takeEvery(GET_REPORT_TYPES, getReportTypes);
}
