import { createSelector } from "reselect";
import { Store } from "../store";

export const raffleInformationSelector = (state: Store) => state.raffle;

export const activeRaffleSelector = createSelector(
  raffleInformationSelector,
  (raffleInfo) => raffleInfo.activeRaffle
);

export const previousRaffleSelector = createSelector(
  raffleInformationSelector,
  (raffleInfo) => raffleInfo.previousRaffle
);

export const raffleLoadingSelector = createSelector(
  raffleInformationSelector,
  (raffleInfo) => raffleInfo.loading
);

export const notificationIsClosedSelector = createSelector(
  raffleInformationSelector,
  (raffleInfo) => raffleInfo.notificationClosed
);
