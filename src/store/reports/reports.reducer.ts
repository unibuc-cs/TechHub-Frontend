import { ActionWithPayload, Report, ReportsStateInformation } from "../store";
import { SET_REPORTS, SET_REPORT_TYPES } from "./reports.constants";

const initialState: ReportsStateInformation = {
  reports: [],
  reportTypes: [],
};

const reportsReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case SET_REPORTS:
      return {
        ...state,
        reports: [
          ...(action as ActionWithPayload<{ reports: Report[] }>).payload
            .reports,
        ],
      };
    case SET_REPORT_TYPES:
      return {
        ...state,
        reportTypes: [
          ...(action as ActionWithPayload<{ reportTypes: string[] }>).payload
            .reportTypes,
        ],
      };
    default:
      return state;
  }
};

export default reportsReducer;
