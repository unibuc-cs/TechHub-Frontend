import { createSelector } from "reselect";
import { Store } from "../store";

export const userDetailsInformationSelector = (state: Store) =>
  state.userDetails;

export const userDetailsSelector = createSelector(
  userDetailsInformationSelector,
  (userDetailsInfo) => userDetailsInfo.details
);
