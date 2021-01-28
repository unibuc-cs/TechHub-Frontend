import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, Raffle } from "../store";
import {
  GET_ACTIVE_RAFFLE,
  GET_PREVIOUS_RAFFLE,
  RAFFLE_REGISTER,
} from "./raffle.constants";
import { setActiveRaffle, setPreviousRaffle } from "./raffle.actions";

function* getActiveRaffle() {
  try {
    const raffle: Raffle = yield fetch("http://127.0.0.1:8080/raffle/active", {
      method: "GET",
    }).then((res) => res.json());
    yield put(setActiveRaffle(raffle));
  } catch (e) {
    console.warn(e);
  }
}

function* getPreviousRaffle() {
  try {
    const raffle: Raffle = yield fetch(
      "http://127.0.0.1:8080/raffle/previous",
      {
        method: "GET",
      }
    ).then((res) => res.json());
    yield put(setPreviousRaffle(raffle));
  } catch (e) {
    console.warn(e);
  }
}

function* raffleRegister(
  action: ActionWithPayload<{ accessToken: string; email: string }>
) {
  try {
    yield fetch("http://127.0.0.1:8080/raffle/register", {
      method: "POST",
      headers: {
        Authorization: action.payload.accessToken,
      },
    });
  } catch (e) {
    console.warn(e);
  }
}

export default function* raffleSaga() {
  yield takeEvery(GET_ACTIVE_RAFFLE, getActiveRaffle);
  yield takeEvery(GET_PREVIOUS_RAFFLE, getPreviousRaffle);
  yield takeEvery(RAFFLE_REGISTER, raffleRegister);
}
