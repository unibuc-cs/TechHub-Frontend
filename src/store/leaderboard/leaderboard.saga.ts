import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, UserDetails } from "../store";
import { GET_LEADERBOARD_USERS } from "./leaderboard.constants";
import { setLeaderboardUsers } from "./leaderboard.actions";

function* getLeaderboardUsers(
  action: ActionWithPayload<{ accessToken: string; numberOfUsers: number }>
) {
  try {
    const threads: UserDetails[] = yield fetch(
      `http://127.0.0.1:8080/user/sortByScore/${action.payload.numberOfUsers}`,
      {
        method: "GET",
        headers: {
          Authorization: action.payload.accessToken,
        },
      }
    ).then((res) => res.json());
    yield put(setLeaderboardUsers(threads));
  } catch (e) {
    console.warn(e);
  }
}

export default function* leaderboardSaga() {
  yield takeEvery(GET_LEADERBOARD_USERS, getLeaderboardUsers);
}
