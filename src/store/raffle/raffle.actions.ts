import {
  GET_ACTIVE_RAFFLE,
  GET_PREVIOUS_RAFFLE,
  RAFFLE_REGISTER,
  SET_ACTIVE_RAFFLE,
  SET_PREVIOUS_RAFFLE,
  CLOSE_NOTIFICATION,
} from "./raffle.constants";
import { ActionWithPayload, Raffle } from "../store";
import { Action } from "redux";

export const getActiveRaffle = (): Action => ({
  type: GET_ACTIVE_RAFFLE,
});

export const setActiveRaffle = (
  raffle: Raffle
): ActionWithPayload<{ raffle: Raffle }> => ({
  type: SET_ACTIVE_RAFFLE,
  payload: {
    raffle,
  },
});

export const getPreviousRaffle = (): Action => ({
  type: GET_PREVIOUS_RAFFLE,
});

export const setPreviousRaffle = (
  raffle: Raffle
): ActionWithPayload<{ raffle: Raffle }> => ({
  type: SET_PREVIOUS_RAFFLE,
  payload: {
    raffle,
  },
});

export const registerToRaffle = (
  accessToken: string,
  email: string
): ActionWithPayload<{ accessToken: string; email: string }> => ({
  type: RAFFLE_REGISTER,
  payload: {
    accessToken,
    email,
  },
});

export const closeNotification = (): Action => ({
  type: CLOSE_NOTIFICATION,
});
