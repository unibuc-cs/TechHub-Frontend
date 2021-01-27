import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, UserDetails } from "../store";
import {
  GET_USER_DETAILS_BY_EMAIL,
  CHANGE_PROFILE_PICTURE,
  BAN_USER,
} from "./userDetails.constants";
import { setUserDetails } from "./userDetails.actions";

function* getUserDetailsByEmail(
  action: ActionWithPayload<{ accessToken: string; email: string }>
) {
  try {
    const details: UserDetails = yield fetch(
      `http://127.0.0.1:8080/user/${action.payload.email}`,
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
        },
      }
    ).then((res) => res.json());
    yield put(setUserDetails(details));
  } catch (e) {
    console.warn(e);
  }
}

function* changeProfilePicture(
  action: ActionWithPayload<{
    accessToken: string;
    email: string;
    newImage: string;
  }>
) {
  try {
    const data = {
      profilePicture: action.payload.newImage,
    };
    yield fetch(`http://127.0.0.1:8080/user/${action.payload.email}`, {
      method: "PUT",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.warn(e);
  }
}

function* banUser(
  action: ActionWithPayload<{ accessToken: string; email: string }>
) {
  try {
    const data = {
      accountStatus: "banned",
    };
    yield fetch(`http://127.0.0.1:8080/user/${action.payload.email}`, {
      method: "PUT",
      headers: {
        Authorization: action.payload.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.warn(e);
  }
}

export default function* userDetailsSaga() {
  yield takeEvery(GET_USER_DETAILS_BY_EMAIL, getUserDetailsByEmail);
  yield takeEvery(CHANGE_PROFILE_PICTURE, changeProfilePicture);
  yield takeEvery(BAN_USER, banUser);
}
