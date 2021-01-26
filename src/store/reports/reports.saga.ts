import { takeEvery, put } from "redux-saga/effects";
import {
  ActionWithPayload,
  ThreadInformation,
  Report,
  PostInformation,
} from "../store";
import {
  GET_REPORTS,
  GET_REPORT_TYPES,
  ADD_REPORT,
  DELETE_REPORT,
  GET_REPORTS_BY_ITEMS,
} from "./reports.constants";
import { setReports, setReportTypes, setNewReport } from "./reports.actions";

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
    }
    yield put(setReports(finalReports));
  } catch (e) {
    console.log(e);
  }
}

function* addReport(
  action: ActionWithPayload<{
    accessToken: string;
    reporterId: string;
    reportedItemId: string;
    reportType: string;
    description: string;
    dateReported: string;
    isResolved: boolean;
    isPostReport: boolean;
    threadInformation: ThreadInformation;
  }>
) {
  try {
    const data = {
      reportedItemId: action.payload.reportedItemId,
      reportType: action.payload.reportType.toUpperCase(),
      description: action.payload.description,
      isResolved: action.payload.isResolved,
      isPostReport: action.payload.isPostReport,
    };
    const reportIdRes: any = yield fetch("http://127.0.0.1:8080/report", {
      method: "POST",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    const newReport: Report = {
      id: reportIdRes.id,
      dateReported: action.payload.dateReported,
      description: action.payload.description,
      isPostReport: action.payload.isPostReport,
      threadInformation: action.payload.threadInformation,
      reporterId: action.payload.reporterId,
      isResolved: action.payload.isResolved,
      reportType: action.payload.reportType,
      reportedItemId: action.payload.reportedItemId,
    };

    yield put(setNewReport(newReport));
  } catch (e) {
    console.warn(e);
  }
}

function* deleteReport(
  action: ActionWithPayload<{ accessToken: string; reportId: string }>
) {
  try {
    yield fetch(`http://127.0.0.1:8080/report/${action.payload.reportId}`, {
      method: "DELETE",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    console.warn(e);
  }
}

function* getReportsByItem(
  action: ActionWithPayload<{ accessToken: string; reportedItemId: string }>
) {
  try {
    const finalReports: Report[] = [];
    const initialReports: Report[] = yield fetch(
      `http://127.0.0.1:8080/report/reportsByItem/${action.payload.reportedItemId}`,
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
    }
    yield put(setReports(finalReports));
  } catch (e) {
    console.log(e);
  }
}

export default function* reportsSaga() {
  yield takeEvery(GET_REPORT_TYPES, getReportTypes);
  yield takeEvery(GET_REPORTS, getReports);
  yield takeEvery(ADD_REPORT, addReport);
  yield takeEvery(DELETE_REPORT, deleteReport);
  yield takeEvery(GET_REPORTS_BY_ITEMS, getReportsByItem);
}
