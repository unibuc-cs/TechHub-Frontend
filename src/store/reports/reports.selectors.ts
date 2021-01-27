import { createSelector } from "reselect";
import { Store } from "../store";

export const reportsInformationSelector = (state: Store) => state.reports;

export const reportsSelector = createSelector(
  reportsInformationSelector,
  (reportsInfo) => reportsInfo.reports
);

export const reportTypesSelector = createSelector(
  reportsInformationSelector,
  (reportsInfo) => reportsInfo.reportTypes
);

export const reportsLoadingSelector = createSelector(
  reportsInformationSelector,
  (reportsInfo) => reportsInfo.loading
);
