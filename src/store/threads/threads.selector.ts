import { createSelector } from "reselect";
import { Store } from "../store";

export const threadsInformationSelector = (state: Store) => state.threads;

export const threadsSelector = createSelector(
  threadsInformationSelector,
  (threadsInfo) => threadsInfo.threads
);

export const threadsLoadingSelector = createSelector(
  threadsInformationSelector,
  (threadsInfo) => threadsInfo.loading
);
