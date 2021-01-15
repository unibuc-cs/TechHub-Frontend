import { createSelector } from "reselect";
import { Store } from "../store";

export const discountsInformationSelector = (state: Store) => state.discounts;

export const discountsSelector = createSelector(
  discountsInformationSelector,
  (discountsInfo) => discountsInfo.discounts
);
