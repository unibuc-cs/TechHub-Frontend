import { createSelector } from "reselect";
import { Store } from "../store";

export const leaderboardInformationSelector = (state: Store) =>
  state.leaderboard;

export const topUsersSelector = createSelector(
  leaderboardInformationSelector,
  (leaderboardInfo) => leaderboardInfo.topUsers
);
