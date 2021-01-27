import { ActionWithPayload, Report, ReportsStateInformation } from "../store";
import {
  GET_REPORTS,
  GET_REPORTS_BY_ITEMS,
  SET_REPORTS,
  SET_REPORT_TYPES,
  SET_NEW_REPORT,
  DELETE_REPORT,
} from "./reports.constants";

const initialState: ReportsStateInformation = {
  reports: [],
  reportTypes: [],
  loading: false,
};

const reportsReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case GET_REPORTS:
      return {
        ...state,
        loading: true,
      };
    case GET_REPORTS_BY_ITEMS:
      return {
        ...state,
        loading: true,
      };
    case SET_REPORTS:
      return {
        ...state,
        reports: [
          ...(action as ActionWithPayload<{ reports: Report[] }>).payload
            .reports,
        ],
        loading: false,
      };
    case SET_REPORT_TYPES:
      return {
        ...state,
        reportTypes: [
          ...(action as ActionWithPayload<{ reportTypes: string[] }>).payload
            .reportTypes,
        ],
      };
    case SET_NEW_REPORT:
      return {
        ...state,
        reports: [
          ...state.reports,
          (action as ActionWithPayload<{ newReport: Report }>).payload
            .newReport,
        ],
      };
    case DELETE_REPORT:
      return {
        ...state,
        reports: state.reports.filter(
          (report: Report) =>
            report.id !==
            (action as ActionWithPayload<{
              accessToken: string;
              reportId: string;
            }>).payload.reportId
        ),
      };
    default:
      return state;
  }
};

export default reportsReducer;
