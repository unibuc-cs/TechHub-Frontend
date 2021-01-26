import { ActionWithPayload, Report, ThreadInformation } from "../store";
import {
  GET_REPORTS,
  SET_REPORTS,
  GET_REPORT_TYPES,
  SET_REPORT_TYPES,
  ADD_REPORT,
  SET_NEW_REPORT,
  DELETE_REPORT,
  GET_REPORTS_BY_ITEMS,
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

export const addReport = (
  accessToken: string,
  reporterId: string,
  reportedItemId: string,
  reportType: string,
  description: string,
  dateReported: string,
  isResolved: boolean,
  isPostReport: boolean,
  threadInformation: ThreadInformation
): ActionWithPayload<{
  accessToken: string;
  reporterId: string;
  reportedItemId: string;
  reportType: string;
  description: string;
  dateReported: string;
  isResolved: boolean;
  isPostReport: boolean;
  threadInformation: ThreadInformation;
}> => ({
  type: ADD_REPORT,
  payload: {
    accessToken,
    reporterId,
    reportedItemId,
    reportType,
    description,
    dateReported,
    isResolved,
    isPostReport,
    threadInformation,
  },
});

export const setNewReport = (
  newReport: Report
): ActionWithPayload<{ newReport: Report }> => ({
  type: SET_NEW_REPORT,
  payload: {
    newReport,
  },
});

export const deleteReport = (
  accessToken: string,
  reportId: string
): ActionWithPayload<{ accessToken: string; reportId: string }> => ({
  type: DELETE_REPORT,
  payload: {
    accessToken,
    reportId,
  },
});

export const getReportsByItem = (
  accessToken: string,
  reportedItemId: string
): ActionWithPayload<{ accessToken: string; reportedItemId: string }> => ({
  type: GET_REPORTS_BY_ITEMS,
  payload: {
    accessToken,
    reportedItemId,
  },
});
