import { createSelector } from "reselect";
import { Store } from "../store";

export const purchasedDiscountsInformationSelector = (state: Store) =>
  state.purchasedDiscounts;

export const purchasedDiscountsSelector = createSelector(
  purchasedDiscountsInformationSelector,
  (purchasedDiscountsInfo) => purchasedDiscountsInfo.purchasedDiscounts
);

export const purchasedDiscountsLoadingSelector = createSelector(
  purchasedDiscountsInformationSelector,
  (purchasedDiscountsInfo) => purchasedDiscountsInfo.loading
);
