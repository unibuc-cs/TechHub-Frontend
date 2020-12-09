import { createSelector } from "reselect";
import { Store } from "../store";

export const userInformationSelector = (state: Store) => state.user;

export const accessTokenSelector = createSelector(
  userInformationSelector,
  (user) => user.accessToken
);