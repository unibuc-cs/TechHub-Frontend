import { createSelector } from "reselect";
import { Store } from "../store";

export const categoriesInformationSelector = (state: Store) => state.categories;

export const categoriesSelector = createSelector(
  categoriesInformationSelector,
  (categoriesInfo) => categoriesInfo.categories
);
