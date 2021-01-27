import { createSelector } from "reselect";
import { Store } from "../store";

export const postsInformationSelector = (state: Store) => state.posts;

export const postsSelector = createSelector(
  postsInformationSelector,
  (postsInfo) => postsInfo.posts
);

export const threadHasTrophySelector = createSelector(
  postsInformationSelector,
  (postsInfo) => postsInfo.currentThreadHasTrophy
);

export const threadIsLockedSelector = createSelector(
  postsInformationSelector,
  (postsInfo) => postsInfo.currentThreadIsLocked
);

export const postsLoadingSelector = createSelector(
  postsInformationSelector,
  (postsInfo) => postsInfo.loading
);
