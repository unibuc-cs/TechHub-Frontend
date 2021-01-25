import { ActionWithPayload, Report } from "../store";
import {
  GET_REPORTS,
  SET_REPORTS,
  GET_REPORT_TYPES,
  SET_REPORT_TYPES,
} from "./reports.constants";

export const getReports = (
  accessToken: string
): ActionWithPayload<{ accessToken: string }> => ({
  type: GET_REPORTS,
  payload: {
    accessToken,
  },
});

export const setReports = (
  reports: Report[]
): ActionWithPayload<{ reports: Report[] }> => ({
  type: SET_REPORTS,
  payload: {
    reports,
  },
});

export const getReportTypes = (
  accessToken: string
): ActionWithPayload<{ accessToken: string }> => ({
  type: GET_REPORT_TYPES,
  payload: {
    accessToken,
  },
});

export const setReportTypes = (
  reportTypes: string[]
): ActionWithPayload<{ reportTypes: string[] }> => ({
  type: SET_REPORT_TYPES,
  payload: {
    reportTypes,
  },
});
