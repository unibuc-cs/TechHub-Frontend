import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, UserDetails } from "../store";
import { GET_USER_DETAILS_BY_EMAIL } from "./userDetails.constants";
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

export default function* userDetailsSaga() {
  yield takeEvery(GET_USER_DETAILS_BY_EMAIL, getUserDetailsByEmail);
}
