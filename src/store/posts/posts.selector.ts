import { createSelector } from "reselect";
import { Store } from "../store";

export const postsInformationSelector = (state: Store) => state.posts;

export const postsSelector = createSelector(
  postsInformationSelector,
  (postsInfo) => postsInfo.posts
);
